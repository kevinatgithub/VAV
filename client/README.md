# React Redux Template

## Getting started

1. git clone `https://github.com/netweaverdlw/react-redux-template.git`
2. run `npm install` or `yarn` from the root directory
3. run `npm start`
4. Open `localhost:3010` in your browser
5. For deployment to production, execute `npm run dist`

## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run dist](#npm-run-dist)
  - [npm run dist:test](#npm-run-disttest)
  - [npm run dist:analyze](#npm-run-distanalyze)
- [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)
- [Syntax Highlighting in the Editor](#syntax-highlighting-in-the-editor)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Displaying Lint Output in the Editor](#displaying-lint-output-in-the-editor)
- [Installing a Dependency](#installing-a-dependency)
- [Importing a Component](#importing-a-component)
- [Styles via styled components](#styles-via-styled-components)
- [Post-Processing CSS](#post-processing-css)
- [Adding Images](#adding-images)
- [Proxying API Requests in Development](#proxying-api-requests-in-development)
- [Running Tests](#running-tests)
  - [Filename Conventions](#filename-conventions)
  - [Test Scripts](#test-scripts)
  - [Writing Tests](#writing-tests)
  - [Testing Components](#testing-components)
  - [Coverage Reporting](#coverage-reporting)
- [Dependencies](#dependencies)
- [Webpack 3](#webpack-3)
  - [ES6 Modules](#es6-modules)
  - [Code Splitting with ES6](#code-splitting-with-es6)
  - [Tree shaking](#tree-shaking)
  - [Dynamic imports](#dynamic-imports)
- [Git Hooks](#git-hooks)
- [Environment Variables](#environment-variables)
- [Moment.js](#momentjs)

## Folder Structure
```
config/
  dev.js
  prod.js
  test.js
public/
  favicon.ico
  index.html
src/
  modules/
  store/
    configure-store
  index.js
  reducers.js
  root.js
webpack/
  env.js
  paths.js
  polyfills.js
  webpack.base.config.js
  webpack.dev.config.js
  webpack.prd.config.js
.editorconfig
.eslintignore
.gitignore
package.json
README.md
server.js
webpack.config.babel.js
yarn.lock
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. Only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

## Available Scripts

### `npm start`

Runs the app in the development mode using the `dev` config.<br>
Open [http://localhost:3010](http://localhost:3010) to view it in the browser.

The page will hot-reload (if possible) when you make changes.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the jest test runner to run all the tests defined in the src directory.


### `npm run dist`

Builds the app for production to the `dist` folder using the `prd` config.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

### `npm run dist:test`

Does exactly the same as `npm run dist` but uses the `test` config.<br>
### `npm run dist:analyze`

Uses the same config as `npm run dist` but after building a new browser tab will open at `127.0.0.1:8888`.<br>
This will help you:

- Realize what's really inside your bundle
- Find out what modules make up the most of it's size
- Find modules that got there by mistake
- Optimize it!

![](https://cloud.githubusercontent.com/assets/302213/20628702/93f72404-b338-11e6-92d4-9a365550a701.gif);

## Supported Language Features and Polyfills

This template supports a superset of the latest JavaScript standard by using the [babel-preset-latest](https://babeljs.io/docs/plugins/preset-latest/).
In addition to [ES2015](https://github.com/lukehoban/es6features) syntax features, it also supports:

* [ES2016 Exponentiation operator](https://babeljs.io/docs/plugins/transform-exponentiation-operator/)
* [ES2017 Trailing function commas](https://babeljs.io/docs/plugins/syntax-trailing-function-commas/)
* [ES2017 async/await](https://babeljs.io/docs/plugins/transform-async-to-generator/)
* [Object Rest/Spread Properties](https://github.com/sebmarkbage/ecmascript-rest-spread) (stage 3 proposal).
* [Class Fields and Static Properties](https://github.com/tc39/proposal-class-public-fields) (stage 2 proposal).
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html) syntax.

Learn more about [different proposal stages](https://github.com/tc39/proposals).

Note that **the template only includes a [polyfill](https://en.wikipedia.org/wiki/Polyfill)** for [`fetch()`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) via [`whatwg-fetch`](https://github.com/github/fetch).

To add support for other ES6+ features that need **runtime support** (such as `Array.from()` or `Object.assign()`), [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) is included by default. All features that need to be polyfilled are defined by the browser support which is defined in `.babelrc`. The current list is:
* "ie 11",
* "Edge >= 13",
* "Firefox >= 50",
* "Chrome >= 55",
* "Safari >= 10"

## Syntax Highlighting in the Editor

To configure syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions.

## ESLint

All rules are defined in [eslint-config-dlw](https://github.com/Stvenoo/eslint-config-dlw).
Submit an issue or pull request if you want to request changes. All rules can easily be overridden in the rules section located in `package.json > eslintConfig`, based on your preferences.

## Prettier

[Prettier](https://github.com/prettier/prettier) is an opinionated code formatter. It removes all original styling and ensures that all outputted code conforms to a consistent style. Since ESLint also specifies a series of code formating rules, [prettier-eslint](https://github.com/prettier/prettier-eslint) is used to disable all relevant ESLint rules. You can run pretty on your entire project using the `npm run pretty` task. <br>
If you want to automatically format your code on save in your editor, you can install the [visual code extension](https://github.com/prettier/prettier-vscode) and use the following options in your user settings: 
> "editor.formatOnSave": true, <br>
"prettier.eslintIntegration": true, <br>
"prettier.singleQuote": true, <br>
"prettier.trailingComma": "all", <br>

You can also install the [prettier-atom](https://github.com/prettier/prettier-atom) package and enable the options above in the settings menu.

## Displaying Lint Output in the Editor

You should see the linter output right in your terminal as well as the browser console. However, if you prefer the lint results to appear right in your editor, there are some extra steps you can do.

>**Atom**

You need to install the following packages in atom:

* [linter](https://atom.io/packages/linter)
* [linter-eslint](https://github.com/AtomLinter/linter-eslint)

If you want to lint your errors automatically, you can check the box `Fix errors on save` in the settings of the linter-eslint package. You should disable this option if you are already using prettier to format on save.

>**Visual Code**

You need to install the following packages in visual code:

* [vscode-eslint](https://github.com/Microsoft/vscode-eslint)


## Installing a Dependency

You can install other dependencies with npm or yarn

```
yarn add <library-name>
npm install --save <library-name>
```

## Importing a Component

This project setup supports ES6 modules thanks to Babel.
While you can still use require() and module.exports, I encourage you to use [import and export](http://exploringjs.com/es6/ch_modules.html) instead.

## Styles via styled components

[Styled-components](https://www.styled-components.com/docs) utilises tagged template literals to style your components.<br>
It removes the mapping between components and styles. This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it. Styled-components pass on all their props.

```javascript
// Create a Title component that'll render an <h1> tag with some styles based on props
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
render(
  <Wrapper>
    <Title primary>
      Hello World, this is my first styled component!
    </Title>
  </Wrapper>
);
```

Adding styles from **dependencies** are bundled into a separate bundle.

```javascript
import 'font-awesome/css/font-awesome.css';

const Button = (props) => {
  // works as excepted
  return <div className='fa fa-car' />;
}
```

In development, expressing dependencies this way allows your styles to be reloaded on the fly as you edit them.<br />
In production, all CSS files will be concatenated into a single minified .css file in the dist folder.

## Post-Processing CSS

All your CSS files are automatically vendor prefixed when working with styled-components so you don’t need to worry about it.

For example, this:

```css
.App {
  display: flex;
  flex-direction: row;
  align-items: center;
}
```
becomes this:
```css
.App {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}
```

## Adding Images

With Webpack, using static assets like images and fonts works similarly to CSS.

You can import an image right in a JavaScript module. This tells Webpack to include that image in the bundle. Unlike CSS imports, importing an image or a font gives you a string value. This value is the final image path you can reference in your code.

```javascript
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```

This ensures that when the project is built, Webpack will correctly move the images into the build folder, and provide us with correct paths.

This works in CSS too:
```css
.Logo {
  background-image: url(./logo.png);
}
```

## Proxying API Requests in Development

To tell the development server to proxy any unknown requests to your API server in development, you can provide a `proxyUrl` in the server.js file.
Standard only requests to **`/api` endpoints are proxied** but this can also be changed in the server.js file.

## Running Tests

This template uses [Jest](https://facebook.github.io/jest/) as its test runner. Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser.

While Jest provides browser globals such as `window` thanks to [jsdom](https://github.com/tmpvar/jsdom), they are only approximations of the real browser behavior. Jest is intended to be used for unit tests of your logic and your components rather than the DOM quirks.

### Filename Conventions

Jest will look for test files with any of the following popular naming conventions:

- Files with .js suffix in __tests__ folders.
- Files with .test.js suffix.
- Files with .spec.js suffix.
The .test.js / .spec.js files (or the __tests__ folders) can be located at any depth under the `src` top level folder.

It is recommended to put the test files (or __tests__ folders) next to the code they are testing so that relative imports appear shorter.

### Test Scripts

When you run `npm test`, Jest will do a single test run and output the result in the command line interface.
You can also run `npm test:watch`, Jest will launch in the watch mode. Every time you save a file, it will re-run the tests, just like `npm start` recompiles the code.

### Writing Tests

To create tests, add `it()` blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in expect() global function for making assertions. A basic test could look like this:

```javascript
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](http://facebook.github.io/jest/docs/expect.html).
You can also use [jest.fn() and expect(fn).toBeCalled()](http://facebook.github.io/jest/docs/expect.html#tohavebeencalled) to create “spies” or mock functions.

### Testing components

Via enzyme TODO

### Coverage Reporting

Jest has an integrated coverage reporter that works well with ES6
Run `npm test:cov` to include a coverage report like this:

![coverage report](http://i.imgur.com/m3U6gQM.png)

For now only coverage from actions, reducers and selectors is collected, as defined in `package.json > jest`

## Dependencies

- [React](https://facebook.github.io/react/): A JavaScript library for building user interfaces
- [React DOM](https://www.npmjs.com/package/react-dom): Entry point of the DOM-related rendering paths
- [React Router](https://github.com/ReactTraining/react-router): Declarative routing for React
- [Redux](http://redux.js.org/): A predictable state container for JavaScript apps
- [React Redux](https://github.com/reactjs/react-redux): Official React bindings for Redux
- [Redux Thunk](https://github.com/gaearon/redux-thunk): Thunk middleware for Redux
- [Redux Actions](https://github.com/acdlite/redux-actions): Flux Standard Action utilities for Redux
- [Reselect](https://github.com/reactjs/reselect): Selector library for Redux
- [Styled Components](https://www.styled-components.com/): Use the best bits of ES6 and CSS to style your apps without stress

## Webpack 3

### ES6 Modules

Webpack 2 brings native support ES6 Modules. This means webpack now understands import and export without them being transformed to CommonJS.

### Code Splitting with ES6

Code splitting is enabled by default for vendors libraries (node modules) and application code. Separate bundles can also be created for each route using [react-loadable](https://github.com/thejameskyle/react-loadable). See example in `app.js`. <br>
Creating a new build will result in a vendor bundle, a home chunck and a contact chunck. Chunks are loaded on demand based on the current route. This results in an overal smaller bundle and faster parsing of your JavaScript code. See [dynamic imports](#dynamic-imports) for more info.

### Tree shaking

The static nature of ES6 Modules allows some new kind of optimizations. For example in many cases it's possible to detect which exports are used and which aren't used. [tree-shaking](https://webpack.js.org/guides/tree-shaking/)

In cases in which webpack can say for sure that an export isn't used it omits the statement which exposes the export to other modules. Later the minimizer may flag the declaration as unused and omits it.

### Dynamic imports

Dynamic import expressions are a new feature and part of ECMAScript that allows users to asynchronously request a module at any arbitrary point in your program.

```javascript
  import('path/to/module') -> Promise
```

Calls to [import()](https://webpack.js.org/api/module-methods/#import-) are treated as split points, meaning the requested module and it's children are split out into a separate chunk.

## Git hooks

The [Husky](https://github.com/typicode/husky) library and [lint-staged](https://github.com/okonet/lint-staged) library are used to run a series of quality tools (eslint and tests) before each commit. If eslint finds any errors or the relevant tests fail, the commit will abort.
You can skip this behaviour (not recommend) by passing the `--no-verify` option. Only the staged files (.js) files are checked and not the entire project.

## Environment Variables

You can define environment variables in the `config` folder. When adding a new variable, be sure to add it to each environment.
Each environment variable should also be added to `package.json > eslintConfig > globals`. If you fail to do this, you will not be able to create a production or test build since ESLint will fail. Each variable is injected by Webpack and therefore available anywhere in your code.


## Momentjs

If you use a Moment.js, you might notice that only the English locale is available by default. This is because the locale files are large, and you probably only need a subset of all the locales provided by Moment.js.

To add a specific Moment.js locale to your bundle, you need to import it explicitly.
For example:

```javascript
import moment from 'moment';
import 'moment/locale/nl-be';
```

If import multiple locales this way, you can later switch between them by calling moment.locale() with the locale name:

```javascript
import moment from 'moment';
import 'moment/locale/nl-be';
import 'moment/locale/fr';

// ...

moment.locale('fr');
```

This will only work for locales that have been explicitly imported before. If you require dynamic loading of locales see this issue [here](https://github.com/webpack/webpack/issues/3128#issuecomment-306681896)

For more information, have a look at the [wiki](https://wiki.delawareconsulting.com/display/DMWIT/Optimize+moment.js)
