<a href="https://david-dm.org/icd2k3/react-redux-slideshow-example"><img src="https://david-dm.org/icd2k3/react-redux-slideshow-example.svg" alt="Dependency Status"></a>
<a href="https://david-dm.org/icd2k3/react-redux-slideshow-example/?type=dev">![David](https://david-dm.org/icd2k3/react-redux-slideshow-example/dev-status.svg)</a>
 ![Travis](https://travis-ci.org/icd2k3/react-redux-slideshow-example.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/icd2k3/react-redux-slideshow-example/badge.svg?branch=master)](https://coveralls.io/github/icd2k3/react-redux-slideshow-example?branch=master)

# React + Redux Slideshow Example Project
Slideshow example app built with [React](https://facebook.github.io/react), Redux, Webpack, Babel, & Karma.

### Demo
[slideshow.justin-schrader.com](http://slideshow.justin-schrader.com)
<a href="http://slideshow.justin-schrader.com">
![Screenshot](https://raw.githubusercontent.com/icd2k3/react-redux-slideshow-example/master/readme-images/screenshot.jpg)
</a>

This is obviously <strong>waaay</strong> over-engineered for a simple slideshow that could have been built in vanilla js. But this stack/setup represents how I would (currently) approach building a large-scale application.

### Key Pain Points To Solve
- [x] If a bug surfaces in the platform it should <strong>not</strong> be difficult to find the origin.
- [x] It should be entirely modular in that each piece of functionality (component) should be able to work independently of the rest of the app.
- [x] The platform should be easy to modify or add to.
- [x] It should be able to be entirely covered with unit tests.

# Install & Run Locally
1. [Node](https://nodejs.org/en) & [NPM](https://www.npmjs.com) should be installed globally
1. Clone this repo
1. `npm i` - install all project dependencies
1. `npm run dev` - run local dev server with hot module reloading

> Hot module reloading is enabled. Example video: https://cl.ly/3C3H201q2L31 - normally in this flow we'd have to reload the page, navigate back to the final image, and view it 4 times in order to test this change. With hot module reloading the component is updated instantly in the current app state.

## Run Unit Tests & Code Coverage Reports
- `npm run test` This script runs all karma unit tests (any `*.spec.js` file in `/src`) then generates a code coverage report.

Code coverage report is provided via Istanbul and highlights which parts of the app are not covered:
![Coverage](https://raw.githubusercontent.com/icd2k3/react-redux-slideshow-example/master/readme-images/coverage.jpg)

## Create Production Builds
- `npm run dist` This script compiles, compresses, and copies all assets to be deployed to a `/dist` directory.

## Pros & Cons
### Pro: Predictable
1. Components receive props and dispatch actions (when the user interacts with them)
2. Reducers handle these dispatched actions and modify application state at the root level
3. Application state is propagated back down the React component tree and UI is updated
4. ????
5. Profit

In this flow components are de-coupled from the state, they do not worry about anything that's going on around them; they just know they're supposed to receive certain properties and render. Also, since the entire state exists at the root level of the application, any component can easily be granted access to any part of the state <strong>and</strong> we can track every user interaction with the app and how it modifies state:

![Logger](https://raw.githubusercontent.com/icd2k3/react-redux-slideshow-example/master/readme-images/redux-logger.gif)

### Pro: Scalable
With this approach it is easy to add & modify functionality anywhere in the app without worrying about how it might affect other parts of the application. Each component folder in this app could be used anywhere.

### Pro: Testable
Components, actions, and reducers (state) can be individually unit tested as they are functional code islands.

### Con: Lots of Dependencies
I use `npm shrinkwrap --dev` to avoid versioning issues, but this is still my #1 complaint about this approach as it creates a large dist bundle. Lately I've been exploring [Riot](riotjs.com) as a substitute which certainly cuts the bloat down quite a bit, but [React](https://facebook.github.io/react) just has a much larger community of devs behind it. At the end of the day, I think the benefits this application structure provides is worth it.

### Con: Learning Curve
For developers that haven't used [React](https://facebook.github.io/react) or [Redux](https://github.com/reactjs/redux) before there would certainly be a bit of ramp-up time. However, as long as the documentation is good it should be fairly stright-forward.

## Main Tools Used
This project has quite a few dependencies, but the list below represents the key tools, and why I decided to include them.

- [Babel](https://babeljs.io/)
  - To be able to use es6 when developing locally. Super handy for a number of reasons.
- [Enzyme](https://github.com/airbnb/enzyme)
  - [React](https://facebook.github.io/react)'s default testing tools are somewhat limited. Enzyme provides a nice jQuery-like api for interacting with [React](https://facebook.github.io/react) components when writing unit tests.
- [Eslint](http://eslint.org)
  - My favorite tool for linting javascript. Not only does it report errors, but it is very extendable so you can add custom (personal preference) rules to ensure all developers on a project will produce similar looking code.
- [Karma](https://karma-runner.github.io/1.0/index.html)/[Mocha](https://mochajs.org)/[Chai](http://chaijs.com)
  - Easy to use, configurable test runner that also produces some handy code coverage reports (see Unit Tests section above ^)
- [PostCSS](https://github.com/postcss/postcss)
  - SASS/LESS include a bunch of functionality out-of-the-box, but [PostCSS](https://github.com/postcss/postcss) is a customizable, extendable css processing tool. Here's a great breakdown of [why this is useful](https://ashleynolan.co.uk/blog/postcss-a-review).
- [React](https://facebook.github.io/react)
  - Do I think [React](https://facebook.github.io/react) is the end-all be-all of FE libs? No. But I do think it has the right opinion when thinking about an app as a series of smaller components. I've been digging [Riot](riotjs.com) a lot recently, but [React](https://facebook.github.io/react) has a much larger community behind it.
- [Redux](https://github.com/reactjs/redux)
  - Great way of managing application state as 1 huge data object at the root level. Makes the app more predictable, and it's very easy to track every single user interaction (what they did, previous state, and next state after their action). Very handy for debugging.
- [Webpack](https://webpack.github.io)
  - I've been using webpack as a build tool for pretty much every project now. I used to use grunt/gulp, but webpack requires a lot less custom code to work (more of a config file really).

> Note: usually for large data applications I would also include [Immutable](https://facebook.github.io/immutable-js) which provides an extra layer of predictability and security to application state. It would be very easy to modify reducers to use [Immutable](https://facebook.github.io/immutable-js) for this example. I just left it out because there is not much data in this example app.

## Get at Me!
Please email me at me@justin-schrader.com or submit an issue if you have any questions or issues with this repo.
