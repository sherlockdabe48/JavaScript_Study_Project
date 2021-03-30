function print(variable) {
  console.log(variable)
}
//----------------------------------------------------
/*
  TODO: 2. Select all elements needed
    * The form element (has the id `quiz-form`)
    * The answer inputs (have the class `answer`)
    * BONUS: The questions (have the class `question-item`)
    * BONUS: The alert (has the id `alert`)
*/

const form = document.querySelector("#quiz-form")
const answers = Array.from(document.querySelectorAll(".answer"))
const questions = document.querySelectorAll(".question-item")
const correctAlert = document.querySelector("#alert")
const resetButton = document.querySelector("#reset-button")

// TODO: 3. Create a submit event listener for the form that does the following.
form.addEventListener("submit", (e) => {
  //    1. Prevent the default behaviour
  e.preventDefault()

  //    6. BONUS: Make sure unanswered questions show up as incorrect. The easiest way to do this is to add the incorrect class and removing the correct class from all question items before checking the correct answers
  questions.forEach((question) => {
    question.classList.add("incorrect")
    question.classList.remove("correct")
  })

  //    2. Get all selected answers (use the `checked` property on the input to determine if it is selected or not)
  const selectedAnswers = answers.filter((n) => n.checked === true)

  //    3. Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
  selectedAnswers.forEach((answer) => {
    const isCorrect = answer.value === "true"
    const question = answer.closest(".question-item")

    //    4. For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
    if (isCorrect) {
      question.classList.add("correct")
      question.classList.remove("incorrect")
    } else {
      //    5. For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.
      question.classList.add("incorrect")
      question.classList.remove("correct")
    }
  })

  //    7. BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)

  const countCorrect = document.querySelectorAll(".correct").length
  if (countCorrect === questions.length) {
    activeAlert()
    setTimeout(deactiveAlert, 1000)
  } else print(`${countCorrect} / ${questions.length}`)
})

resetButton.addEventListener("click", () => {
  resetAll()
})

function activeAlert() {
  correctAlert.classList.add("active")
}
function deactiveAlert() {
  correctAlert.classList.remove("active")
}

function resetAll() {
  questions.forEach((question) => {
    question.classList.remove("correct")
    question.classList.remove("incorrect")
  })
}
