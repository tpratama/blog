const CommonMark = require('commonmark');
const ReactRenderer = require('commonmark-react-renderer');

const parser = new CommonMark.Parser();
const renderer = new ReactRenderer();


exports.render = (stringMarkdown) => {
  const buffer = parser.parse(stringMarkdown);

  return renderer.render(buffer);
};