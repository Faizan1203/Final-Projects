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

  edit_btn = document.querySelector(`#edit-goal-${id}`);

  if (edit_btn.textContent == "Edit") {


    document.querySelector("#goals_heading").innerHTML = `Edit Goal-${name}`;

    document.querySelector(".create-goal").style.display = "none";

    document.querySelector(`#goal-goal-${id}`).style.display = "none";

    document.querySelector(`#goal-end_date-${id}`).style.display = "none";

    document.querySelector(`#goal-rewards-${id}`).style.display = "none";

    document.querySelector(`#goal-name-edit-${id}`).style.display = "block";

    document.querySelector(`#goal-end_date-edit-${id}`).style.display = "block";

    document.querySelector(`#goal-rewards-edit-${id}`).style.display = "block";

    edit_btn.textContent = "Save";


    document.querySelector(".cancel").style.display = "block";




    edit_btn.setAttribute("class", "text-primary edit");


  } else if (edit_btn.textContent == "Save") {

    edit_goal(element);
    edit_btn.textContent = "Edit";



    edit_btn.setAttribute("class", "text-primary edit");
  }
}




function edit_goal(element) {

  id = element.getAttribute("data-id");
  goal_name = document.querySelector(`#goal-name-edit-${id}`).value;
  goal_end_date = document.querySelector(`#goal-end_date-edit-${id}`).value;
  goal_rewards = document.querySelector(`#goal-rewards-edit-${id}`).value;


  form = new FormData();

  form.append("id", id);

  form.append("goal_name", goal_name.trim());

  form.append("goal_end_date", goal_end_date.trim());

  form.append("goal_rewards", goal_rewards.trim());

  fetch("/edit_goal/", {

    method: "POST",

    body: form,
  })
  .then((res) => {
    location.reload();
  });
}