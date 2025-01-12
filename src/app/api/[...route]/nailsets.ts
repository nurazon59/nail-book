import { db } from '@/lib/prisma';
import type { Nailset } from '@/types';
import { Hono } from 'hono';

export const nailsets = new Hono()
	.get('/', async (c) => {
		try {
			const nailsets = await db.nailSet.findMany();
			return c.json(nailsets);
		} catch (error) {
			console.error('Error fetching nailsets:', error);
			return c.json({ error: 'Failed to fetch nailsets' }, 500);
		}
	})
	.get('/:id', async (c) => {
		try {
			const nailsetId = c.req.param('id');
			const nailset: Nailset | null = await db.nailSet.findUnique({
				where: { id: nailsetId },
				include: {
					nails: {
						include: {
							art: {
								include: { brand: true },
							},
							color: {
								include: { brand: true },
							},
							base: {
								include: { brand: true },
							},
							top: {
								include: { brand: true },
							},
						},
					},
				},
			});
			if (!nailset) {
				return c.json({ error: 'Nailset not found' }, 404);
			}
			return c.json(nailset);
		} catch (error) {
			console.error('Error fetching nailset:', error);
			return c.json({ error: 'Failed to fetch nailset' }, 500);
		}
	});
