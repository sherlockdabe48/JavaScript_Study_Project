//User can click button to Expand and Collapse the card body
//Click Expand => card body show && Expand button change to Collapse Button
//Click Collapse => card body hide && Collapse button change to Expand button created

// Select Buttons and Select each of card that be the closest parent of each button
//Then Select each card body that in that card of button is clicked
//Then toggle between class hide and show of card body
//END

document.addEventListener("click", (e) => {
  if (!e.target.matches(".expand-button")) return

  const card = e.target.closest(".card")
  const cardBody = card.querySelector(".card-body")
  cardBody.classList.toggle("show")

  e.target.innerText = e.target.innerText === "Expand" ? "Collapse" : "Expand"

  // //Or can use switch operator
  // switch (e.target.innerText) {
  //   case "Expand":
  //     e.target.innerText = "Collapse"
  //     break
  //   case "Collapse":
  //     e.target.innerText = "Expand"
  // }
})
