import { db } from '@/lib/prisma';
import type { Artnail } from '@/types';
import { Hono } from 'hono';

export const artnail = new Hono().get('/:userId', async (c) => {
	try {
		const { userId } = c.req.param();
		const artnail: Artnail[] = await db.artNail.findMany({
			include: {
				brand: true,
			},
			where: {
				userId,
			},
		});
		return c.json(artnail);
	} catch (error) {
		return c.json({ error: 'An error occurred' }, 500);
	}
});
