[![Build Status](https://img.shields.io/travis/jshmrtn/web-app-browserconfig-loader/master.svg?style=flat-square)](http://travis-ci.org/jshmrtn/web-app-browserconfig-loader) [![Coverage Status](https://img.shields.io/coveralls/jshmrtn/web-app-browserconfig-loader/master.svg?style=flat-square)](https://coveralls.io/r/jshmrtn/web-app-browserconfig-loader) [![npm](https://img.shields.io/npm/v/web-app-browserconfig-loader.svg?style=flat-square)](https://www.npmjs.com/package/web-app-browserconfig-loader)

# web-app-browserconfig-loader

Load images referenced in the `tile` field in your [Browser configuration](https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx) using [webpack](https://github.com/webpack/webpack).

```bash
$ npm install --save web-app-browserconfig-loader
```

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

In your webpack config:

```js
module: {
  loaders: [
    {
      test: /browserconfig.xml$/,
      loader: 'file?name=browserconfig.xml!web-app-browserconfig'
    }
  ]
}
```

Note that this example also uses [file-loader](https://github.com/webpack/file-loader).

Then, require the browserconfig in your application code:

```js
require('./browserconfig.xml');
```

This allows you to provide image paths in the standard webpack format inside your browserconfig:

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="./images/favicon/ms-icon-70x70.png"/>
      <square150x150logo src="./images/favicon/ms-icon-150x150.png"/>
      <square310x310logo src="./images/favicon/ms-icon-310x310.png"/>
      <TileColor>#ffffff</TileColor>
    </tile>
  </msapplication>
</browserconfig>

```

## License

> The MIT License (MIT)
>
> Copyright (c) 2017 JOSHMARTIN GmbH, Jonatan Männchen
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
