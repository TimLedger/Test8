import { useCallback, useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import axiosApi from '../../axiosApi';
import { Quote, ApiQuote } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import './QuoteList.css';

const QuoteList = () => {
  const location = useLocation();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = useCallback(async (categoryId: string | null) => {
    setLoading(true);
    try {
      if (location.pathname === '/' || location.pathname === '/categories') {
        const response = await axiosApi.get<Record<string, ApiQuote>>('/quotes.json');
        const quotesData = response.data;

        if (quotesData) {
          const transformedQuotes = Object.keys(quotesData).map(id => ({
            ...quotesData[id],
            id
          })).reverse();
          setQuotes(transformedQuotes);
        } else {
          setQuotes([]);
        }
      } else if (location.pathname === '/categories/' + categoryId) {
        const response = await axiosApi.get<Record<string, ApiQuote>>('/quotes.json?orderBy="category"&equalTo="' + categoryId + '"');
        const quotesData = response.data;
        if (quotesData) {
          const transformedQuotes = Object.keys(quotesData).map(id => ({
            ...quotesData[id],
            id
          })).reverse();
          setQuotes(transformedQuotes);
        } else {
          setQuotes([]);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const category = location.pathname.slice(1);
    void fetchQuotes(category);
  }, [location.pathname, fetchQuotes]);

  let content = <Preloader />;

  if (!loading) {
    if (quotes.length > 0) {
      content = (
        <div>
          {quotes.map(quote => (
            <div key={quote.id} className='quote-item'>
              <p className="quote-text">{quote.text}</p>
              <h2 className="quote-author">- {quote.author}</h2>
              <div className="quote-bottom">
                <Link className="quote-link" to={'/quotes/' + quote.id}>Читать далее...</Link>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      content = <h1>Цитат пока нет...</h1>;
    }
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default QuoteList;
