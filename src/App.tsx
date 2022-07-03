import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './containers/HomePage/HomePage';
import AddPage from './containers/AddPage/AddPage';
import PostPage from './containers/PostPage/PostPage';

const App = () => {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/posts/:id' element={<PostPage />} />
				<Route path='/addNewPost' element={<AddPage />} />
			</Routes>
		</Layout>
	);
};

export default App;
