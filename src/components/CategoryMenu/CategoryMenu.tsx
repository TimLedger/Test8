import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiCategory } from '../../types';
import './CategoryMenu.css';

const CategoryMenu: React.FC = () => {
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

    fetchCategories();
  }, []);

  return (
    <div>
      <Link to={'/quotes'} className="category-link">All</Link>
      {categories && categories.map((category) => (
        <Link key={category.id} to={'/quotes/' + category.id} className="category-link">
          {category.title}
        </Link>
      ))}
    </div>
  );
}

export default CategoryMenu;
