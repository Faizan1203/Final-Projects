document.addEventListener('DOMContentLoaded', function() {
    goal = document.querySelectorAll(".goal_update");
    goal.forEach((element) => {
        goal_updater(element);
    });
    function goal_updater(element) {
        element.addEventListener("click", () => {
        if (confirm("Are you sure this goal has been completed?")) {
            // Do the thing!
                        id = element.getAttribute("data-id");
            is_achieved = element.getAttribute("data-is_achieved");
            form = new FormData();
            form.append("id", id);
            form.append("is_achieved", is_achieved);
            fetch("/goal_change_status/", {
               method : "POST",
               body : form,
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status == 201){
                    if (res.is_achieved === "yes") {
                        element.setAttribute("data-is_achieved", "yes");
                    } else {
                        element.setAttribute("data-is_achieved", "no");
                    }
                    location.reload();
                }
            })
            .catch(function(res) {
                alert("Some Error");
            });
        } else {
            // Do nothing!
                return false;
            }
        });
    }
})