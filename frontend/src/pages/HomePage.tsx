import React, { useEffect, useState } from 'react';
import { getSweets, searchSweets, purchaseSweet, deleteSweet, createSweet, updateSweet } from '../api/sweets';
import type { Sweet } from '../types';
import SweetCard from '../components/SweetCard';
import { Search, Plus, X } from 'lucide-react';
import { useAuth } from '../context/auth.context';

const HomePage: React.FC = () => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    // Search State
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Modal State (Add/Edit)
    const [showModal, setShowModal] = useState(false);
    const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

    // Form State
    const [formName, setFormName] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [formPrice, setFormPrice] = useState('');
    const [formQuantity, setFormQuantity] = useState('');

    useEffect(() => {
        fetchSweets();
    }, []);

    // Debounced search effect could be added here, but triggered by form submit/button for now
    const fetchSweets = async () => {
        setLoading(true);
        try {
            if (searchName || searchCategory || minPrice || maxPrice) {
                const data = await searchSweets({
                    name: searchName,
                    category: searchCategory,
                    minPrice: minPrice ? Number(minPrice) : undefined,
                    maxPrice: maxPrice ? Number(maxPrice) : undefined
                });
                setSweets(data);
            } else {
                const data = await getSweets();
                setSweets(data);
            }
        } catch (error) {
            console.error("Failed to fetch sweets", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (id: string) => {
        setPurchasing(true);
        try {
            await purchaseSweet(id);
            // Optimistic update or refetch
            setSweets(prev => prev.map(s => s.id === id ? { ...s, quantity: s.quantity - 1 } : s));
        } catch (error) {
            alert("Failed to purchase sweet.");
        } finally {
            setPurchasing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this sweet?")) return;
        try {
            await deleteSweet(id);
            setSweets(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            alert("Failed to delete sweet.");
        }
    };

    const handleSaveSweet = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const sweetData = {
                name: formName,
                category: formCategory,
                price: Number(formPrice),
                quantity: Number(formQuantity)
            };

            if (editingSweet) {
                // Update logic (Not fully implemented in backend API for PUT, but assuming it exists or similar)
                // Wait, backend has PUT /:id
                const updated = await updateSweet(editingSweet.id, sweetData);
                setSweets(prev => prev.map(s => s.id === updated.id ? updated : s));
            } else {
                const created = await createSweet(sweetData);
                setSweets(prev => [...prev, created]);
            }
            closeModal();
        } catch (error) {
            alert("Failed to save sweet.");
        }
    };

    const openAddModal = () => {
        setEditingSweet(null);
        setFormName('');
        setFormCategory('');
        setFormPrice('');
        setFormQuantity('');
        setShowModal(true);
    };

    const openEditModal = (sweet: Sweet) => {
        setEditingSweet(sweet);
        setFormName(sweet.name);
        setFormCategory(sweet.category);
        setFormPrice(String(sweet.price));
        setFormQuantity(String(sweet.quantity));
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingSweet(null);
    };

    return (
        <div>
            {/* Hero / Filter Section */}
            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Our Collection
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>Find your favorite treats</p>
                    </div>
                    {isAdmin && (
                        <button className="btn-primary" onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Add Sweet
                        </button>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', alignItems: 'end' }}>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Search</label>
                        <input
                            className="input-field"
                            placeholder="Name..."
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Category</label>
                        <input
                            className="input-field"
                            placeholder="All Categories"
                            value={searchCategory}
                            onChange={e => setSearchCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Price Range</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                className="input-field"
                                placeholder="Min"
                                type="number"
                                value={minPrice}
                                onChange={e => setMinPrice(e.target.value)}
                            />
                            <input
                                className="input-field"
                                placeholder="Max"
                                type="number"
                                value={maxPrice}
                                onChange={e => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={fetchSweets} style={{ height: '42px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Search size={20} />
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>Loading sweets...</div>
            ) : sweets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>No sweets found.</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {sweets.map(sweet => (
                        <SweetCard
                            key={sweet.id}
                            sweet={sweet}
                            onPurchase={handlePurchase}
                            onDelete={handleDelete}
                            onEdit={openEditModal}
                            purchasing={purchasing}
                        />
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
                    <div className="glass-panel" style={{ background: 'var(--surface)', padding: '2rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
                        <button onClick={closeModal} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <X size={24} color="var(--text-muted)" />
                        </button>
                        <h2 style={{ marginTop: 0 }}>{editingSweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
                        <form onSubmit={handleSaveSweet} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                                <input className="input-field" value={formName} onChange={e => setFormName(e.target.value)} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                                <input className="input-field" value={formCategory} onChange={e => setFormCategory(e.target.value)} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Price</label>
                                    <input className="input-field" type="number" step="0.01" value={formPrice} onChange={e => setFormPrice(e.target.value)} required />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quantity</label>
                                    <input className="input-field" type="number" value={formQuantity} onChange={e => setFormQuantity(e.target.value)} required />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                                {editingSweet ? 'Update Sweet' : 'Add Sweet'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
