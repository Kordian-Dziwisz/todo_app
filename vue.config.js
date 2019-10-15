const path = require('path')
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src'),
				'@v': path.join(__dirname, 'src/views'),
				'@c': path.join(__dirname, 'src/components')
			}
		}
	}
}
