import axios from 'axios';

import { AppDispatch } from '..';
import { NewComment, NewPost } from '../../types';
import postsSlice from '../slices/posts.slice';

const { fetchPosts, fetchSinglePost, createPost, deletePost } =
	postsSlice.actions;

export const getPosts = () => async (dispatch: AppDispatch) => {
	try {
		const { data } = await axios.get('https://bloggy-api.herokuapp.com/posts');

		dispatch(fetchPosts(data));
	} catch (error) {
		console.log(error);
	}
};

export const getSinglePost = (id: string) => async (dispatch: AppDispatch) => {
	try {
		const { data } = await axios.get(
			`https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`
		);

		dispatch(fetchSinglePost(data));
	} catch (error) {
		console.log(error);
	}
};

export const updateOldPost =
	(newData: NewPost, id: number) => async (dispatch: AppDispatch) => {
		try {
			await axios.put(`https://bloggy-api.herokuapp.com/posts/${id}`, newData);

			const { data } = await axios.get(
				`https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`
			);

			dispatch(fetchSinglePost(data));

			// dispatch(updatePost(data));
		} catch (error) {
			console.log(error);
		}
	};

export const createNewPost =
	(newPost: NewPost) => async (dispatch: AppDispatch) => {
		try {
			const { data } = await axios.post(
				`https://bloggy-api.herokuapp.com/posts`,
				newPost
			);

			dispatch(createPost(data));
		} catch (error) {
			console.log(error);
		}
	};

export const removePost = (id: number) => async (dispatch: AppDispatch) => {
	try {
		await axios.delete(`https://bloggy-api.herokuapp.com/posts/${id}`);

		dispatch(deletePost(id));
	} catch (error) {
		console.log(error);
	}
};

export const createNewComment =
	(newComment: NewComment) => async (dispatch: AppDispatch) => {
		try {
			await axios.post(`https://bloggy-api.herokuapp.com/comments`, newComment);

			const { data } = await axios.get(
				`https://bloggy-api.herokuapp.com/posts/${newComment.postId}?_embed=comments`
			);

			dispatch(fetchSinglePost(data));
		} catch (error) {
			console.log(error);
		}
	};
