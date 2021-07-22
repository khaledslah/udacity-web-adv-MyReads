import React from "react"
import Book from './Book.js'
import * as BooksAPI from '../BooksAPI.js'

class ListBooks extends React.Component {
    handleShelfChange(book,shelf){
        this.props.onShelfChange(book,shelf)
    }
    render(){
        return(
            <div className="search-books-results">
              <ol className="books-grid">{this.props.books.map((bookItem)=>(
                    <Book 
                    key={bookItem.id}
                    book={bookItem}
                    bookChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}}
                    />))}</ol>
            </div>
        )

    }
}
export default ListBooks;