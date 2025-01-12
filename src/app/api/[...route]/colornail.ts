import { db } from '@/lib/prisma';
import type { Colornail } from '@/types';
import { Hono } from 'hono';

export const colornail = new Hono().get('/:userId', async (c) => {
	try {
		const { userId } = c.req.param();
		const colornail: Colornail[] = await db.colorNail.findMany({
			include: {
				brand: true,
			},
			where: {
				userId,
			},
		});
		return c.json(colornail);
	} catch (error) {
		return c.json({ error: 'An error occurred' }, 500);
	}
});
