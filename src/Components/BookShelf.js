import React from "react"
import Book from './Book.js'
import PropTypes from 'prop-types'; 

class BookShelf extends React.Component {
    handleShelfChange(book,shelf){
        this.props.onShelfChange(book,shelf)
    }
    render(){
    return(
        (this.props.shelfName == "searchList")?(
            <div className="search-books-results">
              <ol className="books-grid">{this.props.books.map((bookItem)=>(
                    <Book 
                    key={bookItem.id}
                    book={bookItem}
                    bookChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}}
                    />))
                    }</ol>
            </div>
        ):
        (<div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.shelfName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                    {this.props.books.filter((bookItem)=>(bookItem.shelf == this.props.shelfName)).map((bookItem)=>(
                    <Book 
                        key={bookItem.id}
                        book={bookItem}
                        bookChangeShelf={(book,shelf)=>{this.handleShelfChange(book,shelf)}}
                    />
                    ))}
                </ol>
              </div>
            </div>)
    )
}
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange:PropTypes.func.isRequired,
  }

export default BookShelf;