import React from "react"


class Book extends React.Component {

    handleChange(e) {
        this.props.bookChangeShelf(this.props.book,e.target.value);
      }
    render(){
        const thumb = ('imageLinks' in this.props.book)?this.props.book.imageLinks.thumbnail:''
        return(
        <li >
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumb})`}}></div>
                <div className="book-shelf-changer">
                  <select value ={this.props.book.shelf || "none"} onChange={(e)=>{this.handleChange(e)}}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{this.props.book.title}</div>
              <div className="book-authors">{('authors' in this.props.book)?this.props.book.authors.join():''}</div>
            </div>
        </li>
        )

    }
}
export default Book;