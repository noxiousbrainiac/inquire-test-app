import React, { FC } from 'react';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className='main'>{children}</main>
		</>
	);
};

export default Layout;
