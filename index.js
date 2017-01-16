const fs = require('fs');

module.exports = function(source) {
  this.cacheable();
  const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  var manifest = JSON.parse(source);
  manifest.version = packageJSON.version;
  return JSON.stringify(manifest, null, '\t');
}
