'use client';

import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Slide,
	useScrollTrigger,
} from '@mui/material';
import * as React from 'react';
import { Logo, Link } from '@/components/common';

type Props = {
	window?: () => Window;
	children?: React.ReactElement<unknown>;
};

function HideOnScroll(props: Props) {
	const { children, window } = props;
	const isTriggered = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!isTriggered}>
			{children ?? <div />}
		</Slide>
	);
}

const Navigation = () => (
	<nav>
		<Box sx={{ display: 'flex', gap: 3 }}>
			<Link href="/">Home</Link>
			<Link href="/about">About</Link>
		</Box>
	</nav>
);

export const Header = () => (
	<React.Fragment>
		<HideOnScroll>
			<AppBar
				component="header"
				sx={{
					backgroundColor: 'primary.main',
				}}
			>
				<Toolbar
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Logo />
					<Typography
						component="div"
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
							flexGrow: 1,
						}}
						variant="h6"
					>
						ネイル図鑑
					</Typography>
					<Navigation />
				</Toolbar>
			</AppBar>
		</HideOnScroll>
	</React.Fragment>
);
