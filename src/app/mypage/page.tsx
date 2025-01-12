import { SignoutButton } from '@/components/auth';
import { NailTool } from '@/components/nail/tool';
import { client } from '@/lib/hono';
import type { Tool } from '@/types';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

type ApiEndpoints = 'basecoat' | 'topcoat' | 'colornail' | 'artnail';

async function fetchData(
	endpoint: ApiEndpoints,
	userId: string,
): Promise<Tool[]> {
	const response = await client.api[endpoint][':userId'].$get({
		param: { userId },
	});
	const data = await response.json();
	return 'error' in data ? [] : data;
}

export default async function MyPage() {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect('/');
	}
	const userId = session.user.uid as string;

	const [basecoats, topcoats, colornails, artnails] = await Promise.all([
		fetchData('basecoat', userId),
		fetchData('topcoat', userId),
		fetchData('colornail', userId),
		fetchData('artnail', userId),
	]);

	return (
		<div>
			<h1>My Page</h1>
			<SignoutButton />
			<div className="flex flex-col">
				{basecoats.map((basecoat) => (
					<NailTool key={basecoat.id} prop={basecoat} title="basecoat" />
				))}
				{topcoats.map((topcoat) => (
					<NailTool key={topcoat.id} prop={topcoat} title="topcoat" />
				))}
				{colornails.map((colornail) => (
					<NailTool key={colornail.id} prop={colornail} title="colornail" />
				))}
				{artnails.map((artnail) => (
					<NailTool key={artnail.id} prop={artnail} title="artnail" />
				))}
			</div>
		</div>
	);
}
