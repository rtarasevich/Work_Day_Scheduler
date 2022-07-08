/** gets current date and time and displays it on page */

const now = new Date($.now())
const todayDate = moment(now).format("dddd, MMMM Do, h:mm a z")
const currentHour = moment(now).format("H")
$("#currentDay").append(todayDate)

/** creates html to show time rows */
const myHTML = []
/** function to write the html */
function createHTML() {
  let time = 0
  let timeLetters
  for (let i = 9; i <18; i++) {
    if (i > 12) {
      time = i - 12
      timeLetters = "pm"
    } else if (i === 12) {
      time = 12
      timeLetters = "pm"
    } else {
      time = i
      timeLetters = "am"
    }
    myHTML.push(
      ` <div class="row time-block" id="${i}" >
<div class="col-2 col-md-1 text-center hour">
  ${time}${timeLetters}
</div>
<textarea class="middle-col col-8 col-md-10 description" >
</textarea>
<div class="col-2 col-md-1 saveBtn">
  <i class="fa-solid fa-floppy-disk p-1 text-white"></i>
</div>
</div>`
    )
  }
  return myHTML
}
$(document).ready(function(){
createHTML()
/** adds the html to page */
$(".container").append(myHTML.join(""))

/** adds conditional styling to rows */
$(".row").each(function (index, value) {
  // console.log(this.id)
  if (parseInt(this.id) == currentHour) {
    $(this).addClass("present")
  } else if (parseInt(this.id) < currentHour) {
    $(this).addClass("past")
  } else if (parseInt(this.id) > currentHour) {
    $(this).addClass("future")
  }
})

/** saves users input event to local storage */
$(".saveBtn").on("click", function () {
  var event = $(this).siblings(".description").val()
  var time = $(this).parent().attr("id")
  localStorage.setItem(time, event)

  $("#event-notification").text(`"${event}" was added to local storage ✅`)
})

/** gets users events from local storage to display */
const renderEvents = () => {
  for (let i = 5; i < 24; i++) {
    $(`#${i} .description`).val(localStorage.getItem(`${i}`))
  }

}
renderEvents()
})