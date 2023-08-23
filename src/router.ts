import { Router } from 'itty-router';

// now let's create a router (note the lack of "new")
const router = Router();

// GET collection index
router.get('/api/todos', async (request) => {
	const { results } = await request.db.prepare(
        "SELECT * FROM sports WHERE created >'2023-08-18 00:00:00'"
	).all();
	return Response.json(results);
});

router.get('/api/todos/:date', async (request) => {
	const { results } = await request.db.prepare(
		`SELECT * FROM sports WHERE created > '${request.params.date}'`
	).all();
	return Response.json(results);
});

// POST to the collection (we'll use async here)
router.post('/api/todos', async (request) => {
	const content = await request.json();
	let item = [];
	for (const key of Object.keys(content.record)) {
		item.push(`'$.${key}'`);
		item.push(content.record[key]);
	}
	const json_value = item.join(",");
	const info = await request.db.prepare(
		`insert into sports (record, created) values (JSON_INSERT('{}', ${json_value}), '${content.date}')`
	).run();
	return new Response('Creating Todo: ' + JSON.stringify(content));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
