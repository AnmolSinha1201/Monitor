import { Router } from "../deps.js";
import { hello } from "./controllers/helloController.js";
import * as helloController from "./controllers/helloController.js";
import * as helloApi from "./apis/helloApi.js";

const router = new Router();

// router.get('/', helloController.hello);
router.get('/', helloController.landing);
router.get('/behavior/reporting/Morning', helloController.reportMorning);
router.get('/behavior/reporting/Evening', helloController.reportEvening);

router.get('/api/news', helloApi.getHello);
router.post('/api/news', helloApi.setHello);
router.get('/api/news/:id', helloApi.getHelloSpecific);
router.delete('/api/news/:id', helloApi.deleteHello);

export { router };