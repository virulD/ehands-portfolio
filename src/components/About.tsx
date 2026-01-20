import React from 'react';
import './About.css';

const About: React.FC = () => {
    return (
        <section id="about" className="about">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Us</h2>
                    <div className="underline"></div>
                </div>
                <div className="about-content">
                    <p>
                        We are an IT solutions company dedicated to helping modern businesses thrive in the digital age.
                        Our expertise lies in building high-quality mobile applications and robust web platforms that drive results.
                    </p>
                    <p>
                        At E Hands Solution, we focus on performance, simplicity, and reliability.
                        We believe that great technology should be accessible, intuitive, and built to last.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
