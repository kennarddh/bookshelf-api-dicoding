const { nanoid } = require('nanoid')

const books = require('../books')

const AddBookHandler = (request, hapi) => {
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

	if (!name) {
		return hapi
			.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. Mohon isi nama buku',
			})
			.code(400)
	}

	if (readPage > pageCount) {
		return hapi
			.response({
				status: 'fail',
				message:
					'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
			})
			.code(400)
	}

	const id = nanoid(16)

	const insertedAt = new Date().toISOString()
	const updatedAt = insertedAt

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished: pageCount === readPage,
		reading,
		insertedAt,
		updatedAt,
	}

	books.push(newBook)

	const isSuccess = books.filter(book => book.id === id).length > 0

	if (isSuccess) {
		const response = hapi.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		})

		response.code(201)

		return response
	}

	const response = hapi.response({
		status: 'error',
		message: 'Buku gagal ditambahkan',
	})

	response.code(500)

	return response
}

module.exports = AddBookHandler
