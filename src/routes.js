const {
	AddBookHandler,
	GetAllBookHandler,
	GetBookDetailHandler,
	UpdateBookHandler,
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
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: UpdateBookHandler,
	},
]

module.exports = routes
