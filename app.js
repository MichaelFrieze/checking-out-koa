const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const path = require('path'); // this allows us to work with file paths
const render = require('koa-ejs'); // had to require the ejs template engine

const app = new Koa();
const router = new KoaRouter();

app.use(json());

// call render and then pass in the app
// Also we will pass in all kinds of options here
// first will be root which is folder where the template engine will look for templates
// __dirname is just the directory to look in which we will call views
// second thing we need is a layout and we will call it layout.html
// this wraps all of our views because we don't want to put like HTML head tags and everything in the head on every single view
// that would be repeating yourself like crazy
// so we want to have one layout with that and just insert your views into that layout
// then we want to configure our view extension which will be HTML
// we can set cache to false
// set debug to false as well
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Index to route
// will use async on the ctx (context) so now we will just have to use await
// we will have to create a views folder in the root
// inside views, create file layout.html and index.html
router.get('/', async ctx => {
  await ctx.render('index');
});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

app.use(router.routes()).use(router.allowedMethods()); // Now we can use routes

app.listen(3000, () => console.log('Server Started...'));
