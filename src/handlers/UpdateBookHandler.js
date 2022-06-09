const books = require('../books')

const UpdateBookHandler = (request, hapi) => {
	const { bookId } = request.params

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload

	const index = books.findIndex(book => book.id === bookId)

	if (!name) {
		return hapi
			.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Mohon isi nama buku',
			})
			.code(400)
	}

	if (readPage > pageCount) {
		return hapi
			.response({
				status: 'fail',
				message:
					'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
			})
			.code(400)
	}

	if (index === -1) {
		return hapi
			.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Id tidak ditemukan',
			})
			.code(404)
	}

	const updatedAt = new Date().toISOString()

	const newBook = {
		...books[index],
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished: pageCount === readPage,
		reading,
		updatedAt,
	}

	books[index] = newBook

	return {
		status: 'success',
		message: 'Buku berhasil diperbarui',
	}
}

module.exports = UpdateBookHandler
