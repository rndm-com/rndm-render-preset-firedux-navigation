const fs = require('fs');
const { range } = require('lodash');
const { buildFilesForFolder } = require('@rndm/utils');
const input = require('./files');

const current = process.cwd();

const init = (cmd = {}) => {
  const relativity = range(cmd.node ? 2 : 0).map(() => '..').join('/');
  const nodeModules = [current, relativity, 'node_modules'].join('/');
  const reduxCLI = [nodeModules, '@rndm/render-plugin-redux', 'cli'].join('/');
  const actions = require(reduxCLI);
  actions.init(cmd);

  const src = [current, relativity, 'src'].join('/');
  const base = [src, 'app', 'redux'].join('/');
  buildFilesForFolder(input, base);

  const reducersIndex = [base, 'reducers', 'index.js'].join('/');
  const middlewareIndex = [base, 'middleware', 'index.js'].join('/');

  const importStatement = 'import navigation from \'./navigation\';';
  const inclusionStatement = '  navigation,';

  const reducers = fs.readFileSync(reducersIndex).toString();

  if (!reducers.includes(importStatement)) {
    const output = reducers.split(`;

const reducers = `)
      .join(`;
${importStatement}

const reducers = `)
      .split(`,
};`)
      .join(`,
${inclusionStatement}
};`);
    fs.writeFileSync(reducersIndex, output)
  }

  const middleware = fs.readFileSync(middlewareIndex).toString();
  if (!middleware.includes(importStatement)) {
    const output = middleware.split(`;

const middleware = `)
      .join(`;
${importStatement}

const middleware = `)
      .split(`,
];`)
      .join(`,
${inclusionStatement}
];`);
    fs.writeFileSync(middlewareIndex, output)
  }

};

module.exports = init;
