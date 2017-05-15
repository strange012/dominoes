let path = require('path');

module.exports = {
	 entry: './public/app.js',
	 output : {
		 filename : './webpack.js',
		 path : path.resolve(__dirname, 'public')
		},
   module: {
        loaders: [
				{ test: /\.vue$/, loader: "vue-loader" }
				]
			}
};