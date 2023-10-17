import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import type { IRequest as IttyRequest, Route } from 'itty-router';
import { Router } from 'itty-router';
import { users } from './db/schema/users';
import { records } from './db/schema/records';
import { eq, lt, gte, ne, sql } from "drizzle-orm";

interface Request extends IttyRequest {
	db: DrizzleD1Database;
}

async function injectDB(reuqest: Request, env: Env) {
	const db = drizzle(env.DB);
	reuqest.db = db;
}

interface Methods {
	get: Route;
	post: Route;
}

const router = Router<Request, Methods>({ base: '/' });

// GET collection index
router.get('/api/todos', injectDB, async (request: Request, env: Env) => {
	const results = await request.db.select().from(records).where(gte(records.created, "2023-09-01 00:00:00"));
	return Response.json(results);
});

// GEt records collection filter by date
router.get('/api/todos/:date', injectDB, async (request: Request, env: Env) => {
	const results = await request.db.select().from(records).where(gte(records.created, request.params.date));
	return Response.json(results);
});

// POST to the collection (we'll use async here)
router.post('/api/todos/:date', injectDB, async (request: Request, env: Env) => {
	const content = await request.json();
	let item = [];
	console.log(content);
	// for (const key of Object.keys(content.record)) {
	// 	item.push(`'$.${key}'`);
	// 	item.push(content.record[key]);
	// }
	// console.log("item => ",item)
	console.log(request.params.date)
	const results = await request.db.select().from(records).where(eq(records.created, request.params.date));
	console.log("results => ", results);
	if (results.length > 0) {
		// update
	}
	// const json_value = item.join(",");
	// const info = await request.db.prepare(
	// 	`insert into sports (record, created) values (JSON_INSERT('{}', ${json_value}), '${content.date}')`
	// ).run();

	return new Response('Creating Todo: ' + JSON.stringify(content));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
