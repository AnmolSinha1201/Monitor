import app from "../app.js";
import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const paywallMiddleware = async({ request, response, session }, next) => {
  const count = await session.get('count') ?? 0;
  session.set('count', Number(count) + 1);
  
  if (count < 3)
    await next();
  else
    response.body = 'This content is only for paying users.'
}

const requestTimingMiddleware = async({ request }, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${request.method} ${request.url.pathname} - ${ms} ms`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, paywallMiddleware };