# RSS-Reader
----

##Description
A simple RSS Reader app build with Node and React, which takes in a URL and looks for a RSS feed at that URL. It then proceeds to pull the current content present in that feed.

- Validations performed for null/malformed URL or server error.
- Fully ReSTful API, along with appropriate HTTP status codes .

##Tech Stack
- Backend: NodeJS, ExpressJS, `rss-parser` NPM module
- Frontend: ReactJS, `react-bootstrap` components
 - Build system: Gulp
 - JSX conversion using Babel
 - Module bundler: Browserify

##Folder Structure
This structure can be found at my [seed project repo on GitHub](http://github.com/adityamedhe/react-express-seed)

- `app.js` NodeJS application
- `package.json` server side NPM dependencies
- static/
 - `index.html` HTML page for the app
 - `package.json` client side NPM dependencies
 - `gulpfile.js` Gulp build script
 - scripts/
    - `app.client.js` ReactJS application

##Running the app
1. Pull from GitHub: `git clone http://github.com/adityamedhe/RSS-Reader`
2. Install server side dependencies: `npm install`
3. Install client side dependencies: 
 - `cd static/`
 - `npm install`
4. Run Gulp to build React app: `gulp`
5. Ready to go! `node app.js`

