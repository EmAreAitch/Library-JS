class Book {
    constructor(userdata) {
        this.id = userdata.id
        this.name = userdata.name
        this.author = userdata.author
        this.pages = userdata.pages
        this.read = userdata.read
    }
}

class Library {
    constructor() {
        this.myLibrary = new Array
        this.id = 0
    }
    addBookToLibrary(userdata) {
        userdata.id = ++this.id
        userdata.pages |= 0
        let book = new Book(userdata)
        this.myLibrary.push(book)
        return book 
    }
    findBookIndexById(id) {
        return this.myLibrary.findIndex((item) => item.id === id)
    }
    removeBookById(id) {
        this.myLibrary.splice(this.findBookIndexById(id),1)
    }
    toggleReadStatus(id) {
        let bookIndex = this.findBookIndexById(id)
        this.myLibrary[bookIndex].read = !(this.myLibrary[bookIndex].read)
    }
    isBookRead(id) {

        return this.myLibrary[this.findBookIndexById(id)].read
    }
}

class LibraryUI {
    constructor() {
        this.data = this.getElement('form input', true)
        this.form = this.getElement('form')
        this.table = this.getElement('.book-table')
        this.library = new Library
        this.initializeEventListeners()
    }
    getBook = (e) => {
        e.preventDefault()
        let userdata = {}
        this.data.forEach((item) => {
        userdata[item.id] = item.type === 'checkbox' ? item.checked : item.value
        })
        let book = this.library.addBookToLibrary(userdata)
        this.addBookToTable(book)
        
    }
    removeBookFromLibrary = (e) => {
        let bookId = + e.currentTarget.dataset.target
        this.library.removeBookById(bookId)
        e.currentTarget.closest('tr').remove()
    }
    addBookToTable(book) {
        let row = this.table.insertRow(-1)
        let cell
        for (let data in book) {
            cell = row.insertCell()
            cell.textContent = data == 'read' ? book[data] ? "Yes" : "No" : book[data]
        }
        cell = row.insertCell()
        let button = document.createElement('button');
        let button2 = document.createElement('button');
        button.innerHTML = 'Remove';
        button2.innerHTML = book.read ? "Mark unread" : "Mark read"
        button.classList.add('remove')
        button.classList.add('read')
        button.addEventListener('click', this.removeBookFromLibrary)
        button2.addEventListener('click', this.toggleReadStatus)
        button.dataset.target = book.id
        button2.dataset.target = book.id
        cell.appendChild(button);
        cell.insertAdjacentHTML('beforeend', '\u00A0\u00A0')
        cell.appendChild(button2)
    }
    toggleReadStatus = (e) => {
        let bookId = + e.currentTarget.dataset.target
        this.library.toggleReadStatus(bookId)
        let row = e.currentTarget.closest('tr')
        let rowIndex = row.sectionRowIndex
        let cell = this.table.rows[rowIndex].cells[4]
        cell.textContent = this.library.isBookRead(bookId) ? "Yes" : "No"
        e.currentTarget.textContent = this.library.isBookRead(bookId) ? "Mark unread" : "Mark read"
    }
    getElement(selector, all = false) {
        return (all) ? document.querySelectorAll(selector) : document.querySelector(selector)
    }
    initializeEventListeners() {
        this.form.addEventListener('submit',this.getBook)
    }
}

Library = new LibraryUI
