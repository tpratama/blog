const Bluebird = require('bluebird');
const categoryGenerator = require('./category-generator');
const contentGenerator = require('./content-generator');
const timestampGenerator = require('./timestamp-generator');

Bluebird.all([
  categoryGenerator.generate(),
  contentGenerator.generate(),
  timestampGenerator.generate()
]);
