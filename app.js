const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path'); // this allows us to work with file paths
const render = require('koa-ejs'); // had to require the ejs template engine

const app = new Koa();
const router = new KoaRouter();

app.use(json());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

router.get('/', async ctx => {
  await ctx.render('index');
});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

app.use(router.routes()).use(router.allowedMethods()); // Now we can use routes

app.listen(3000, () => console.log('Server Started...'));
