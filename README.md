# Hackers' Node.js app skeleton

Hi! Use it for your hacks, experiments, maybe not on production ;) 

Technology stack is pragmatic and minimalistic. I tried to keep number of dependencies to reasonable minimum.
It requires no special tooling except **Node.js** itself.

Front-end is built in _naive_ fashion: frameworkless, plain old CSS and HTML templates. 
 
## Running

You need to provide a couple of environment variables to run the app.  

`node app.js`

When developing on local machine, make sure you set CLIENT_ID and CLIENT_SECRET.

### Environment variables

* `PORT` port the app listen to, defaults to **3000**
* `CLIENT_ID` API key
* `CLIENT_SECRET` API secret key 
* `REDIRECT_URI` URL to redirect to after successful OAuth authentication, if not set, defaults to http://localhost:3000/auth/callback

## Customization guide

### UI

The template language used is EJS.
By default, templates are build on [Materialize CSS framework](https://materializecss.com). 
It is modern, responsive, based on Material Design. I found it quite easy to learn and lightweight (i.e. you do not need twenty seven classes to set up a simple grid).

Points of interest:

* `views/partials/header.ejs` reusable header (`<HEAD>` section). Set the title here.
* `views/partials/nav.ejs` reusable navigation header
* `public/css/mystyles.css` customize and add your styles

### Backend

Back-end logic is based on well known Express framework. 

* Look for routes in `app/routes`
* Views are in `views/`