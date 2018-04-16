const path = require('path'),
  loaderUtils = require('loader-utils'),
  steed = require('steed'),
  xmljs = require('xml-js');

function resolveImageSrc(loaderContext, tile, callback) {

  var dirname = path.dirname(loaderContext.resourcePath),
      src = tile.attributes.src;

  // Resolve the image filename relative to the browserconfig file
  loaderContext.resolve(dirname, src, function(err, filename) {
    if (err) {
      return callback(err);
    }

    // Ensure Webpack knows that the image is a dependency of the browserconfig
    loaderContext.dependency && loaderContext.dependency(filename);

    // Asynchronously pass the image through the loader pipeline
    loaderContext.loadModule(filename, function(err, source, map, module) {
      if (err) {
        return callback(err);
      }

      // Update the image src property to match the generated filename
      // Is it always the first key in the assets object?
      tile.attributes.src = Object.keys(module.buildInfo.assets)[0]

      callback(null);
    });
  });
}

function findElements(xmlElement, expectedName) {
  return xmlElement.elements.filter(({ name }) => name === expectedName);
}

module.exports = function(source) {
  const callback = this.async();

  try {
    var browserconfig = xmljs.xml2js(source);

    var tiles = findElements(browserconfig, 'browserconfig')
    .map((element) => findElements(element, 'msapplication'))
    .reduce((acc, value) => [].concat(acc).concat(value), [])
    .map((element) => findElements(element, 'tile'))
    .reduce((acc, value) => [].concat(acc).concat(value), [])
    .map((element) => element.elements)
    .reduce((acc, value) => [].concat(acc).concat(value), [])
    .filter((element) => element.attributes && element.attributes.src);

    steed.map(tiles, resolveImageSrc.bind(null, this), (error) => {
      if (error) {
        return callback(error);
      }

      callback(null, xmljs.js2xml(browserconfig, {
        spaces: 2,
        indentAttributes: false,
      }));
    });

  } catch (err) {
    return callback(new Error('Invalid XML in Browserconfig'));
  }

};
