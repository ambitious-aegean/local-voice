// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}],['@babel/preset-react',{targets: {node: 'current'}}]],
  env: {
    test: {
      plugins: ["@babel/plugin-transform-modules-commonjs"]
    }
  }
};