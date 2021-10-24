const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const BASE_PATH = "./src/client";

module.exports = {
    entry:{
        main:`${BASE_PATH}/js/index.ts`,
    },
    output: {
        filename:"js/[name].js",
        path:path.resolve(__dirname,"dist/client"),
        clean:true,
    },
    resolve: {
        extensions:[".ts",".js",".scss",".css"]
    },
    plugins: [new miniCssExtractPlugin({filename:"css/style.css"})],
    module:{
        rules:[
            {
                test:/\.ts$/i,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test:/\.scss$/i,
                use:[
                    miniCssExtractPlugin.loader,"css-loader","sass-loader"
                ]
            }
        ],
    },
};