import { SignoutButton } from '@/components/auth';
import { client } from '@/lib/hono';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function MyPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/');
	}
	const userId = session.user.uid;
	const response = await client.api.user[':id'].$get({ param: { id: userId } });
	const data = await response.json();
	return (
		<div>
			<h1>My Page</h1>
			<SignoutButton />
		</div>
	);
}
