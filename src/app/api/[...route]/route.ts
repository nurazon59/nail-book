import { db } from '@/lib/prisma';
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

export const GET = handle(app);
