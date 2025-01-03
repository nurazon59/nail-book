import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Card as SCard,
} from '@/components/ui/card';
import type { NailSet } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

export const Card = (props: NailSet) => {
	const { title, image, createdAt, id } = props;
	return (
		<Link href={`/nailsets/${id}`}>
			<SCard className="max-w-sm border">
				<CardHeader>
					<Image
						src={image}
						alt={title}
						className="w-full h-48 object-cover rounded-t-lg"
						width={500}
						height={500}
					/>
				</CardHeader>
				<CardContent>
					<CardTitle className="text-lg font-semibold">{title}</CardTitle>
					<CardDescription className="text-sm text-gray-500">
						{new Date(createdAt).toLocaleDateString()}
					</CardDescription>
				</CardContent>
			</SCard>
		</Link>
	);
};
