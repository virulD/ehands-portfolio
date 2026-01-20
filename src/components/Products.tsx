import React from 'react';
import myClinicImg from '../images/Untitled design.png';
import eventsImg from '../images/eventss.png';
import './Products.css';

interface Product {
    id: string;
    title: string;
    description: string;
    category: 'mobile' | 'business' | 'web';
    imageUrl: string;
}

const products: Product[] = [
    {
        id: '1',
        title: 'MyClinic App',
        description: 'A location-based doctor appointment booking app that enables users to find nearby dispensaries and doctors within a 2 km radius by using real-time GPS data. Users can easily book appointments from home, making healthcare access faster, smarter, and more convenient.',
        category: 'mobile',
        imageUrl: myClinicImg
    },
    {
        id: '2',
        title: 'E-Commerce Platform',
        description: 'A comprehensive business website solution with integrated payment gateways and inventory management.',
        category: 'business',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '3',
        title: 'Event Booking Platform',
        description: 'A flexible event booking and management platform that allows organizers to create, manage, and organize any type of event while enabling users to easily browse and book events through a centralized system.',
        category: 'web',
        imageUrl: eventsImg
    }
];

const Products: React.FC = () => {
    const getIcon = (category: string) => {
        switch (category) {
            case 'mobile':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>;
            case 'business':
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
            case 'web':
            default:
                return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>;
        }
    };

    return (
        <section id="products" className="products">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Our Products & Services</h2>
                    <div className="underline"></div>
                </div>
                <div className="products-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.imageUrl} alt={product.title} />
                                <div className="product-icon-overlay">{getIcon(product.category)}</div>
                            </div>
                            <div className="product-content">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-category">{product.category}</p>
                                <p className="product-description">{product.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
