import { Router } from "../deps.js";
import { hello } from "./controllers/helloController.js";
import * as helloController from "./controllers/helloController.js";
import * as helloApi from "./apis/helloApi.js";

const router = new Router();

router.get('/', helloController.hello);
router.get('/news/:id', helloController.helloSpecific);

router.get('/api/news', helloApi.getHello);
router.post('/api/news', helloApi.setHello);
router.get('/api/news/:id', helloApi.getHelloSpecific);
router.delete('/api/news/:id', helloApi.deleteHello);

export { router };