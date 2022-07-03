import React, { FC } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	navbar: {
		flexGrow: 1,
	},
	mainTitle: {
		flexGrow: 1,
		textDecoration: 'none',
		color: '#fff',
	},
	subTitle: {
		textDecoration: 'none',
		color: '#fff',
	},
});

const Navbar: FC = () => {
	const classes = useStyles();

	return (
		<Box className={classes.navbar}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						component={Link}
						to='/'
						className={classes.mainTitle}
					>
						Posts
					</Typography>

					<Typography
						variant='h6'
						component={Link}
						to='/addNewPost'
						className={classes.subTitle}
					>
						Add post
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
