import React, { FC } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { IPost } from '../../types';
import PostCard from '../PostCard/PostCard';

interface PostListProps {
	posts: IPost[];
}

const useStyles = makeStyles({
	listBox: {
		display: 'flex',
		flexWrap: 'wrap',
	},
});

const PostsList: FC<PostListProps> = ({ posts }) => {
	const classes = useStyles();

	return (
		<Box className={classes.listBox}>
			{posts &&
				posts.map((post: IPost) => (
					<PostCard
						key={post.id}
						title={post.title}
						body={post.body}
						id={post.id}
					/>
				))}
		</Box>
	);
};

export default PostsList;
