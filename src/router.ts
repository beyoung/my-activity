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

// GET item
router.get('/api/todos/:id', ({ params }) => new Response(`Todo #${params.id}`));

// POST to the collection (we'll use async here)
router.post('/api/todos', async (request) => {
	const content = await request.json();

	return new Response('Creating Todo: ' + JSON.stringify(content));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
