const path = require('path')
module.exports = {
	configureWebpack: {
		resolve: {
			extensions: ['.ts', '.js', '.vue', '.json'],
			alias: {
				'@': path.join(__dirname, 'src'),
				'@v': path.join(__dirname, 'src/views'),
				'@c': path.join(__dirname, 'src/components')
			}
		}
	}
}
