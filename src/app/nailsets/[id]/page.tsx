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
		<div className="container flex flex-col items-center">
			<h1 className="text-2xl font-semibold">{nailset.title}</h1>
			<Image src={nailset.image} alt={nailset.title} width={400} height={400} />
			<p>{new Date(nailset.createdAt).toLocaleDateString()}</p>
			<div className="flex">
				{nailset.nails.map((nail) => (
					<Finger key={nail.id} nail={nail} />
				))}
			</div>
		</div>
	);
}
