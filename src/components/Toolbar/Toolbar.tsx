import React from 'react';
import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar: React.FC = () => {
    return (
        <nav className='main-nav'>
            <ul>
                <li>
                    <NavLink to="/quotes" className={({ isActive }) => isActive ? 'active-link' : 'link'}>Цитаты</NavLink>
                </li>
                <li>
                    <NavLink to="/new-quote" className={({ isActive }) => isActive ? 'active-link' : 'link'}>Добавить</NavLink>
                </li>
            </ul>                        
        </nav>
    );
}

export default Toolbar;
