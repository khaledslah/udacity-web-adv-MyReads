import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {BrowserRouter,Route,Link} from 'react-router-dom'

import BookShelf from './Components/BookShelf.js'
import BookSearch from './Components/BookSearch'

class BooksApp extends React.Component {
  state={
    shelfs:[{id:1,name: "currentlyReading"},{id:2,name: "wantToRead"}, {id:3,name: "read"}],
    books:[]
}
async componentDidMount(){
    const serverBooks = await BooksAPI.getAll();
        this.setState(()=> ({
            books:serverBooks
            }))
}

async handleShelfChange(book,shelf){
    await BooksAPI.update(book,shelf)
        book.shelf = shelf
        this.setState((currentState)=>({
            books: currentState.books.filter(item => item.id !== book.id).concat([book])
        }))
}

  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <Route exact path='/search' render={()=>(
          <BookSearch books={this.state.books} onShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
        )}/> <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {this.state.shelfs.map((shelf)=>(
                    <BookShelf key={shelf.id}shelfName={shelf.name} books={this.state.books} onShelfChange={(book,shelf)=>{this.handleShelfChange(book,shelf)}}/>
                    ))
                    }
                </div>
           </div> 
            <div className="open-search">
              <Link className="button" to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
