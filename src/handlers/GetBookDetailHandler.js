const books = require('../books')

const GetBookDetailHandler = (request, hapi) => {
	const { bookId } = request.params

	const book = books.find(bookElement => bookElement.id === bookId)

	if (!book) {
		return hapi
			.response({
				status: 'fail',
				message: 'Buku tidak ditemukan',
			})
			.code(404)
	}

	return {
		status: 'success',
		data: {
			book,
		},
	}
}

module.exports = GetBookDetailHandler
