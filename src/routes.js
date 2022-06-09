const { AddBookHandler, GetAllBookHandler } = require('./handler')

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: AddBookHandler,
	},
	{
		method: 'GET',
		path: '/books',
		handler: GetAllBookHandler,
	},
]

module.exports = routes
