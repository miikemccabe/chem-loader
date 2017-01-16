const assert = require('assert');
const loader = require('./index.js');
const manifest = require('./manifest.json');
const packageJSON = require('./package.json');


const webpackContext = {
  cacheable: function(){},
  exec: function(){},
  addDependency: function(){}
};

const manifestLoader = loader.bind(webpackContext);

describe('chrome-manifest-loader', function () {
  it('Manifest version should match package.json', function () {
    const parsedManifest = manifestLoader(JSON.stringify(manifest));
    const given = JSON.parse(parsedManifest).version;
    const expected = packageJSON.version;
    assert.equal(given, expected);
  });
});
