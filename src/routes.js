const {
	AddBookHandler,
	GetAllBookHandler,
	GetBookDetailHandler,
} = require('./handler')

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
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: GetBookDetailHandler,
	},
]

module.exports = routes
