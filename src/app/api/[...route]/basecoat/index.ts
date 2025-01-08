import { db } from '@/lib/prisma';
import type { Basecoat } from '@/types';
import { Hono } from 'hono';

export const basecoat = new Hono().get('/:userId', async (c) => {
	try {
		const { userId } = c.req.param();
		const basecoat: Basecoat[] = await db.baseCoat.findMany({
			include: {
				brand: true,
			},
			where: {
				userId,
			},
		});
		return c.json(basecoat);
	} catch (error) {
		return c.json({ error: 'An error occurred' }, 500);
	}
});
