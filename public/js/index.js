'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListBooks = function (_React$Component) {
	_inherits(ListBooks, _React$Component);

	function ListBooks(props) {
		_classCallCheck(this, ListBooks);

		var _this = _possibleConstructorReturn(this, (ListBooks.__proto__ || Object.getPrototypeOf(ListBooks)).call(this, props));

		_this.handleSubmit = _this.handleSubmit.bind(_this);
		_this.state = {
			books: []
		};
		_this.removeBooks = _this.removeBooks.bind(_this);
		_this.getrandombook = _this.getrandombook.bind(_this);
		return _this;
	}

	_createClass(ListBooks, [{
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault();
			if (e.target.elements.newBookTitle.value !== '') {
				var author = e.target.elements.newBookAuthor.value !== '' ? e.target.elements.newBookAuthor.value : 'Anon';
				var newBook = new Book(e.target.elements.newBookTitle.value, author);
				var booksString = this.state.books.map(function (book) {
					return JSON.stringify(book);
				});
				if (!booksString.includes(JSON.stringify(newBook))) {
					this.setState({ books: [].concat(_toConsumableArray(this.state.books), [newBook]) });
					ReactDOM.render(React.createElement(ListBooks, null), document.querySelector('.appReact'));
				}
				e.target.reset();
			}
		}
	}, {
		key: 'removeBooks',
		value: function removeBooks(e) {
			this.state.books = [];
			ReactDOM.render(React.createElement(ListBooks, null), document.querySelector('.appReact'));
		}
	}, {
		key: 'getrandombook',
		value: function getrandombook(e) {
			var random = Math.floor(Math.random() * (this.state.books.length - 0) + 0);
			alert(this.state.books[random].getDescription());
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					this.props.title
				),
				React.createElement(
					'h2',
					null,
					'List of books available right now'
				),
				React.createElement(
					'p',
					null,
					this.state.books.length,
					' Books'
				),
				React.createElement(
					'ul',
					null,
					this.state.books.map(function (book, i) {
						return React.createElement(
							'li',
							{ key: 'bookTitle ' + i },
							book.title,
							' | ',
							book.author
						);
					})
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleSubmit },
					React.createElement(
						'label',
						null,
						'Enter name of the new book'
					),
					React.createElement('input', { type: 'text', name: 'newBookTitle', id: 'newBookTitle' }),
					React.createElement(
						'label',
						null,
						'Enter author of the new book'
					),
					React.createElement('input', { type: 'text', name: 'newBookAuthor', id: 'newBookAuthor' }),
					React.createElement(
						'button',
						{ className: 'addBook' },
						'Add book'
					)
				),
				React.createElement(
					'p',
					null,
					this.state.count
				),
				React.createElement(
					'button',
					{ className: 'addBook', onClick: this.removeBooks },
					'Remove all books'
				),
				React.createElement(
					'button',
					{ className: 'addBook', onClick: this.getrandombook },
					'Get recomendation'
				)
			);
		}
	}]);

	return ListBooks;
}(React.Component);

var Book = function () {
	function Book(title, author) {
		_classCallCheck(this, Book);

		this.title = title;
		this.author = author;
	}

	_createClass(Book, [{
		key: 'getDescription',
		value: function getDescription() {
			return 'Title: ' + this.title + '\nAuthor: ' + this.author;
		}
	}]);

	return Book;
}();

ListBooks.defaultProps = {
	title: 'Consejero'
};

ReactDOM.render(React.createElement(ListBooks, { title: "Consejero Libros" }), document.querySelector('.appReact'));
