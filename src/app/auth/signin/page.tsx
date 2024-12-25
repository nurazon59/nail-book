import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { Container, Typography } from '@mui/material';
import { AuthButton } from '@/components/auth';

export default async function SignInPage() {
	const session = await getServerSession();

	if (session) {
		redirect('/');
	}

	return (
		<Container
			component="div"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Typography variant="h4" gutterBottom>
				ネイル図鑑へようこそ
			</Typography>
			<AuthButton />
		</Container>
	);
}
