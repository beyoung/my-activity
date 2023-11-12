import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import type { IRequest as IttyRequest, Route } from 'itty-router';
import { Router, error } from 'itty-router';
import { records } from './db/schema/records';
import { eq, gte } from 'drizzle-orm';

const TOKEN = 'f9925d1162aeb2027de701b6505077229eae41f5';

interface Request extends IttyRequest {
	db: DrizzleD1Database;
}

async function injectDB(request: Request, env: Env) {
	const db = drizzle(env.DB);
	request.db = db;
}

interface Methods {
	get: Route;
	post: Route;
}

const router = Router<Request, Methods>({ base: '/' });

// GET collection index
router.get('/api/records', injectDB, async (request: Request, env: Env) => {
	const results = await request.db.select().from(records).where(gte(records.created, '2023-07-01 00:00:00'));
	return Response.json(results);
});

// GEt records collection filter by date
router.get('/api/records/:date', injectDB, async (request: Request, env: Env) => {
	const results = await request.db.select().from(records).where(gte(records.created, request.params.date));
	return Response.json(results);
});

// POST to the collection (we'll use async here)
router.post('/api/records/:date', injectDB, async (request: Request, env: Env) => {
	const token = request.query.token;
	if (token !== TOKEN) {
		return error(403, 'no permission');
	}
	const content = await request.json();
	const results = await request.db.select().from(records).where(eq(records.created, request.params.date));
	let result = null;
	if (results.length == 1) {
		const record = results[0];
		Object.keys(content).forEach((key: string) => {
			if (Object.keys(record.record).includes(key)) {
				content[key] += record.record[key];
			}
		});
		result = await request.db
			.update(records)
			.set({
				record: content,
			})
			.where(eq(records.created, request.params.date))
			.returning();
	} else {
		result = await request.db.insert(records).values({ record: content, created: request.params.date, user_id: 1 }).returning();
	}
	return new Response(JSON.stringify(result));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
