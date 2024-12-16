import {Router} from 'express';
import {checkJwt} from "../../middleware/checkJwt";
import {validatorCreateLoan} from "../../middleware/validation/loan/validatorCreateLoan";
import {list, create, destroy, current, edit} from 'controllers/loans';
import {checkRole} from "../../middleware/checkRole";


const router = Router();

router.get('/', [checkJwt, checkRole(['ADMINISTRATOR'], true)], list);

router.post('/', [checkJwt, checkRole(['STANDARD'], true), validatorCreateLoan], create);

router.get('/current', [checkJwt], current);

router.patch('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)], edit);

router.delete('/:id([0-9]+)', [checkJwt, checkRole(['ADMINISTRATOR'], true)],  destroy);

export default router;
