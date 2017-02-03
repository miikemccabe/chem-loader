const fs = require('fs');
const path = require('path');
const utils = require('loader-utils');

const packageJSONPath = path.resolve('./package.json');

module.exports = function(source) {
  this.cacheable && this.cacheable();
  this.addDependency(packageJSONPath);

  const manifest = JSON.parse(source);
  const query = utils.parseQuery(this.query);

  return processManifest(manifest, query);
}

function processManifest(manifest, query) {
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
  const alteredManifest = assignValues(manifest, packageJSON, query);
  return JSON.stringify(alteredManifest, null, '\t');
}

function assignValues(manifest, packageJSON, query) {
  manifest.version = packageJSON.version;
  if(query.useName) {
    manifest.name = packageJSON.name;
  }
  if(query.useDescription) {
    manifest.description = packageJSON.description;
  }
  if(query.useAuthor === true) {
    manifest.author = packageJSON.author;
  }
  return manifest;
}
