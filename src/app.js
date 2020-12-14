class ListBooks extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
			books:[]
		}
		this.removeBooks = this.removeBooks.bind(this)
		this.getrandombook = this.getrandombook.bind(this)
	}

	handleSubmit(e){
		e.preventDefault()
		if(e.target.elements.newBookTitle.value !== ''){
			const author = (e.target.elements.newBookAuthor.value !== '' ? e.target.elements.newBookAuthor.value: 'Anon')
			const newBook = new Book(e.target.elements.newBookTitle.value,author)
			const booksString = this.state.books.map(book => JSON.stringify(book))
			if(!booksString.includes(JSON.stringify(newBook))){
				this.setState({books: [...this.state.books, newBook]})
				ReactDOM.render(<ListBooks />,document.querySelector('.appReact'))
			}
			e.target.reset()
		}
	}

	removeBooks(e){
		this.state.books = []
		ReactDOM.render(<ListBooks />,document.querySelector('.appReact'))
	}

	getrandombook(e){
		const random = Math.floor(Math.random() * (this.state.books.length - 0) + 0)
		alert(this.state.books[random].getDescription())
	}

	render(){
		return <div>
			<h1>{this.props.title}</h1>
			<h2>List of books available right now</h2>
			<p>{this.state.books.length} Books</p>
			<ul>
				{this.state.books.map((book,i) => {
					return <li key={`bookTitle ${i}`}>{book.title} | {book.author}</li>
				})}
			</ul>
			<form onSubmit={this.handleSubmit}>
				<label>Enter name of the new book</label>
				<input type="text" name="newBookTitle" id="newBookTitle"></input>
				<label>Enter author of the new book</label>
				<input type="text" name="newBookAuthor" id="newBookAuthor"></input>
				<button className="addBook">Add book</button>
			</form>
			<p>{this.state.count}</p>
			<button className="addBook" onClick={this.removeBooks}>Remove all books</button>
			<button className="addBook" onClick={this.getrandombook}>Get recomendation</button>
		</div>
	}
}

class Book{
	constructor(title,author){
		this.title = title
		this.author = author
	}
	getDescription(){
		return `Title: ${this.title}\nAuthor: ${this.author}`
	}
}

ListBooks.defaultProps = {
	title: 'Consejero'
}

ReactDOM.render(<ListBooks title={"Consejero Libros"}/>,document.querySelector('.appReact'))