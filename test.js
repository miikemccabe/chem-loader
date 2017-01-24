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

  it('Manifest name should match package.json', function () {
    const parsedManifest = loader.call(
      Object.assign({}, webpackContext, {
        query: '?useName=true'
      }), JSON.stringify(manifest)
    );
    const given = JSON.parse(parsedManifest).name;
    const expected = packageJSON.name;
    assert.equal(given, expected);
  });

  it('Manifest description should match package.json', function () {
    const parsedManifest = loader.call(
      Object.assign({}, webpackContext, {
        query: '?useDescription=true'
      }), JSON.stringify(manifest)
    );
    const given = JSON.parse(parsedManifest).description;
    const expected = packageJSON.description;
    assert.equal(given, expected);
  });

  it('Manifest author should match package.json', function () {
    const parsedManifest = loader.call(
      Object.assign({}, webpackContext, {
        query: '?useAuthor=true'
      }), JSON.stringify(manifest)
    );
    const given = JSON.parse(parsedManifest).author;
    const expected = packageJSON.author;
    assert.equal(given, expected);
  });

  it('Should still work if an unknown option is supplied', function () {
    const parsedManifest = loader.call(
      Object.assign({}, webpackContext, {
        query: '?useJibberish=true'
      }), JSON.stringify(manifest)
    );
    const given = JSON.parse(parsedManifest).version;
    const expected = packageJSON.version;
    assert.equal(given, expected);
  });
});
