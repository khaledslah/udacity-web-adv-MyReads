import React from "react"
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf.js'
import {Link} from 'react-router-dom'
import debounce from 'lodash.debounce'

class BookSearch extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.emitChangeDebounced = debounce(this.emitChange, 250);
      }
      componentWillUnmount() {
        this.emitChangeDebounced.cancel();
      }
    state={
        books:[],
    }
    handleChange(e) {
        this.emitChangeDebounced(e.target.value);
      }
    async emitChange(searchValue){
        let searchedBooks = await BooksAPI.search(searchValue);
        let searchedBookIndex 
        if(searchedBooks instanceof Array){
            
        for (const book of this.props.books) {
            searchedBookIndex = searchedBooks.findIndex(item => item.id === book.id)
            if(searchedBookIndex !== -1)
            searchedBooks[searchedBookIndex] = book
            
        }
        
            this.setState(()=>({
                books:searchedBooks
            }))  
        }
        else{
            this.setState(()=>({
                books:[]
            }))
        }
    }
    handleShelfChange(book,shelf){
        this.props.onShelfChange(book,shelf)
    }
    render(){
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search button" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={this.handleChange}/>
              </div>
              </div>{
            <BookShelf shelfName="searchList" books={this.state.books} onShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
              }</div>

        )}
}

export default BookSearch;