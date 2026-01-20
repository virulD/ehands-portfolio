import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-logo">
                    E Hands<span>Solution</span>
                </div>
                <p className="copyright">
                    &copy; {currentYear} E Hands Solution. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
