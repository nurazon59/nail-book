import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { nailsets } from './nailsets';
import { user } from './user';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api');

const route = app.route('/nailsets', nailsets).route('/user', user);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
