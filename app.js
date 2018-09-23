const Koa = require('koa');
const KoaRouter = require('koa-router'); // have to add the require statement here
const json = require('koa-json');

const app = new Koa();
const router = new KoaRouter(); // had to create a new router instance and reference it

// This is just prettier JSON that might do some other stuff
app.use(json());

// Simple Middleware Example
// app.use(async ctx => (ctx.body = { msg: 'Hello World' }));

// This is just a simple route at localhost:3000/test
router.get('/test', ctx => (ctx.body = 'Hello Test'));

// Router Middleware
app.use(router.routes()).use(router.allowedMethods()); // Now we can use routes

app.listen(3000, () => console.log('Server Started...'));
