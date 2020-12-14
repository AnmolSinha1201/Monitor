import { assertEquals , assertMatch} from "../deps.j";
import { superoak } from "../deps.js";
import {app} from "../app.js";

Deno.test("Test Middleware", async() => {
    const testClient = await superoak(app);
    await testClient.get('/api/nonexistingurl').expect(404);
});

Deno.test('test serveStaticFileMiddleware', async() => {
    const testClient = await superoak(app);
    await testClient.get('/static/file').expect(404);
})

Deno.test('expect normal access of middleware', async() => {
    const testClient = await superoak(app);
    await testClient.get('/').expect(200);
})

Deno.test('expect redirect', async() => {
    const testClient = await superoak(app);
    await testClient.get('/behavior/summary').expect(301);
})