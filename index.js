const fs = require('fs');
const path = require('path');
const utils = require('loader-utils');

module.exports = function(source) {
  this.cacheable();
  const packageJSONPath = path.resolve('./package.json');
  this.addDependency(packageJSONPath);
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
  var manifest = JSON.parse(source);
  manifest.version = packageJSON.version;

  const query = utils.parseQuery(this.query);

  if(query.useName) {
    manifest.name = packageJSON.name;
  }
  if(query.useDescription) {
    manifest.description = packageJSON.description;
  }
  if(query.useAuthor === true) {
    manifest.author = packageJSON.author;
  }
  return JSON.stringify(manifest, null, '\t');
}
