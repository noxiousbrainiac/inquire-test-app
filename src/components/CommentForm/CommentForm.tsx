import React, { ChangeEvent, FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useAppDispatch } from '../../store';
import { createNewComment } from '../../store/actions/posts.actions';

const useStyles = makeStyles({
	textField: {
		marginBottom: '10px',
	},
	form: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		maxWidth: '350px',
		marginBottom: '15px',
	},
});

const CommentForm: FC = () => {
	const dispatch = useAppDispatch();
	const classes = useStyles();
	const params = useParams();
	const [body, setBody] = useState('');

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		setBody(event.target.value);
	};

	const handleClick = () => {
		if (body.length === 0) return alert('Fill empty fills!');

		if (params.id) {
			dispatch(createNewComment({ body, postId: +params.id }));
		}

		setBody('');
	};

	return (
		<Box className={classes.form}>
			<TextField
				label='Comment'
				value={body}
				name='body'
				onChange={handleChange}
				className={classes.textField}
			/>
			<Button onClick={handleClick} variant='contained'>
				Publish
			</Button>
		</Box>
	);
};

export default CommentForm;
