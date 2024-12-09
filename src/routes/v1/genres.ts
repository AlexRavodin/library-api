import {Router} from 'express';

import {list, show, destroy} from 'controllers/genres';

const router = Router();

router.get('/', list);

router.get('/:id([0-9]+)', show);

router.delete('/:id([0-9]+)', destroy);

export default router;
