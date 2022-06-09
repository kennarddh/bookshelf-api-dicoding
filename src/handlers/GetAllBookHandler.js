const books = require('../books')

const GetAllBookHandler = request => {
	const { name, reading } = request.query

	let filteredBooks = books

	if (name) {
		filteredBooks = books.filter(
			book =>
				// eslint-disable-next-line implicit-arrow-linebreak, comma-dangle
				book.name.toLowerCase().includes(name.toLowerCase())
			// eslint-disable-next-line function-paren-newline
		)
	}

	if (reading) {
		filteredBooks = books.filter(book => book.reading === !!reading)
	}

	return {
		status: 'success',
		data: {
			books: filteredBooks.map(({ id, name: bookName, publisher }) => ({
				id,
				name: bookName,
				publisher,
			})),
		},
	}
}

module.exports = GetAllBookHandler
