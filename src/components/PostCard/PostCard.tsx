import React, { FC, SyntheticEvent } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { IPost } from '../../types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useAppDispatch } from '../../store';
import { removePost } from '../../store/actions/posts.actions';

const useStyles = makeStyles({
	card: {
		flex: '1 1 300px',
		margin: '15px',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
	},
	closeButton: {
		alignSelf: 'flex-end',
	},
});

const PostCard: FC<Omit<IPost, 'comments'>> = ({ title, body, id }) => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleClick = (event: SyntheticEvent) => {
		event.stopPropagation();

		if (id) dispatch(removePost(id));
	};

	return (
		<Card
			className={classes.card}
			onClick={() => navigate(`/posts/${id}`, { state: id })}
		>
			<CardContent className={classes.content}>
				<IconButton className={classes.closeButton} onClick={handleClick}>
					<HighlightOffIcon fontSize='large' />
				</IconButton>
				<Typography gutterBottom variant='h5' component='div'>
					{title}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{body}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default PostCard;
