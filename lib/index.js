const fs = require('fs');
const path = require('path');
const utils = require('loader-utils');

const packageJSONPath = path.resolve('./package.json');

module.exports = function(source) {
  this.cacheable();
  this.addDependency(packageJSONPath);

  const manifest = JSON.parse(source);
  const query = utils.parseQuery(this.query);

  const callback = this.async();
  if(!callback) return processManifestSync(manifest, query);
  processManifestAsync(manifest, query, function(err, result) {
    if(err) return callback(err);
    callback(null, result)
  });
}

function processManifestSync(manifest, query) {
  const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf8'));
  const alteredManifest = assignValues(manifest, packageJSON, query);
  return JSON.stringify(alteredManifest, null, '\t');
}

function processManifestAsync(manifest, query, callback) {
  fs.readFile(packageJSONPath, 'utf8', (err, data) => {
    if(err) {
      callback(`Error reading file: ${packageJSONPath}`);
    } else {
      const packageJSON = JSON.parse(data);
      const alteredManifest = assignValues(manifest, packageJSON, query);
      callback(null, JSON.stringify(alteredManifest, null, '\t'));
    }
  });
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
