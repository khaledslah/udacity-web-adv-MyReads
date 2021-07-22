import React from "react"
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf.js'
import {Link} from 'react-router-dom'

class BookSearch extends React.Component {

    state={
        books:[],
        query:''
    }

    handleChange(searchValue){
        BooksAPI.search(searchValue).then((searchedBooks)=>{
            this.setState(()=>({
                books:(searchedBooks instanceof Array)?searchedBooks:[],
                query:searchValue
            }))
        })
        
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
                <input type="text" placeholder="Search by title or author" onChange={(e)=>{this.handleChange(e.target.value)}}/>
              </div>
              </div>{
            <BookShelf shelfName="searchList" books={this.state.books} onShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
              }</div>

        )}
}

export default BookSearch;