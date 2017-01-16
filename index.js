

module.exports = function(source) {
  this.cacheable();
  const packageJSON = require('./package.json');
  var manifest = JSON.parse(source);
  manifest.version = packageJSON.version;
  return JSON.stringify(manifest, null, '\t');
}
