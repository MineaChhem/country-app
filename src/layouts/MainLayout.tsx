import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type MainLayoutProps = {
    children: React.ReactNode; // The page-specific content
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            {/* <Header /> */}
            <main style={{ padding: '20px' }}>{children}</main>
            {/* <Footer /> */}
        </div>
    );
}

export default MainLayout;