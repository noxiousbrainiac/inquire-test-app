import React, { FC, useEffect } from 'react';
import PostsList from '../../components/PostList/PostList';
import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { getPosts } from '../../store/actions/posts.actions';

const HomePage: FC = () => {
	const { posts } = useAppSelector(state => state.posts);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);

	return (
		<Container>
			<PostsList posts={posts} />
		</Container>
	);
};

export default HomePage;
