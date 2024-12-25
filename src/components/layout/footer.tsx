import { AppBar, Link, Toolbar } from '@mui/material';

export const Footer = () => (
	<AppBar
		position="fixed"
		sx={{
			top: 'auto',
			bottom: 0,
			marginTop: 'auto',
			backgroundColor: 'primary.main',
		}}
	>
		<Toolbar
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Link
				href="https://itk-koshiishi.net/"
				sx={{
					color: 'white',
					textDecoration: 'none',
					'&:hover': {
						textDecoration: 'underline',
					},
				}}
			>
				© 2024 Nekoyatu
			</Link>
		</Toolbar>
	</AppBar>
);
