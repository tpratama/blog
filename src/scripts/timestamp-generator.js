const _ = require('lodash');
const moment = require('moment');
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

      const modifiedConfigFile = _.assign({}, configFile, {
        content: path.join('dist', configFile.content),
        timestamp: stats.ctime
      });

      return modifiedConfigFile;
    })
    .then(_.compact)
    .then((results) => {
      return _.chain(results)
        .map((config) => _.assign({}, config, { timestamp: moment(config.timestamp).format('YYYY-MM-DD') }))
        .groupBy('timestamp')
        .value();
    })
    .then((generatedFile) => fs.writeFileAsync('timestamp.config.json', JSON.stringify(generatedFile, null, 2)));
};