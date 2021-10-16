document.addEventListener('DOMContentLoaded', function() {

  edit = document.querySelectorAll(".edit");

  edit.forEach((element) => {

    element.addEventListener("click", () => {

      edit_handler(element);
    });
  });

});

function edit_handler(element) {

  id = element.getAttribute("data-id");
  name = element.getAttribute("data-name");

  edit_btn = document.querySelector(`#edit-room-${id}`);

  if (edit_btn.textContent == "Edit") {

    document.querySelector("#room_heading").innerHTML = `Edit Room-${name}`;

    document.querySelector("#new_room").style.display = "none";

    document.querySelector(`#room-${id}`).style.display = "none";


    document.querySelector(`#room-edit-${id}`).style.display = "block";

    edit_btn.textContent = "Save";


    document.querySelector(".cancel").style.display = "block";


    edit_btn.setAttribute("class", "text-primary edit");


  } else if (edit_btn.textContent == "Save") {

    edit_room(element);
    edit_btn.textContent = "Edit";

    edit_btn.setAttribute("class", "text-primary edit");
  }
}




function edit_room(element) {

  id = element.getAttribute("data-id");
  room_name = document.querySelector(`#room-edit-${id}`).value;

  form = new FormData();

  form.append("id", id);

  form.append("room_name", room_name.trim());

  fetch("/edit_room/", {

    method: "POST",

    body: form,
  })
  .then((res) => {
    location.reload();
  });
}