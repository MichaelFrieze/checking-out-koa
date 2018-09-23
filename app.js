const Koa = require('koa');

const app = new Koa();

// Using async here! pretty cool.
// ctx is interesting here
app.use(async ctx => (ctx.body = 'Hello World'));

// Just starting up a simple server
app.listen(3000, () => console.log('Server Started...'));
