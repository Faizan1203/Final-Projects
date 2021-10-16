document.addEventListener('DOMContentLoaded', function() {
    del_btn = document.querySelectorAll("#delete-goal-btn");
    del_btn.forEach((element) => {
        goal_deleter(element);
    });

    function goal_deleter(element) {
        element.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this goal?")) {
            // Do the thing!
            id = element.getAttribute("data-id");
            form = new FormData();
            form.append("id", id);
            fetch("/goal_delete/", {
               method : "POST",
               body : form,
            })
            .then((res) => res.json())
            .then((res) => {
                if (res.status == 201){

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