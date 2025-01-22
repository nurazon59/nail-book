import { db } from '@/lib/prisma';
import { toolSchema } from '@/lib/validator';
import type { Artnail } from '@/types';
import { zValidator } from '@hono/zod-validator';
import { Prisma } from '@prisma/client';
import { Hono } from 'hono';

export const artnail = new Hono()
	.get('/:userId', async (c) => {
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
			console.error(error);
			if (error instanceof Prisma.PrismaClientValidationError) {
				return c.json({ error: 'Validation error' }, 400);
			}
			return c.json({ error: 'Internal server error' }, 500);
		}
	})
	.post('/', zValidator('json', toolSchema), async (c) => {
		try {
			const { userId, brandId, name, genre, image } = await c.req.json();
			const artnail = await db.artNail.create({
				data: {
					userId,
					brandId,
					name,
					genre,
					image,
				},
			});
			return c.json(artnail, 201);
		} catch (error) {
			return c.json({ error: 'Internal server error' }, 500);
		}
	});
