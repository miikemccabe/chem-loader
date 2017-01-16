const fs = require('fs');
const path = require('path');

module.exports = function(source) {
  this.cacheable();
  const packageJSONPath = path.resolve('./package.json');
  this.addDependency(packageJSONPath);
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
  var manifest = JSON.parse(source);
  manifest.version = packageJSON.version;
  return JSON.stringify(manifest, null, '\t');
}
