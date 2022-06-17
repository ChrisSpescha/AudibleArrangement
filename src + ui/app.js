const myform = document.getElementById('myform')
const title = document.getElementById('title')
const body = document.getElementById('description')

const articles = document.getElementById('articles')

let articleId;

//const insertData = (newData) => {
//    fetch('http://127.0.0.1:5000/add', {
//        method:'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body:JSON.stringify(newData)
//        })
//        .then(resp => resp.json())
//        .then((data) => {
//            console.log(data)
//        })
//        .catch(error => console.log(error))
//    }

const getAllData = () => {

    fetch('http://127.0.0.1:5000/', {
        method:'GET',
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => renderArticles(data))
        .catch(error => console.log(error))

    }

//const deleteData = (id) => {
//    fetch(`http://127.0.0.1:5000/delete/${id}/` , {
//        method:'DELETE',
//         headers:{
//            'Content-Type': 'application/json'
//        }
//    })
//    getAllData()
//}
//
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
//
//const renderOneItem = (mydata) => {
//    title.value = mydata.title
//    body.value = mydata.body
//
//    articleId = mydata.id
//}
//
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
//
//
//
function renderArticles(mydata){
    articles.innerHTML = '';
    mydata.forEach(data => {
        articles.innerHTML += `
        <div class = "card card-body my-2">
            <p>${data.title}</p>
            <p>${data.body}</p>
            <h5>${data.date}</h5>

            <p>
            <button class = "btn btn-danger" onclick = "deleteData('${data.id}')">Delete</button>
            <button class = "btn btn-success" onclick = "getDataByID('${data.id}')">Update</button>
            </p>
        </div>
        `
    })
}

myform.addEventListener('submit', (e) => {
    e.preventDefault()

    const newData = {
        title:title.value,
        body:body.value
    }

    if(articleId) {
        updateData(articleId, newData)
    } else {
        insertData(newData)
    }
    myform.reset()
})

getAllData()