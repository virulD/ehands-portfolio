import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <h1 className="hero-title">
                    E Hands Solution
                </h1>
                <p className="hero-tagline">
                    Building reliable apps and websites for modern businesses.
                </p>
                <a href="#products" className="cta-button">
                    View Our Products
                </a>
            </div>
        </section>
    );
};

export default Hero;
