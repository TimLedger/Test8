import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import axiosApi from '../../axiosApi';
import './FormQuotes.css';
import { ApiQuote, ApiCategory } from '../../types';

const FormQuotes: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filling, setFilling] = useState<ApiQuote>({
    author: '',
    category: '',
    text: '',
  });
  const [categories, setCategories] = useState<ApiCategory[] | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosApi.get('/categories.json');
        const categoriesData: ApiCategory[] = Object.values(response.data);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    void fetchCategories();
  }, []);

  useEffect(() => {
    const fetchQuote = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const response = await axiosApi.get('/quotes/' + params.id + '.json');
          const postData = response.data;
          setFilling({
            author: postData.author,
            category: postData.category,
            text: postData.text,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    void fetchQuote();
  }, [params.id]);

  // const quoteChanged = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;

  //   setFilling((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const quoteChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
  
    if (name === 'category') {
      setFilling((prevState) => ({
        ...prevState,
        category: value,
      }));
    } else {
      setFilling((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const quote = {
      author: filling.author,
      category: filling.category,
      text: filling.text,
    };

    try {
      if (params.id) {
        await axiosApi.put('/quotes/' + params.id + '.json', quote);
      } else {
        await axiosApi.post('/quotes.json', quote);
      }
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  let button = (
    <button type="submit" className="form-submit-btn">
      Сохранить
    </button>
  );

  if (loading) {
    button = <Preloader />;
  }

  return (
    <div className="form-frame">
      <form onSubmit={onFormSubmit} autoComplete="off" className="form">
        <div className="form-group">
          <select
            id="category"
            name="category"
            className="form-control"
            required
            value={filling.category}
            onChange={quoteChanged}
          >
            <option value="">Выберите категорию</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.title}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group">
          <input
            id="author"
            type="text"
            name="author"
            className="form-control"
            required
            value={filling.author}
            onChange={quoteChanged}
          />
          <label htmlFor="author" className="form-label">
            Автор
          </label>
        </div>
        <div className="form-group">
          <textarea
            id="text"
            name="text"
            className="form-control"
            rows={10}
            required
            value={filling.text}
            onChange={quoteChanged}
          />
          <label htmlFor="text" className="form-label">
            Текст цитаты
          </label>
        </div>
        {button}
      </form>
    </div>
  );
};

export default FormQuotes;
