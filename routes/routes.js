import { Router } from "../deps.js";
import * as landingController from "./controllers/landingController.js";
import * as morningReportController from "./controllers/morningReportController.js";
import * as eveningReportController from "./controllers/eveningReportController.js";
import * as helloApi from "./apis/helloApi.js";
import * as authController from "./controllers/authController.js";
import * as summaryController from "./controllers/summaryController.js";

const router = new Router();

router.get('/auth/login', authController.loginGET);
router.post('/auth/login', authController.loginPOST);
router.get('/auth/register', authController.registerGET);
router.post('/auth/register', authController.registerPOST);


router.get('/', landingController.landing);
router.get('/behavior/reporting/Morning', morningReportController.reportMorningGET);
router.post('/behavior/reporting/Morning', morningReportController.reportMorningPOST);
router.get('/behavior/reporting/Evening', eveningReportController.reportEveningGET);
router.post('/behavior/reporting/Evening', eveningReportController.reportEveningPOST);

router.get('/behavior/summary', summaryController.summaryGET);
router.post('/behavior/summary', summaryController.summaryPOST);

router.get('/api/news', helloApi.getHello);
router.post('/api/news', helloApi.setHello);
router.get('/api/news/:id', helloApi.getHelloSpecific);
router.delete('/api/news/:id', helloApi.deleteHello);

export { router };