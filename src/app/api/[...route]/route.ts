import { db } from '@/lib/prisma';
import type { Nailset } from '@/types/nail';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

app.get('/nailsets', async (c) => {
	try {
		const nailsets = await db.nailSet.findMany();
		return c.json(nailsets);
	} catch (error) {
		console.error('Error fetching nailsets:', error);
		return c.json({ error: 'Failed to fetch nailsets' }, 500);
	}
});

app.get('/nailsets/:id', async (c) => {
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

export const GET = handle(app);
