import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { productService } from '../firebase/services';
import type { Product } from '../firebase/services';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<'mobile' | 'business' | 'web'>('web');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return alert("Please upload an image");

        setSubmitting(true);
        try {
            await productService.addProduct({
                title,
                description,
                category
            }, image);

            // Reset form
            setTitle('');
            setDescription('');
            setCategory('web');
            setImage(null);

            // Refresh list
            fetchProducts();
            alert("Product added successfully!");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string, imageUrl: string) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await productService.deleteProduct(id, imageUrl);
            setProducts(products.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product");
        }
    };

    if (authLoading || !user) return <div className="loading-screen">Loading...</div>;

    return (
        <div className="admin-dashboard">
            <nav className="admin-nav">
                <div className="container">
                    <h1>E Hands Admin</h1>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
            </nav>

            <main className="container">
                <section className="product-form-section">
                    <h2>Add New Product</h2>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    required
                                    placeholder="Enter product name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={category}
                                    onChange={e => setCategory(e.target.value as any)}
                                >
                                    <option value="mobile">Mobile Application</option>
                                    <option value="business">Business Website</option>
                                    <option value="web">Web Application</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    required
                                    placeholder="Enter product description"
                                    rows={4}
                                ></textarea>
                            </div>
                            <div className="form-group full-width">
                                <label>Product Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImage(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="submit-btn" disabled={submitting}>
                            {submitting ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </form>
                </section>

                <section className="products-list-section">
                    <h2>Existing Products</h2>
                    {loading ? (
                        <p>Loading products...</p>
                    ) : (
                        <div className="admin-products-grid">
                            {products.map(product => (
                                <div key={product.id} className="admin-product-card">
                                    <img src={product.imageUrl} alt={product.title} />
                                    <div className="admin-product-info">
                                        <h3>{product.title}</h3>
                                        <p className="category-tag">{product.category}</p>
                                        <button
                                            onClick={() => handleDelete(product.id!, product.imageUrl)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
