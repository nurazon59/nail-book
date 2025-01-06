import type { AppType } from '@/app/api/[...route]/route';
import { Finger } from '@/components/nail';
import type { Nailset } from '@/types';
import { hc } from 'hono/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const client = hc<AppType>('/');

interface NailSetDetailProps {
	params: { id: string };
}

export async function generateStaticParams() {
	return [];
}

export default async function NailSetDetail({ params }: NailSetDetailProps) {
	const { id } = await params;
	const response = await client.api.nailsets[':id'].$get({ param: { id } });

	const data = await response.json();
	if ('error' in data) {
		return notFound();
	}
	const nailset: Nailset = {
		...data,
		createdAt: new Date(data.createdAt),
		updatedAt: new Date(data.updatedAt),
	};

	return (
		<div className="container m-auto items-center justify-around flex sm:flex-row">
			<div className="flex-col items-center">
				<h1 className="text-2xl font-semibold">{nailset.title}</h1>
				<Image
					src={nailset.image}
					alt={nailset.title}
					width={400}
					height={400}
				/>
				<p>{new Date(nailset.createdAt).toLocaleDateString()}</p>
			</div>
			<div className="grid grid-cols-2">
				{nailset.nails
					.sort((a, b) => a.finger - b.finger)
					.map((nail) => (
						<Finger key={nail.id} nail={nail} />
					))}
			</div>
		</div>
	);
}
