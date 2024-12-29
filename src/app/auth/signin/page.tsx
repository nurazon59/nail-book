import { AuthButton } from '@/components/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
	const session = await getServerSession();

	if (session) {
		redirect('/');
	}

	return (
		<div>
			ネイル図鑑へようこそ
			<AuthButton />
		</div>
	);
}
