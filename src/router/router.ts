import { Router } from "express";
import mainController from '../controllers/main.controller'
import majorController from "../controllers/major.controller";
import userController from "../controllers/user.controller";
import checkAuth from "../middleware/checkAuth";
import path from 'path';

const router = Router()

router.get("/", checkAuth, mainController.index)

router.get('/about', mainController.about)
router.get('/hb1', mainController.hb1)
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/cookie', mainController.testeCookie)
router.get('/ranking', checkAuth, mainController.ranking)
//extra
router.get('/lorem/:qt', mainController.lorem)

//Rotas do controlador Major
router.get("/majors", majorController.index)
//NOTE: fiquei com uma reflexao aqui no final, eu acho que o usuario nao deveria poder criar majors sem estar logado só que da primeira vez ele precisa criar algum major para ter algum curso em que o user vai ser criado
router.all("/majors/create", majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", checkAuth, majorController.update)
router.post("/majors/remove/:id", checkAuth, majorController.remove) //nao faca uma rota de remocao com get, uma rota get nunca pode fazer uma alteracao no seu sistema, convencao

//Rotas do controlador User
router.get("/users", userController.index)
router.all("/users/create", userController.create)
router.get("/users/read/:id", userController.read)
router.all("/users/update/:id", checkAuth, userController.update)
router.post("/users/remove/:id", checkAuth, userController.remove)
//extras login logout
router.all("/users/login", userController.login)
router.all("/users/logout", userController.logout)
router.post('/users/saveScore/:score', checkAuth, userController.saveScore);


export default router
