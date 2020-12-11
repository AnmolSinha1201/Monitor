import { Router } from "../deps.js";
import { hello } from "./controllers/helloController.js";
import * as helloController from "./controllers/helloController.js";
import * as helloApi from "./apis/helloApi.js";
import * as authController from "./controllers/authController.js";

const router = new Router();

router.get('/auth/login', authController.loginGET);
router.post('/auth/login', authController.loginPOST);
router.get('/auth/register', authController.registerGET);
router.post('/auth/register', authController.registerPOST);


router.get('/', helloController.landing);
router.get('/behavior/reporting/Morning', helloController.reportMorningGET);
router.post('/behavior/reporting/Morning', helloController.reportMorningPOST);
router.get('/behavior/reporting/Evening', helloController.reportEveningGET);

router.get('/api/news', helloApi.getHello);
router.post('/api/news', helloApi.setHello);
router.get('/api/news/:id', helloApi.getHelloSpecific);
router.delete('/api/news/:id', helloApi.deleteHello);

export { router };