const {
	AddBookHandler,
	GetAllBookHandler,
	GetBookDetailHandler,
	UpdateBookHandler,
	DeleteBookHandler,
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
	{
		method: 'DELETE',
		path: '/books/{bookId}',
		handler: DeleteBookHandler,
	},
]

module.exports = routes
