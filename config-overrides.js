const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require('path')
module.exports = override(
    // 针对antd实现按需打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { "@primary-color": "#108ee9" },
    }),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    })
);