import { z } from 'zod';

export const toolSchema = z.object({
	name: z.string(),
	brandId: z.string(),
	genre: z.string(),
	image: z.string(),
	userId: z.string(),
});
