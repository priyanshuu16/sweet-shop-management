import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
            <Navbar />
            <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
