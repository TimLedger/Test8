import React from 'react';
import { FaVk, FaGithub, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <p className='footer-text'>&copy; 2024 Коллекция цитат. Все права защищены.</p>
                    <div className="social-links">
                        <a href="https://vk.com/tledger" target="_blank" rel="noopener noreferrer"><FaVk /></a>
                        <a href="https://www.instagram.com/ttimledger/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://github.com/TimLedger" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                        <a href="https://t.me/koncepciia" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;