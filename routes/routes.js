import { Router } from "../deps.js";
import * as landingController from "./controllers/landingController.js";
import * as morningReportController from "./controllers/morningReportController.js";
import * as eveningReportController from "./controllers/eveningReportController.js";
import * as authController from "./controllers/authController.js";
import * as summaryController from "./controllers/summaryController.js";
import * as summaryApi from "./apis/summaryApi.js";

const router = new Router();

router.get('/auth/login', authController.loginGET);
router.post('/auth/login', authController.loginPOST);
router.get('/auth/register', authController.registerGET);
router.post('/auth/register', authController.registerPOST);
router.post('/auth/logout', authController.logout);


router.get('/', landingController.landing);
router.get('/behavior/reporting/Morning', morningReportController.reportMorningGET);
router.post('/behavior/reporting/Morning', morningReportController.reportMorningPOST);
router.get('/behavior/reporting/Evening', eveningReportController.reportEveningGET);
router.post('/behavior/reporting/Evening', eveningReportController.reportEveningPOST);

router.get('/behavior/summary', summaryController.summaryGET);
router.post('/behavior/summary', summaryController.summaryPOST);

router.get('/api/summary', summaryApi.getSummaryForAll);
router.get('/api/summary/:year/:month/:day', summaryApi.getSummaryForAllOnSpecificDay);

export { router };