const path = require('path'),
  loaderUtils = require('loader-utils'),
  steed = require('steed'),
  libxmljs = require('libxmljs');

function resolveImageSrc(loaderContext, tile, callback) {
  if(!tile.attr('src')) {
    return callback(null);
  }

  var dirname = path.dirname(loaderContext.resourcePath),
    src = tile.attr('src').value();

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
      tile.attr('src').value(Object.keys(module.assets)[0]);

      callback(null);
    });
  });
}

module.exports = function(source) {
  const callback = this.async();

  try {
    var browserconfig = libxmljs.parseXml(source);
  } catch (err) {
    return callback(new Error('Invalid XML in Browserconfig'));
  }

  const tiles = browserconfig.find('//browserconfig/msapplication/tile/*');

  steed.map(tiles, resolveImageSrc.bind(null, this), (error) => {
    if (error) {
      return callback(error);
    }

    callback(null, browserconfig.toString());
  });
};
