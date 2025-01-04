import { Finger } from '@/components/nail';
import type { Nailset } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface NailSetDetailProps {
	params: { id: string };
}

export async function generateStaticParams() {
	return [];
}

export default async function NailSetDetail({ params }: NailSetDetailProps) {
	const { id } = await params;
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
	const response = await fetch(`${baseUrl}/api/nailsets/${id}`, {
		cache: 'no-store',
	});

	if (!response.ok) {
		notFound();
	}

	const nailset: Nailset = await response.json();

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
