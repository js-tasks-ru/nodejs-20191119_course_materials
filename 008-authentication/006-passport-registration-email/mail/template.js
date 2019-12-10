const config = require('config');
const fs = require('fs');
const pug = require('pug');

const TEMPLATES_ROOT = config.get('mail.templates');

module.exports = Object.fromEntries(
  fs.readdirSync(TEMPLATES_ROOT)
    .filter(fileName => fileName.endsWith('.pug'))
    .map(fileName => {
      const [templateName] = fileName.split('.');
      const template = pug.compileFile(`${TEMPLATES_ROOT}/${fileName}`);
      return [templateName, template]
    }));

// module.exports = {
//   <filename> : <fn>
//   'welcome': templateFn()
// }
