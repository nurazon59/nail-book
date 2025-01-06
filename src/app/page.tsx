import { Card } from '@/components/common';
import { client } from '@/lib/hono';
import type { NailSet } from '@prisma/client';

export default async function Home() {
	const response = await client.api.nailsets.$get();
	const data = await response.json();

	if ('error' in data) {
		return <div>Failed to fetch nailsets</div>;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const nailsets: NailSet[] = data.map((nailset: any) => ({
		...nailset,
		createdAt: new Date(nailset.createdAt),
		updatedAt: new Date(nailset.updatedAt),
	}));

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
