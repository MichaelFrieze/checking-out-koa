const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// Just an array we made to replicate a DB or something
const things = ['My Family', 'Programming', 'Music'];

// Middleware here
app.use(json());
app.use(bodyParser());

// Add additional properties to context just for fun
// Let's use this in the test to explain
app.context.user = 'Mike';

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

// Methods for Routes
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I love:',
    thingsView: things
  });
}

async function showAdd(ctx) {
  await ctx.render('add');
}

async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect('/');
}

// Test Route
// Above, we added an additional property to the context: app.context.user = 'Mike';
// Noticed we used backticks: `Hello ${ctx.user}`
router.get('/test', ctx => (ctx.body = `Hello ${ctx.user}`));

// I think this has to be here just to use the router
app.use(router.routes()).use(router.allowedMethods());

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server Started...'));
