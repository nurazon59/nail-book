'use client';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const SigninButton = () => {
	return (
		<Button onClick={() => signIn('google', { callbackUrl: '/' })}>
			Sign in
		</Button>
	);
};
