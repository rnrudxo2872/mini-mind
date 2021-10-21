const path = require('path');

const BASE_PATH = "./src/client/js/";

module.exports = {
    entry:{
        main:`${BASE_PATH}/main.ts`,
    },
    output: {
        filename:"js/[name].js",
        path:path.resolve(__dirname,"dist/client"),
        clean:true,
    },
    resolve: {
        extensions:[".ts",".js"]
    },
    module:{
        rules:[
            {
                test:/\.ts$/i,
                loader: "ts-loader",
                exclude: /node_modules/
            }
        ],
    },
};