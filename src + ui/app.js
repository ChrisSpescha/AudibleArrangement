const links = document.querySelectorAll('link[rel="import"]');
links.forEach((link) => {
    let template = link.import.querySelector('template');
    let clone = document.importNode(template.content, true);
    let target = clone.querySelector(".template").dataset.tab;
    document.getElementById(target).appendChild(clone);
});

window.$ = window.jquery = require("jquery");
window.popper = require("popper.js");
require("bootstrap");
require('./renderer.js')


const myform = document.getElementById('myform')
const name = document.getElementById('name')
const password = document.getElementById('password')
const email = document.getElementById('email')


const articles = document.getElementById('articles')

let userId;

//const getDataByID = (id) => {
//    fetch(`http://127.0.0.1:5000/get/${id}/`, {
//        method:'GET',
//         headers: {
//            'Content-Type': 'application/json'
//        }
//    })
//    .then(resp => resp.json())
//    .then(data => {
//        renderOneItem(data)
//    })
//}

const renderOneItem = (mydata) => {
    name.value = mydata.name
    email.value = mydata.email
    password.value = mydata.password

    userId = mydata.id
}

const insertData = (newData) => {
    fetch('http://127.0.0.1:5000/register', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(newData)
        })
        .then(console.log(newData))
        .then(console.log(resp))
        .then(resp => resp.json())
        .then((data) => {
            console.log(data)
        })
        .catch(error => console.log(error))
    }

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    const newData = {
        email:email.value,
        password:password.value,
        name:name.value,
    }
    if(userId) {
        updateData(userId, newData)
    } else {
        insertData(newData)
    }
    myform.reset()
})

//getAllData()

//function renderArticles(mydata){
//    articles.innerHTML = '';
//    mydata.forEach(data => {
//        articles.innerHTML += `
//        <div class = "card card-body my-2">
//            <p>${data.title}</p>
//            <p>${data.body}</p>
//            <h5>${data.date}</h5>
//
//            <p>
//            <button class = "btn btn-danger" onclick = "deleteData('${data.id}')">Delete</button>
//            <button class = "btn btn-success" onclick = "getDataByID('${data.id}')">Update</button>
//            </p>
//        </div>
//        `
//    })
//}



//const getAllData = () => {
//
//    fetch('http://127.0.0.1:5000/', {
//        method:'GET',
//        headers: {
//            'Content-Type': 'application/json'
//            }
//        })
//        .then(resp => resp.json())
//        .then(data => renderArticles(data))
//        .catch(error => console.log(error))
//
//    }

//const deleteData = (id) => {
//    fetch(`http://127.0.0.1:5000/delete/${id}/` , {
//        method:'DELETE',
//         headers:{
//            'Content-Type': 'application/json'
//        }
//    })
//    getAllData()
//}



//const updateData = (articleId, mydata) => {
//    fetch(`http://127.0.0.1:5000/update/${articleId}/`, {
//        method:'PUT',
//         headers: {
//            'Content-Type': 'application/json'
//        },
//        body:JSON.stringify(mydata)
//    })
//    .then(resp => resp.json())
//    .then(() => {
//        getAllData()
//    })
//}



