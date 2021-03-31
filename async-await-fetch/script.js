const URL = "https://jsonplaceholder.typicode.com/users"

// //Normal fetch data from url
fetch(URL)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log("---------Normal Fetch---------")
    data.forEach((user) => {
      console.log(user.name)
    })
  })

//Use async await to fetch data
async function fetchData() {
  const response = await fetch(URL)
  const users = await response.json()
  console.log("---------Async Await Fetch---------")
  users.forEach((user) => {
    console.log(user.name)
  })
}

fetchData()

//Post
const POST_URL = "https://jsonplaceholder.typicode.com/posts"

async function postData() {
  const response = await fetch(POST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      title: "New post",
    }),
  })
  const post = await response.json()
  console.log("---------Post Data---------")
  console.log(post)
}

postData()

//GET Data
const GET_URL = "https://jsonplaceholder.typicode.com/comments?postId=1"

fetch(GET_URL)
  .then((response) => response.json())
  .then((comments) => {
    console.log("---------Normal GET DATA---------")
    comments.forEach((comment) => console.log(comment.email))
  })

//GET Data by using async and await
async function getData() {
  const response = await fetch(GET_URL)
  const comments = await response.json()

  console.log("---------Async Await GET DATA---------")
  comments.forEach((comment) => console.log(comment.email))
}

getData()
