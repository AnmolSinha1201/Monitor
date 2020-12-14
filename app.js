import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { Session } from "./deps.js";

const app = new Application();
const session = new Session({ framework: "oak" });
await session.init();

app.use(session.use()(session));

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(middleware.errorMiddleware);
// app.use(middleware.paywallMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);
app.use(middleware.authenticationMiddleware);


app.use(router.routes());

let port = 7777;
if (Deno.args.length > 0) {  
  const lastArgument = Deno.args[Deno.args.length - 1];  
  myPort = Number(lastArgument);    
}
app.listen({ port: port });
  
export default app;