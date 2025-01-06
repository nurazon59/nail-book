import { Card } from '@/components/common';
import type { NailSet } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
	const baseUrl =
		typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '';
	const nailSetsApiResponse = await fetch(`${baseUrl}/api/nailsets`, {
		cache: 'no-store',
	});
	if (!nailSetsApiResponse.ok) {
		console.error(
			'Failed to fetch nailsets:',
			await nailSetsApiResponse.text(),
		);
		return (
			<div className="container">
				<h1>Error fetching nailsets</h1>
			</div>
		);
	}

	const nailsets: NailSet[] = await nailSetsApiResponse.json();

	return (
		<div className="container">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{nailsets.map((nailset) => (
					<Card key={nailset.id} {...nailset} />
				))}
			</div>
		</div>
	);
}
