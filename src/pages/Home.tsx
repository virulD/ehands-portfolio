import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Products />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
