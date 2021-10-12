
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OUT_PATH = 'build';

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: "./src/index.tsx",
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, './', OUT_PATH),
    // 出力ファイル名
    filename: "index.js"
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            },
          },
          {
            loader: 'ts-loader',
          },
        ]
      },
      {
        test: /\.s?css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf|mp3|wav|mp4|json)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './static',
              publicPath: './static',
              name: '[name].[ext]?[contenthash]',
            },
          },
        ],
      },
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  // // ES5(IE11等)向けの指定（webpack 5以上で必要）
  // target: ["web", "es5"],
  // プラグイン
  plugins: [
    new CopyWebpackPlugin([
      {
        context: 'public',
        from: 'assets',
        to: path.resolve(__dirname, OUT_PATH, 'assets'),
      },
      {
        context: 'public',
        from: 'index.html',
        to: path.resolve(__dirname, OUT_PATH),
      },
      {
        context: 'public',
        from: 'robots.txt',
        to: path.resolve(__dirname, OUT_PATH),
      },
      {
        context: 'public',
        from: '.htaccess',
        to: path.resolve(__dirname, OUT_PATH),
      },
    ]),
    // new MiniCssExtractPlugin({
    //   filename: 'style.css',
    // })
  ],
  // webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '',
    watchContentBase: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
    overlay: true,
    // useLocalIp: true,
  },
};