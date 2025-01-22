'use client';
import { client } from '@/lib/hono';
import { Button } from '../ui/button';

export function CreateButton({
	userId,
}: {
	userId: string;
}) {
	return (
		<Button
			onClick={async () => {
				await client.api.artnail.$post({
					json: {
						image: 'https://example.com/image.jpg',
						userId: 'cm5tsi7qd0005371i4nfvd1yx',
						name: 'name',
						brandId: 'cm5tsi7pn0000371izoxh79be',
						genre: 'genre',
					},
				});
			}}
		>
			Create
		</Button>
	);
}
