import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiCategory } from '../../types';
import './CategoryMenu.css';

interface CategoryMenuProps {
  onCategorySelect: (categoryId: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ onCategorySelect }) => {
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

  const handleCategorySelect = (categoryId: string) => {
    onCategorySelect(categoryId);
  };

  return (
    <div>
      <Link to={'/categories'} className="category-link">All</Link>
      {categories && categories.map((category) => (
        <Link key={category.id} to={'/categories/' + category.id} className="category-link" onClick={() => handleCategorySelect(category.id)}>
          {category.title}
        </Link>
      ))}
    </div>
  );
}

export default CategoryMenu;
