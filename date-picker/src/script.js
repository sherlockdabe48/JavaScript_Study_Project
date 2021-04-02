//User can Select any date,
//When user clicks the date => hide the calendar + update the date text on the button
//When user clicks the button =>
//1. If the calendar is in the show state => hide the calendar, not change the text date
//2. If the calendar is in the collapse state => show the clendar, date text is the same as
//the button
//When user click the left button => calendar change to the previous month
//When user click the right button => calendar change to the next month
import {
  addMonths,
  format,
  startOfWeek,
  startOfMonth,
  subMonths,
  getUnixTime,
  fromUnixTime,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"

const datePickerButton = document.querySelector(".date-picker-button")
const datePicker = document.querySelector(".date-picker")
const leftButton = document.querySelector(".prev-month-button")
const rightButton = document.querySelector(".next-month-button")
const datesGrid = document.querySelector(".date-picker-grid-dates")
const currentMonth = document.querySelector(".current-month")
let currentDate = new Date()

setDate(currentDate)

document.addEventListener("click", (e) => {
  if (!e.target.matches(".date-picker-button")) return
  datePicker.classList.toggle("show")
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = selectedDate
  setupCalendar(selectedDate)

  console.log(selectedDate)
})

leftButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupCalendar(selectedDate)
})

rightButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupCalendar(selectedDate)
})

function setDate(currentDate) {
  datePickerButton.dataset.selectedDate = getUnixTime(currentDate)
  datePickerButton.innerText = format(currentDate, "MMMM do, yyyy")
}

function setupCalendar(selectedDate) {
  currentMonth.innerText = format(currentDate, "MMMM - yyyy")
  setupDates(selectedDate)
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate))
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate))
  const eachDay = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  datesGrid.innerHTML = ""
  eachDay.forEach((date) => {
    const dateElement = document.createElement("button")
    dateElement.classList.add("date")
    dateElement.innerText = date.getDate()
    datesGrid.appendChild(dateElement)
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("date-picker-other-month-date")
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected")
    }

    dateElement.addEventListener("click", () => {
      setDate(date)
      dateElement.classList.add("selected")
      datePicker.classList.remove("show")
    })
  })
}
