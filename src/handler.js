const { nanoid } = require('nanoid')

const books = require('./books')

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

module.exports = {
	AddBookHandler,
	GetAllBookHandler,
	GetBookDetailHandler,
	UpdateBookHandler,
	DeleteBookHandler,
}
