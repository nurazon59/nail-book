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
	const userId = session.user.uid as string;
	const response = await client.api.basecoat[':userId'].$get({
		param: { userId },
	});
	const data = await response.json();
	const basecoats = 'error' in data ? [] : data;
	return (
		<div>
			<h1>My Page</h1>
			<SignoutButton />
			<div className="flex flex-col">
				{basecoats.map((basecoat) => (
					<div key={basecoat.id}>
						<p>{basecoat.brand.name}</p>
						<p>{basecoat.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
