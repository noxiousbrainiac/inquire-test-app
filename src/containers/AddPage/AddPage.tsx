import React, { ChangeEvent, FC, useState } from 'react';
import { Container, Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

import { useAppDispatch } from '../../store';
import { createNewPost } from '../../store/actions/posts.actions';
import { NewPost } from '../../types';

const useStyles = makeStyles({
	box: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '250px',
	},
});

const AddPage: FC = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [value, setValue] = useState<NewPost>({
		title: '',
		body: '',
	});

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;

		setValue(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleClick = () => {
		if (value.title.length === 0 && value.body.length === 0)
			return alert('You have to fill empty fields!');

		dispatch(createNewPost(value));
		navigate('/');
		setValue(() => ({
			title: '',
			body: '',
		}));
	};

	return (
		<Container maxWidth='sm'>
			<Box className={classes.box}>
				<TextField
					label='Title'
					value={value.title}
					name='title'
					onChange={handleChange}
				/>

				<TextField
					label='Body'
					value={value.body}
					name='body'
					onChange={handleChange}
					multiline
					rows={4}
				/>
				<Button onClick={handleClick} variant='contained'>
					create
				</Button>
			</Box>
		</Container>
	);
};

export default AddPage;
