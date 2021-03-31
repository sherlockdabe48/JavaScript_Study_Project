function print(variable) {
  console.log(variable)
}
function printError(variable) {
  console.error(variable)
}

/*------------------------------------*/
//Normal callback function, the next function will get deeper
setTimeout(() => {
  print("1")
  setTimeout(() => {
    print("2")
    setTimeout(() => {
      print("3")
    }, 500)
  }, 500)
}, 500)

//Use promise function  instead of a normal callback,
//all function are on the same column -> easy to read
setTimeoutPromise(2000)
  .then(() => {
    print("4")
    return setTimeoutPromise(500)
  })
  .then(() => {
    print("5")
    return setTimeoutPromise(500)
  })
  .then(() => {
    print("6")
  })

//Create promise function
function setTimeoutPromise(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

/*----------------------------------------*/
//create a promise of addEvenListener

//Select the element
const button = document.querySelector("button")

// Normal .addEvenListener
button.addEventListener("click", () => {
  print("Hello World")
})

//Use addEvenListener in form of promise function,
//***But, you will found that .then() will get the result only once when you click multiple times */
const clickHello = addEvenListenerPromise(button, "click").then(() =>
  print("Hello Promise")
)

//Create promise function of addEvenListener
function addEvenListenerPromise(element, method) {
  return new Promise((resolve, reject) => {
    element.addEventListener(method, resolve)
  })
}

/*---------------------------------------------*/

//Promise.all => need all get success to execute the 'Done' results
Promise.all([
  Promise.resolve("1 Done"),
  Promise.resolve("2 Done"),
  Promise.resolve("3 Done"),
])
  .then((message) => {
    print(message)
  })
  .catch((message) => {
    printError(message)
  })

//Promise.any => need only a single promise get success to execute the 'Done' results of the first success
Promise.any([
  Promise.reject("1 Fail"),
  Promise.resolve("2 Done"),
  Promise.resolve("3 Done"),
])
  .then((message) => {
    print(message)
  })
  .catch((message) => {
    printError(message)
  })

//Promise.race => no matter all promises get success of fail, the first promise that finish will execute.
Promise.race([
  Promise.reject("1 Fail"),
  Promise.resolve("2 Done"),
  Promise.resolve("3 Done"),
])
  .then((message) => {
    print(message)
  })
  .catch((message) => {
    printError(message)
  })

//Promise.allSettled => no need a .catch() to catch the fail promise, this will show all of promise status and reason.
Promise.allSettled([
  Promise.reject("1 Fail"),
  Promise.reject("2 Fail"),
  Promise.resolve("3 Done"),
]).then((message) => {
  print(message)
})

//.finally() => On top of the .then() and .catch(), You can use .finally() to execute the final value you want.
Promise.all([
  Promise.resolve("1 Done"),
  Promise.resolve("2 Done"),
  Promise.resolve("3 Done"),
])
  .then((message) => {
    print(message)
  })
  .catch((message) => {
    printError(message)
  })
  .finally(() => {
    print("This is final")
  })
