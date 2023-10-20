const data = getElement('form input', true)
const form = getElement('form')
const table = getElement('.book-table')
const myLibrary = []
let id = 0


function getElement(selector, all = false) {
    return (all) ? document.querySelectorAll(selector) : document.querySelector(selector)
}

function Book(userdata) {
    this.id = ++id
    this.name = userdata.name
    this.author = userdata.author
    this.pages = parseInt(userdata.pages)
    this.read = userdata.read
}

function addBookToLibrary(event) {
    event.preventDefault()
    userdata = {}
    data.forEach((item) => {
        userdata[item.id] = item.type === 'checkbox' ? item.checked : item.value
    })

    let book = new Book(userdata)
    myLibrary.push(book)
    addBookToTable(book)
}

function addBookToTable(book) {
    row = table.insertRow(-1)
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
    button.addEventListener('click', removeBookFromLibrary)
    button2.addEventListener('click', toggleReadStatus)
    button.dataset.target = book.id
    button2.dataset.target = book.id
    cell.appendChild(button);
    cell.insertAdjacentHTML('beforeend','\u00A0\u00A0')
    cell.appendChild(button2)
}

function removeBookFromLibrary(e) {
    bookId = this.dataset.target
    bookIndex = myLibrary.findIndex((item) => item.id == bookId)
    myLibrary.splice(bookIndex,1)
    this.closest('tr').remove()
}

function toggleReadStatus(e) {
    bookId = this.dataset.target
    bookIndex = myLibrary.findIndex((item) => item.id == bookId)
    myLibrary[bookIndex].read = !(myLibrary[bookIndex].read)
    row = this.closest('tr')
    rowIndex = row.sectionRowIndex
    cell = table.rows[rowIndex].cells[4]
    cell.textContent = myLibrary[bookIndex].read ? "Yes" : "No"
    this.textContent = myLibrary[bookIndex].read ? "Mark unread" : "Mark read"
    console.log(myLibrary[bookIndex].read)
}


form.addEventListener('submit', addBookToLibrary)
