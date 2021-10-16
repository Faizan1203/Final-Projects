document.addEventListener('DOMContentLoaded', function() {
    del_btn = document.querySelectorAll("#delete-room-btn");
    del_btn.forEach((element) => {
        room_deleter(element);
    });

    function room_deleter(element) {
        element.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this room?")) {
            // Do the thing!
            id = element.getAttribute("data-id");
            form = new FormData();
            form.append("id", id);
            fetch("/room_delete/", {
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