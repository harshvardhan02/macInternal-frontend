import React from 'react';
import Header from '../Header/container';
import Footer from '../../components/Footer';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;