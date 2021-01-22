import { Router } from 'express';
import * as userCtrl from '../controllers/users.controller'
import { authJwt } from '../middlewares/'
import { verifySignup } from '../middlewares/'

const router = Router();

router.post("/", [
    authJwt.verifyToken, 
    authJwt.isAdmin], 
    verifySignup.checkRolesExisted,
    userCtrl.createUser)

export default router;