import { useCallback, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import { ApiQuote } from '../../types';
import axiosApi from '../../axiosApi';
import { FaBomb, FaEdit } from "react-icons/fa";
import './Quote.css';

const Quote = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [quote, setQuote] = useState<ApiQuote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = useCallback( async () => {
    setLoading(true); 
    const response = await axiosApi.get<ApiQuote | null>('/quotes/' + params.id +'.json');
    setQuote(response.data);
    setLoading(false); 

  }, [params.id]);

  useEffect(() => {
    void fetchQuote();
  }, [fetchQuote]);

  const deleteQuote = async () => {
    await axiosApi.delete('/quotes/' + params.id +'.json');
    navigate('/');
  };

  let postArea = <Preloader />;

  if (!loading && quote) {
    postArea = (
      <div>
        <div className="quote-item"> 
            <h2 className="quote-author">{quote.author}</h2>
            <p className="quote-text">{quote.text}</p>
            <div className="quote-bottom">
              <div className="quote-btns">
                <button className='tooltip-container' onClick={deleteQuote}><FaBomb /><span className='tooltip'>Удалить</span></button>
                <Link className='tooltip-container' to="edit"><FaEdit /><span className='tooltip'>Изменить</span></Link>
              </div>
            </div>
        </div>
        <Outlet/>
      </div>
    )
  } else if (!loading && quote) {
    postArea = (
      <h1>Цитата не найдена</h1>
    )
  }
   
  return (
    <div>
        {postArea}
    </div>
  );
}

export default Quote;