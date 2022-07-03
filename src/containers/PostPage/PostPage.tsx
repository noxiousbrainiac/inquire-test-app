import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
	Box,
	Container,
	IconButton,
	Typography,
	Button,
	TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { makeStyles } from '@mui/styles';
import { useParams } from 'react-router-dom';

import {
	getSinglePost,
	updateOldPost,
} from '../../store/actions/posts.actions';
import CommentForm from '../../components/CommentForm/CommentForm';
import { useAppDispatch, useAppSelector } from '../../store';
import { NewPost } from '../../types';

const useStyles = makeStyles({
	container: {
		paddingTop: '60px',
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		minHeight: '250px',
		marginBottom: '30px',
	},
	commentsBox: {
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: '15px',
	},
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
	editButton: {},
});

const PostPage: FC = () => {
	const dispatch = useAppDispatch();
	const classes = useStyles();
	const params = useParams();
	const { post } = useAppSelector(state => state.posts);
	const [edit, setEdit] = useState(false);
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

		setEdit(false);

		if (params.id) {
			dispatch(updateOldPost(value, +params.id));
		}
	};

	useEffect(() => {
		if (params.id) {
			dispatch(getSinglePost(params.id));
		}
	}, [dispatch, params.id]);

	useEffect(() => {
		if (post) {
			setValue(() => ({
				title: post.title,
				body: post.body,
			}));
		}
	}, [post]);

	return (
		post && (
			<Container maxWidth='md'>
				<Box position='relative' className={classes.container}>
					{edit && post && params.id && (
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
								save
							</Button>
						</Box>
					)}

					<Typography variant='h3' gutterBottom component='div'>
						{post.title}
					</Typography>

					<Typography variant='body1' gutterBottom component='div'>
						{post.body}
					</Typography>

					<CommentForm />

					<Box className={classes.commentsBox}>
						<Typography variant='subtitle1' gutterBottom component='div'>
							{post.comments.length !== 0 ? 'Comments' : 'No comments'}
						</Typography>
						{post.comments.map(com => (
							<Typography
								key={com.id}
								variant='overline'
								display='block'
								gutterBottom
							>
								- {com.body}
							</Typography>
						))}
					</Box>

					<IconButton
						onClick={() => setEdit(!edit)}
						sx={{ position: 'absolute', right: 0, top: 0 }}
					>
						<EditIcon fontSize='large' />
					</IconButton>
				</Box>
			</Container>
		)
	);
};

export default PostPage;
