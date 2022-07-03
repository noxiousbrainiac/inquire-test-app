import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPost, PostState } from '../../types';

const initialState: PostState = {
	posts: [],
	post: null,
};

const name = 'posts';

const postsSlice = createSlice({
	name,
	initialState,
	reducers: {
		fetchPosts: (state: PostState, { payload }: PayloadAction<IPost[]>) => {
			state.posts = payload;
		},

		fetchSinglePost: (state: PostState, { payload }: PayloadAction<IPost>) => {
			state.post = payload;
		},

		createPost: (state: PostState, { payload }: PayloadAction<IPost>) => {
			state.posts.push(payload);
		},

		deletePost: (state: PostState, { payload }: PayloadAction<number>) => {
			state.posts = state.posts.filter(p => p.id !== payload);
		},
	},
});

export default postsSlice;
