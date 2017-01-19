# ceml (Chrome Extension Manifest Loader)

ceml is a webpack loader for developing Chrome Extensions.
It takes your manifest file and sets the version to the
same as your project's package.json. This means you don't 
need to keep them both in sync. 

The loader also gives you the option of using the name,
description and author from your project's package.json.

This loader does not write the output to file. You're 
expected to pass the results of this loader to a file-
writing loader such as [file-loader](https://www.npmjs.com/package/file-loader)

## How to use

### Install

```
npm install ceml --save-dev
```

### When requiring files
```js
require('file?name=[name].json!chrome-manifest-loader?useDescription=true&useAuthor=true!./src/manifest.json');
```

## Options

If the loader is used without any options, only the version
of your manifest file is altered. Pass the following options
to the loader if you want to use your project's package.json's
name, author or desciption in the manifest.

 - `useDescription=true`
 - `useAuthor=true`
 - `useName=true`
