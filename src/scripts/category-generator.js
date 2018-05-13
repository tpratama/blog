const _ = require('lodash');
const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));
const path = require('path');

exports.generate = async () => {
  await fs.readdirAsync('./content/')
    .map(async (file) => {
      const extFile = path.extname(file);

      if (extFile !== '.json') {
        return Bluebird.resolve();
      }

      const filePath = path.resolve('content', file);

      const configFile = require(filePath);
      const stats = await fs.statAsync(filePath);

      return _.reduce(configFile.categories, (acc, category) => {
        if (!acc[category]) {
          acc[category] = [];
        }

        const modifiedConfigFile = _.assign({}, configFile, {
          content: path.join('dist', configFile.content),
          timestamp: stats.ctime
        });

        acc[category] = _.concat(acc[category], modifiedConfigFile);

        return acc;
      }, {});
    })
    .then((results) => {
      return _.mergeWith({}, ...results, (dest, src) => {
        if (!dest) {
          return src;
        }

        if (_.isArray(src)) {
          return _.concat(dest, src);
        }
      });
    })
    .then((generatedFile) => fs.writeFileAsync('category.config.json', JSON.stringify(generatedFile, null, 2)));
};