'use client';

import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';

export const AuthButton = () => {
	return (
		<Button
			onClick={() => signIn('google')}
			variant="contained"
			color="primary"
			startIcon={<Google />}
			sx={{ mt: 2, px: 4 }}
		>
			Sign in with Google
		</Button>
	);
};
