import type { NailSet } from '@prisma/client';
import { Card } from '@/components/common';

export default async function Home() {
	// サーバーサイド環境に対応
	const baseUrl = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '';
	const response = await fetch(`${baseUrl}/api/nailsets`, { cache: 'no-store' });
	if (!response.ok) {
		console.error('Failed to fetch nailsets:', await response.text());
		return (
			<div className="container">
				<h1>Error fetching nailsets</h1>
			</div>
		);
	}

	const nailsets: NailSet[] = await response.json();
	console.log(nailsets);
	return (
		<div className="container">
			<h1>Hello, World!</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{nailsets.map((nailset) => (
					<Card key={nailset.id} {...nailset} />
				))}
				</div>
		</div>
	);
}
