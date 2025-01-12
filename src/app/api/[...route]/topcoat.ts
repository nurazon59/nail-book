import { db } from '@/lib/prisma';
import type { Topcoat } from '@/types';
import { Hono } from 'hono';

export const topcoat = new Hono().get('/:userId', async (c) => {
	try {
		const { userId } = c.req.param();
		const topcoat: Topcoat[] = await db.topCoat.findMany({
			include: {
				brand: true,
			},
			where: {
				userId,
			},
		});
		return c.json(topcoat);
	} catch (error) {
		return c.json({ error: 'An error occurred' }, 500);
	}
});
