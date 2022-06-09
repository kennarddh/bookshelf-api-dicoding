const books = require('../books')

const GetAllBookHandler = () => ({
	status: 'success',
	data: {
		books: books.map(({ id, name, publisher }) => ({
			id,
			name,
			publisher,
		})),
	},
})

module.exports = GetAllBookHandler
