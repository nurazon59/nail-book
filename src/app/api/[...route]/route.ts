import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { artnail } from './artnail';
import { basecoat } from './basecoat';
import { colornail } from './colornail';
import { nailsets } from './nailsets';
import { topcoat } from './topcoat';
import { user } from './user';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const route = app
	.route('/nailsets', nailsets)
	.route('/user', user)
	.route('/basecoat', basecoat)
	.route('/topcoat', topcoat)
	.route('/artnail', artnail)
	.route('/colornail', colornail);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
