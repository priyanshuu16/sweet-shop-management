import React from 'react';
import type { Sweet } from '../types';
import { useAuth } from '../context/auth.context';
import { ShoppingBag, Trash2, Edit } from 'lucide-react';

interface SweetCardProps {
    sweet: Sweet;
    onPurchase: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (sweet: Sweet) => void;
    purchasing: boolean;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase, onDelete, onEdit, purchasing }) => {
    const { user } = useAuth();
    const isAdmin = user?.role === 'ADMIN';

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)', fontWeight: 600 }}>
                        {sweet.category}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0' }}>{sweet.name}</h3>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
                    ${sweet.price.toFixed(2)}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: sweet.quantity > 0 ? 'var(--text-muted)' : '#ef4444', fontWeight: 500 }}>
                    {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of Stock'}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {isAdmin && (
                        <>
                            <button
                                onClick={() => onEdit(sweet)}
                                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer' }}
                                title="Edit Sweet"
                            >
                                <Edit size={16} />
                            </button>
                            <button
                                onClick={() => onDelete(sweet.id)}
                                style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #fee2e2', background: '#fef2f2', color: '#dc2626', cursor: 'pointer' }}
                                title="Delete Sweet"
                            >
                                <Trash2 size={16} />
                            </button>
                        </>
                    )}

                    <button
                        className="btn-primary"
                        disabled={sweet.quantity === 0 || purchasing}
                        onClick={() => onPurchase(sweet.id)}
                        style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <ShoppingBag size={18} />
                        Buy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SweetCard;
