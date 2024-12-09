import { Router } from 'express';

import { list, show, edit, destroy } from 'controllers/books';

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.patch('/:id([0-9]+)', edit);

router.delete('/:id([0-9]+)', destroy);

export default router;
