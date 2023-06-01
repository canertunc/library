
class Book {
    constructor(bookName, bookAuthor, numberOfPage,isReaded) {
        
        if (bookName == ""){
            this.bookName = "unknown";
        }
        else {this.bookName = bookName;}
        
        if (bookAuthor == ""){
            this.bookAuthor = "unknown";
        }
        else {this.bookAuthor = bookAuthor;}

        if (numberOfPage == ""){
            this.numberOfPage = "0";
        }
        else {this.numberOfPage = numberOfPage;}

        this.isReaded = isReaded;

    }
}

let bookArray = [];

function submitButtonFunction(booelan,bookOne) {
    const cardBooks = document.querySelector(".card-books");
    const bookNameValue = document.querySelector(".book-name");
    const bookAuthorValue = document.querySelector(".author-name");
    const numberPageValue = document.querySelector(".number-page-value");
    const checkboxReaded= document.querySelector(".checkbox-readed");

    if (booelan){
        bookArray.push(bookOne);
        newBook = bookOne;
    }
    else {
        newBook = new Book(bookNameValue.value,bookAuthorValue.value,numberPageValue.value,checkboxReaded.checked);
        bookNameValue.value = "";
        bookAuthorValue.value = "";
        numberPageValue.value = "";
        checkboxReaded.checked = false;
        bookArray.push(newBook);
        localStorage.setItem("books",JSON.stringify(bookArray));

    }

    if (bookArray.length == 4) {
        const newHeightOfDiv = document.querySelector(".card-books");
        newHeightOfDiv.style.height = "auto";
    }

    const classBook = document.createElement("div");
    classBook.className = "book";

    const bookDetailPieceName = document.createElement("div");
    bookDetailPieceName.className = "book-detail-piece";
    const headName = document.createElement("h3");
    headName.textContent = newBook.bookName;
    bookDetailPieceName.appendChild(headName);
    classBook.appendChild(bookDetailPieceName);


    const bookDetailPieceAuthor = document.createElement("div");
    bookDetailPieceAuthor.className = "book-detail-piece";
    const headAuthor = document.createElement("h3");
    headAuthor.textContent = newBook.bookAuthor;
    bookDetailPieceAuthor.appendChild(headAuthor);
    classBook.appendChild(bookDetailPieceAuthor);


    const bookDetailPiecePage = document.createElement("div");
    bookDetailPiecePage.className = "book-detail-piece";
    const headPage = document.createElement("h3");
    headPage.textContent = newBook.numberOfPage + " pages";
    bookDetailPiecePage.appendChild(headPage);
    classBook.appendChild(bookDetailPiecePage);


    const bookDetailPieceReaded = document.createElement("div");
    bookDetailPieceReaded.className = "book-detail-piece";
    const headButton = document.createElement("button");
    headButton.className = "readed-button";
    if (newBook.isReaded) {
        headButton.textContent = "Readed";
        
        
    }
    else {
        headButton.textContent = "Not Readed";
        headButton.style.backgroundColor = "blue";
    }
    headButton.addEventListener("click", (e) => {
        if (headButton.textContent == "Readed") {
            headButton.textContent = "Not Readed";
            headButton.style.backgroundColor = "blue";
            changeBook = headButton.parentElement.parentElement.querySelectorAll("h3");
            bookArray.forEach((book) => {
                if (book.bookName == changeBook[0].textContent && book.bookAuthor == changeBook[1].textContent && book.numberOfPage+" pages"  == changeBook[2].textContent){
                    index = bookArray.indexOf(book)
                }
            })
            bookArray[index].isReaded = false;
            let completedBook = 0;
            let completedPages = 0;
            bookArray.forEach((book) => {
                if(book.isReaded){
                    completedBook += 1;
                    completedPages += parseInt(book.numberOfPage);
                }
            })
            const bookCompletedCountNumber = document.querySelector("#completed-count-number");
            const totalCompletedPageBook = document.querySelector("#completed-page-number");
            if(bookCompletedCountNumber) {
                bookCompletedCountNumber.textContent = completedBook;
                totalCompletedPageBook.textContent = completedPages;
            }

            localStorage.setItem("books",JSON.stringify(bookArray));
        }
        else {
            headButton.textContent = "Readed";
            headButton.style.backgroundColor = "#188f18";
            
            changeBook = headButton.parentElement.parentElement.querySelectorAll("h3");
            bookArray.forEach((book) => {
                if (book.bookName == changeBook[0].textContent && book.bookAuthor == changeBook[1].textContent && book.numberOfPage+" pages"  == changeBook[2].textContent){
                    index = bookArray.indexOf(book)
                }
            })
            bookArray[index].isReaded = true;
            let completedBook = 0;
            let completedPages = 0;
            bookArray.forEach((book) => {
                if(book.isReaded){
                    completedBook += 1;
                    completedPages += parseInt(book.numberOfPage);
                }
            })
            const bookCompletedCountNumber = document.querySelector("#completed-count-number");
            const totalCompletedPageBook = document.querySelector("#completed-page-number");
            if(bookCompletedCountNumber) {
                bookCompletedCountNumber.textContent = completedBook;
                totalCompletedPageBook.textContent = completedPages;
            }

            localStorage.setItem("books",JSON.stringify(bookArray));

        }
    })
    bookDetailPieceReaded.appendChild(headButton);
    classBook.appendChild(bookDetailPieceReaded);

    
    const bookDetailPieceRemoved = document.createElement("div");
    bookDetailPieceRemoved.className = "book-detail-piece";
    const headRemove = document.createElement("button");
    headRemove.className = "remove-button";
    headRemove.textContent = "Remove";

    headRemove.addEventListener("click",(e) => {
        

        changeBook = classBook.querySelectorAll("h3");
        bookArray.forEach((book) => {
            if (book.bookName == changeBook[0].textContent && book.bookAuthor == changeBook[1].textContent && book.numberOfPage+" pages"  == changeBook[2].textContent){
                index = bookArray.indexOf(book)
            }
        })
        classBook.remove();
        bookArray = bookArray.filter((book) => book !== bookArray[index]);
        let completedBook = 0;
        let totalPages = 0;
        let completedPages = 0;
        bookArray.forEach((book) => {
            if(book.isReaded){
                completedBook += 1;
                completedPages += parseInt(book.numberOfPage);
            }
            totalPages += parseInt(book.numberOfPage);
        })
        const bookCompletedCountNumber = document.querySelector("#completed-count-number");
        const totalCompletedPageBook = document.querySelector("#completed-page-number");
        const totalPageBook = document.querySelector("#book-page-number");
        if(bookCompletedCountNumber) {
            bookCompletedCountNumber.textContent = completedBook;
            totalCompletedPageBook.textContent = completedPages;
            totalPageBook.textContent = totalPages;
        }

        
        localStorage.setItem("books",JSON.stringify(bookArray));


        const countDivGet = document.querySelector("#book-count-number");
        if(countDivGet) {
            countDivGet.textContent = bookArray.length;
        }
        if (bookArray.length == 3) {
            const newHeightOfDiv = document.querySelector(".card-books");
            newHeightOfDiv.style.height = "659px";
        }
        
    })

    bookDetailPieceRemoved.appendChild(headRemove);
    classBook.appendChild(bookDetailPieceRemoved);

    cardBooks.appendChild(classBook);
}



const back = document.querySelector(".back");
const formBook = document.querySelector(".form-book");

function addNewFunction() {
    const newHeadDiv = document.querySelector(".head-form");
    newHeadDiv.remove();
    const addNewBookButtonDiv = document.querySelector(".submit-button");
    addNewBookButtonDiv.remove();
    const RemoveAllButtonDiv = document.querySelector(".submit-button");
    RemoveAllButtonDiv.remove();
    const previousFooter = document.querySelector(".footer");
    previousFooter.remove();

    const headFormDiv = document.createElement("div");
    const newHeadDivH = document.createElement("h2");
    headFormDiv.className = "head-form";
    newHeadDivH.textContent = "Add a New Book";
    headFormDiv.appendChild(newHeadDivH);
    formBook.appendChild(headFormDiv);

    const newFormDetail = document.createElement("div");
    newFormDetail.className = "form-detail";

    const newFormName = document.createElement("div");
    newFormName.className = "form-name";
    const formNameLabel = document.createElement("label");
    formNameLabel.className = "labels";
    formNameLabel.textContent = "Book Title";
    const formNameInput = document.createElement("input");
    formNameInput.className = "book-name";
    formNameInput.placeholder = "The Good Old Days";
    formNameInput.type = "text";
    newFormName.appendChild(formNameLabel);
    newFormName.appendChild(formNameInput);
    newFormDetail.appendChild(newFormName);



    const newFormAuthor = document.createElement("div");
    newFormAuthor.className = "form-author";
    const formAuthorLabel = document.createElement("label");
    formAuthorLabel.className = "labels";
    formAuthorLabel.textContent = "Author Name";
    const formAuthorInput = document.createElement("input");
    formAuthorInput.className = "author-name";
    formAuthorInput.placeholder = "Otto Bettmann";
    formAuthorInput.type = "text";
    newFormAuthor.appendChild(formAuthorLabel);
    newFormAuthor.appendChild(formAuthorInput);
    newFormDetail.appendChild(newFormAuthor);


    const newFormPage = document.createElement("div");
    newFormPage.className = "number-page";
    const formPageLabel = document.createElement("label");
    formPageLabel.className = "labels";
    formPageLabel.textContent = "Number of Page";
    const formPageInput = document.createElement("input");
    formPageInput.className = "number-page-value";
    formPageInput.placeholder = "224";
    formPageInput.type = "number";

    newFormPage.appendChild(formPageLabel);
    newFormPage.appendChild(formPageInput);
    newFormDetail.appendChild(newFormPage);

    const newRead = document.createElement("div");
    newRead.className = "read";
    const formReadInput = document.createElement("input");
    formReadInput.className = "checkbox-readed";
    formReadInput.type = "checkbox";
    const formReadLabel = document.createElement("label");
    formReadLabel.className = "checkbox-readed";
    formReadLabel.textContent = "Readed";
    newRead.appendChild(formReadInput);
    newRead.appendChild(formReadLabel);
    newFormDetail.appendChild(newRead);

    const newSubmitButtonDiv = document.createElement("div");
    newSubmitButtonDiv.className = "submit-button";
    const newSubmitButton = document.createElement("button");
    newSubmitButton.textContent = "Submit";
    newSubmitButton.id = "submit-idk";
    newSubmitButton.type = "submit";
    newSubmitButton.addEventListener("click",(e) => {
        submitButtonFunction(false,"sda");
    })
    newSubmitButtonDiv.appendChild(newSubmitButton);
    newFormDetail.appendChild(newSubmitButtonDiv);

    const newBackButtonDiv = document.createElement("div");
    newBackButtonDiv.className = "submit-button";
    const newBackButton = document.createElement("button");
    newBackButton.textContent = "Back";
    newBackButton.className = "back";
    newBackButton.type = "submit";
    newBackButton.addEventListener("click",(e) => {
        backFunction();
    })
    newBackButtonDiv.appendChild(newBackButton);
    newFormDetail.appendChild(newBackButtonDiv);

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.textContent = "Created by Caner";
    footer.style.marginTop = "35px"
    newFormDetail.appendChild(footer);

    formBook.appendChild(newFormDetail);

}

function backFunction(){
    const deleteHeadForm = document.querySelector(".head-form");
    deleteHeadForm.remove();
    const deleteFormDetail = document.querySelector(".form-detail");
    deleteFormDetail.remove();
    let completedBook = 0;
    let totalPages = 0;
    let completedPages = 0;
    bookArray.forEach((book) => {
        if(book.isReaded){
            completedBook += 1;
            completedPages += parseInt(book.numberOfPage);
        }
        totalPages += parseInt(book.numberOfPage);
    })

    const newHeadDiv = document.createElement("div");
    const newHeadDivH = document.createElement("h2");
    const firstHr = document.createElement("hr");
    const infHead = document.createElement("h2");
    firstHr.className = "head-hr";
    newHeadDiv.className = "head-form";
    infHead.textContent = "Information";
    newHeadDivH.id = "count-head";
    newHeadDivH.style.color = "#ffff";
    infHead.style.fontSize = "24px";
    newHeadDivH.appendChild(firstHr);
    newHeadDivH.appendChild(infHead);
    newHeadDiv.appendChild(newHeadDivH);

    const InformationsDiv = document.createElement("div");
    InformationsDiv.className = "informations";

    const bookCountDiv = document.createElement("div");
    bookCountDiv.className = "books-count";
    const divName = document.createElement("div");
    divName.textContent = "Books";   
    const divNumber = document.createElement("div");
    divNumber.id = "book-count-number";
    divNumber.textContent = bookArray.length;
    bookCountDiv.appendChild(divName);
    bookCountDiv.appendChild(divNumber);
    InformationsDiv.appendChild(bookCountDiv);

    const InformationsDivCompleted = document.createElement("div");
    InformationsDivCompleted.className = "completed-books-count";
    const divNameCompleted = document.createElement("div");
    divNameCompleted.textContent = "Completed Books";  
    const divNumberCompleted = document.createElement("div");
    divNumberCompleted.id = "completed-count-number";
    divNumberCompleted.textContent = completedBook;
    InformationsDivCompleted.appendChild(divNameCompleted);
    InformationsDivCompleted.appendChild(divNumberCompleted);
    InformationsDiv.appendChild(InformationsDivCompleted);

    const InformationsDivPage = document.createElement("div");
    InformationsDivPage.className = "total-pages";
    const divNamePage = document.createElement("div");   
    divNamePage.textContent = "Total Pages";
    const divNumberPage = document.createElement("div");
    divNumberPage.id = "book-page-number";
    divNumberPage.textContent = totalPages;
    InformationsDivPage.appendChild(divNamePage);
    InformationsDivPage.appendChild(divNumberPage);
    InformationsDiv.appendChild(InformationsDivPage);

    const InformationsDivTotalPage = document.createElement("div");
    InformationsDivTotalPage.className = "completed-pages-count";
    const divNameTotalPage = document.createElement("div");   
    divNameTotalPage.textContent = "Completed Pages";
    const divNumberTotalPage = document.createElement("div");
    divNumberTotalPage.id = "completed-page-number";
    divNumberTotalPage.textContent = completedPages;
    InformationsDivTotalPage.appendChild(divNameTotalPage);
    InformationsDivTotalPage.appendChild(divNumberTotalPage);
    InformationsDiv.appendChild(InformationsDivTotalPage);

    const secondHr = document.createElement("hr");
    secondHr.className = "head-hr";
    
    newHeadDiv.appendChild(InformationsDiv)
    newHeadDiv.appendChild(secondHr);
    formBook.appendChild(newHeadDiv);
    


    const addNewBookButtonDiv = document.createElement("div");
    const addNewBookButton = document.createElement("button");
    addNewBookButtonDiv.className = "submit-button";
    addNewBookButton.id = "submit-ids";
    addNewBookButton.className = "submit-add";
    addNewBookButton.textContent = "Add New Book";
    addNewBookButton.addEventListener("click",(e) => {
        addNewFunction();
    })

    addNewBookButtonDiv.appendChild(addNewBookButton);
    formBook.appendChild(addNewBookButtonDiv);



    const RemoveAllButtonDiv = document.createElement("div");
    const RemoveAllButton = document.createElement("button");
    RemoveAllButtonDiv.className = "submit-button";
    RemoveAllButton.textContent = "Remove All";
    RemoveAllButton.id = "remove-button-id";
    RemoveAllButton.addEventListener("click",(e) => {
        const deleteBookAll = document.querySelectorAll(".book");
        deleteBookAll.forEach((book) => {
            book.remove();

            
        })
        bookArray = [];
        localStorage.setItem("books",JSON.stringify(bookArray));
        const countDivGet = document.querySelector("#book-count-number");
        if(countDivGet) {
            countDivGet.textContent = bookArray.length;
            const bookCompletedCountNumber = document.querySelector("#completed-count-number");
            bookCompletedCountNumber.textContent = 0;
        
            const totalPageBook = document.querySelector("#book-page-number");
            totalPageBook.textContent = 0;
        
            const totalCompletedPageBook = document.querySelector("#completed-page-number");
            totalCompletedPageBook.textContent = 0;
        }
        
        const newHeightOfDiv = document.querySelector(".card-books");
        newHeightOfDiv.style.height = "659px";
    })
    RemoveAllButtonDiv.appendChild(RemoveAllButton);
    formBook.appendChild(RemoveAllButtonDiv);

    const footer = document.createElement("footer");
    footer.className = "footer";
    footer.textContent = "Created by Caner";
    formBook.appendChild(footer);
}


const submitNewBook = document.querySelector("#submit-ids");

submitNewBook.addEventListener("click",(e) => {
    addNewFunction();
});

const removeAllBooks = document.querySelector("#remove-button-id");
removeAllBooks.addEventListener("click",(e) => {
    const deleteBookAll = document.querySelectorAll(".book");
    deleteBookAll.forEach((book) => {
        book.remove();

    })
    bookArray = [];
    localStorage.setItem("books",JSON.stringify(bookArray));
    const countDivGet = document.querySelector("#book-count-number");
    if(countDivGet) {
        countDivGet.textContent = bookArray.length;
        const bookCompletedCountNumber = document.querySelector("#completed-count-number");
        bookCompletedCountNumber.textContent = 0;
    
        const totalPageBook = document.querySelector("#book-page-number");
        totalPageBook.textContent = 0;
    
        const totalCompletedPageBook = document.querySelector("#completed-page-number");
        totalCompletedPageBook.textContent = 0;
    }
    
    const newHeightOfDiv = document.querySelector(".card-books");
    newHeightOfDiv.style.height = "659px";
})

const contact = document.querySelector("#contact-us")
contact.addEventListener("click",(e) => {
    alert("canertunc982@gmail.com");
})

document.addEventListener("DOMContentLoaded",() => {
    const loadedArray = localStorage.getItem("books");
    
    newBookArray = JSON.parse(loadedArray);
    if (newBookArray != []){
        newBookArray.forEach((book) => {
            submitButtonFunction(true,book);
        })
    }

    const bookCountNumber = document.querySelector("#book-count-number");
    bookCountNumber.textContent = newBookArray.length;
    let completedBook = 0;
    let totalPages = 0;
    let completedPages = 0;
    newBookArray.forEach((book) => {
        if(book.isReaded){
            completedBook += 1;
            completedPages += parseInt(book.numberOfPage);
        }
        totalPages += parseInt(book.numberOfPage);
    })
    const bookCompletedCountNumber = document.querySelector("#completed-count-number");
    bookCompletedCountNumber.textContent = completedBook;

    const totalPageBook = document.querySelector("#book-page-number");
    totalPageBook.textContent = totalPages;

    const totalCompletedPageBook = document.querySelector("#completed-page-number");
    totalCompletedPageBook.textContent = completedPages;

})
