const assert = require('assert');
const loader = require('./../lib/index.js');
const packageJSON = require('./../package.json');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const entryFilePath = path.join(__dirname, 'src/entry.js');
const entryFilePathError = path.join(__dirname, 'src/entry.error.js');
const outputDirPath = path.join(__dirname, 'build');
const outputFileName = 'output.js';
const outputFilePath = path.join(outputDirPath, outputFileName);

const webpackBaseConfig = {
  entry: entryFilePath,
  output: {
    path: outputDirPath,
    filename: outputFileName
  },
  module: {
    rules: [{
      test: /\.json$/,
      use: [
        'file-loader?name=[name].json',
        '__this-loader'
      ]
    }]
  }
};

describe('chrome-manifest-loader', function () {

  beforeEach('Clear contents of manifest.json', function(done) {
    fs.writeFile(path.join(outputDirPath, 'manifest.json'), '', done);
  });

  it('Manifest version should match package.json', function (done) {
    const config = webpackBaseConfig;
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), false);
        fs.readFile(path.join(outputDirPath, 'manifest.json'), 'utf8', (err, data) => {
          assert.equal(err, null);
          const given = JSON.parse(data).version;
          const expected = packageJSON.version;
          assert.equal(given, expected);
          done();
        })
    });
  });

  it('Manifest name should match package.json', function (done) {
    const config = Object.assign({}, webpackBaseConfig, {
      module: {
        rules: [{
          test: /\.json$/,
          use: [{
            loader: 'file-loader?name=[name].json'
          }, {
             loader: '__this-loader',
             options: { useName : true }
          }]
        }]
      }
    });
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), false);
        fs.readFile(path.join(outputDirPath, 'manifest.json'), 'utf8', (err, data) => {
          assert.equal(err, null);
          const given = JSON.parse(data).name;
          const expected = packageJSON.name;
          assert.equal(given, expected);
          done();
        })
    });
  });

  it('Manifest description should match package.json', function (done) {
    const config = Object.assign({}, webpackBaseConfig, {
      module: {
        rules: [{
          test: /\.json$/,
          use: [{
            loader: 'file-loader?name=[name].json'
          }, {
             loader: '__this-loader',
             options: { useDescription : true }
          }]
        }]
      }
    });
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), false);
        fs.readFile(path.join(outputDirPath, 'manifest.json'), 'utf8', (err, data) => {
          assert.equal(err, null);
          const given = JSON.parse(data).description;
          const expected = packageJSON.description;
          assert.equal(given, expected);
          done();
        })
    });
  });

  it('Manifest author should match package.json', function (done) {
    const config = Object.assign({}, webpackBaseConfig, {
      module: {
        rules: [{
          test: /\.json$/,
          use: [{
            loader: 'file-loader?name=[name].json'
          }, {
             loader: '__this-loader',
             options: { useAuthor : true }
          }]
        }]
      }
    });
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), false);
        fs.readFile(path.join(outputDirPath, 'manifest.json'), 'utf8', (err, data) => {
          assert.equal(err, null);
          const given = JSON.parse(data).author;
          const expected = packageJSON.author;
          assert.equal(given, expected);
          done();
        })
    });
  });

  it('Should still work if an unknown option is supplied', function (done) {
    const config = Object.assign({}, webpackBaseConfig, {
      module: {
        rules: [{
          test: /\.json$/,
          use: [{
            loader: 'file-loader?name=[name].json'
          }, {
             loader: '__this-loader',
             options: { useJibberish : true }
          }]
        }]
      }
    });
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), false);
        fs.readFile(path.join(outputDirPath, 'manifest.json'), 'utf8', (err, data) => {
          assert.equal(err, null);
          const given = JSON.parse(data).version;
          const expected = packageJSON.version;
          assert.equal(given, expected);
          done();
        })
    });
  });

  it('Should error if file can\'t be found', function (done) {
    const config = Object.assign({}, webpackBaseConfig, {
      entry: entryFilePathError,
      module: {
        rules: [{
          test: /\.json$/,
          use: [{
            loader: 'file-loader?name=[name].json'
          }, {
             loader: '__this-loader'
          }]
        }]
      }
    });
    webpack(config, function(err, stats) {
        assert.equal(err, null);
        assert.equal(stats.hasErrors(), true);
        done();
    });
  });
});
