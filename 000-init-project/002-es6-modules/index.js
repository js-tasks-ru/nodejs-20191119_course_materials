
// node --experimental-modules
// --es-module-specifier-resolution=node

// only default export from commonJS module
import commonjsModule from './common-js/common-module.js'

commonjsModule();

import es6ModuleInCommonJS from './common-js/es6-module.mjs';

es6ModuleInCommonJS();

import {myFunction as es6Module} from "./es6-module/es6-module.js";

es6Module();

import commonJSInES6Module from './es6-module/common-module.cjs';

commonJSInES6Module();
