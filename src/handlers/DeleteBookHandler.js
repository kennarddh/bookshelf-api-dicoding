const books = require('../books')

const DeleteBookHandler = (request, hapi) => {
	const { bookId } = request.params

	const index = books.findIndex(book => book.id === bookId)

	if (index === -1) {
		return hapi
			.response({
				status: 'fail',
				message: 'Buku gagal dihapus. Id tidak ditemukan',
			})

			.code(404)
	}

	books.splice(index, 1)

	return {
		status: 'success',
		message: 'Buku berhasil dihapus',
	}
}

module.exports = DeleteBookHandler
