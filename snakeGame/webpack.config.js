// 引入一个包
const path = require("path");
// 引入html插件(生成对应的html文件)
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// webpack 中的所有配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  //指定打包文件所在目录
  output: {
    //指定打包后的目录
    path: path.resolve(__dirname, "dist"),
    // 打包后文件的文件
    filename: "bundle.js",
    environment: {
      // 告诉webpack不使用箭头函数
      arrowFunction: false,
      const: false,
    },
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // 使用ts-loader去处理符合 /\.ts$/ 规则的文件
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader.（顺序从后往前执行）
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    targets: {
                      // 要兼容的目标浏览器
                      chrome: "88",
                      ie: "11",
                    },
                    // 下面两个参数意义：比如Promise，在ie里没有该方法，会从corejs引入自己版本实现的Promise功能。
                    // 指定corejs的版本
                    corejs: "3",
                    // 使用corejs的方式 "usage"表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },
      // 设置less文件的设置
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 version",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  // 配置webpack插件
  plugins: [
    new HTMLWebpackPlugin({
      // title: '这是一个自定义的title',
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  // 设置引用模块
  resolve: {
    // 凡是以ts、js的文件都可以用于模块(可以使用import、export)
    extensions: [".ts", ".js"],
  },
  mode: "production", // 设置mode
};
