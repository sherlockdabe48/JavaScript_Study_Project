// TODO: Select all elements needed
//    Use the HTML to figure out what classes/ids will work best for selecting each element
const form = document.querySelector("#form")
const usernameBox = form.querySelector("#username")
const passwordBox = form.querySelector("#password")
const passwordConfirmBox = form.querySelector("#password-confirmation")
const termsBox = form.querySelector("#terms")
const errorsBox = form.querySelector(".errors")
const errorsList = errorsBox.querySelector(".errors-list")
const clearButton = form.querySelector("#clear")

// TODO: Create an event listener for when the form is submitted and do the following inside of it.
form.addEventListener("submit", (e) => {
  //    TODO: Create an array to store all error messages and clear any old error messages
  let errorMessages = []
  clearErrors()
  //    TODO: Define the following validation checks with appropriate error messages
  //      1. Ensure the username is at least 6 characters long
  //      2. Ensure the password is at least 10 characters long
  //      3. Ensure the password and confirmation password match
  //      4. Ensure the terms checkbox is checked
  //    TODO: If there are any errors then prevent the form from submitting and show the error messages

  const user = {
    username: usernameBox.value,
    password: passwordBox.value,
    confirmPassword: passwordConfirmBox.value,
  }

  const errorsCondition = {
    username: user.username.length < 6,
    password: user.password.length < 10,
    passConfirm: user.confirmPassword !== user.password,
    terms: termsBox.checked === false,
  }

  if (errorsCondition.username === true) {
    errorMessages.push("Username must be at least 6 characters")
  }
  if (errorsCondition.password === true) {
    errorMessages.push("Password must be at least 10 characters")
  }
  if (errorsCondition.passConfirm === true) {
    errorMessages.push("Your password confirmation is not match the password")
  }
  if (errorsCondition.terms === true) {
    errorMessages.push("Please check Agree To Terms")
  }

  console.log(errorMessages)

  const isError =
    errorsCondition.username ||
    errorsCondition.password ||
    errorsCondition.passConfirm ||
    errorsCondition.terms

  if (isError) {
    e.preventDefault()
    showErrors(errorMessages)
  }
})

// TODO: Define this function
function clearErrors() {
  while (errorsList.firstChild) {
    errorsList.removeChild(errorsList.firstChild)
  }
  errorsBox.classList.remove("show")
  // Loop through all the children of the error-list element and remove them
  // IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
  // I recommend using a while loop to accomplish this task
  // This is the trickiest part of this exercise so if you get stuck and are unable to progress you can also set the innerHTML property of the error-list to an empty string and that will also clear the children. I recommend trying to accomplish this with a while loop, though, for practice.
  // Also, make sure you remove the show class to the errors container
}

// TODO: Define this function
function showErrors(errorMessages) {
  // Add each error to the error-list element
  // Make sure to use an li as the element for each error
  // Also, make sure you add the show class to the errors container
  errorsBox.classList.add("show")
  errorMessages.forEach((error) => {
    const list = document.createElement("li")
    list.innerText = error
    errorsList.appendChild(list)
  })
}
