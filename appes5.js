//Objeecct Oriented Programming  with constructor and prototypes

//book constructor
//it is going to handle the actual book object
function Book(title, author, isbn){
    this.title=title;
    this.author=author
    this.isbn=isbn;
}

//UI Constructor
//it is going to be a set of prototype methods to do things 
//like add and delete and show the alert
function UI(){}
    UI.prototype.addBookToList=function(book){
        const list=document.getElementById('book-list');
        //create table row element
        const row=document.createElement('tr');
        //insert cols
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X<a></td>
        
        `;
        list.appendChild(row);
    }
    //Show Alert
    UI.prototype.showAlert=function(message,className){
            //create div
            const div=document.createElement('div');
            //Add classe
            div.className=`alert ${className}`;
            // Add text
            div.appendChild(document.createTextNode(message));
            //Get parent
            const container=document.querySelector('.container');
            //Get form
            const form=document.querySelector('#book-form');
            //insert alert
            container.insertBefore(div,form);
            //Timeout after 3 sec
            setTimeout(function(){
                document.querySelector('.alert').remove();
            },3000);

    }
    //delete book from list
    UI.prototype.deleteBook=function(target){
        if(target.className==='delete'){
            //getting parent element twice
            target.parentElement.parentElement.remove();
        }
    }
   // Clear Fields
    UI.prototype.clearFields = function() {
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
    }

//Event Listners for adding book
document.getElementById('book-form').addEventListener('submit',
function(e){
    //Getting form values
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value
   
    //Instantiate Book object
    const book=new Book(title,author,isbn);

    //Instantiate UI object
    const ui=new UI();

    //validate
    if(title==='' || author==='' || isbn===''){
        //Error Alert Custom
        ui.showAlert('Please fill all the fields','error');
        ui.clearFields();
    }else{
        //add book to list
        ui.addBookToList(book);
        //show succes
        ui.showAlert('Book Added!,Succesfully!!','success');
        //clear fields after submit
        ui.clearFields();
        }
    e.preventDefault();
});
//Event Listners for deleting book
document.getElementById('book-list').addEventListener
('click',function(e){
    //Instantiate UI object
    const ui=new UI();

    ui.deleteBook(e.target);
    //show an alert
    ui.showAlert('Book Removed from list!!','success');
    e.preventDefault();
})