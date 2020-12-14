import { assertEquals , assertMatch} from "../../deps.js";
import { superoak } from "../../deps.js";
import {app} from "../../app.js";

Deno.test("Test if our views return anything at all", async() => {
    testClient = await superoak(app);
    const x = await testClient.get('/auth/login').expect(200);
});

Deno.test("Test if our views return anything at all", async() => {
    testClient = await superoak(app);
    const x = await testClient.get('/auth/register').expect(200);
});