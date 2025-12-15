import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import { Candy, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{
            position: 'sticky',
            top: '1rem',
            margin: '0 1rem',
            zIndex: 50,
            padding: '0.75rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary-hover)' }}>
                <Candy size={28} />
                <span>SweetManager</span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/" style={{ fontWeight: 500 }}>Shop</Link>
                        {user?.role === 'ADMIN' && (
                            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--primary)', color: 'white', borderRadius: '1rem' }}>Admin</span>
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={18} />
                            <span>{user?.email}</span>
                        </div>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ fontWeight: 500 }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
