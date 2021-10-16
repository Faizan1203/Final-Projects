document.addEventListener('DOMContentLoaded', function() {

    var start = document.getElementById("start");
    var reset =document.getElementById("reset");
    const promodoro = document.getElementById("promodoro");
    document.querySelector('#expired').style.display = 'none';

    var h = document.getElementById("hour");
    var m = document.getElementById("minute");
    var s = document.getElementById("second");


    var startTimer = null;

    function timer(){
        if(h.value == 0 && s.value == 0 && m.value == 0){
            h.value = 0;
            m.value = 0;
            s.value = 0;
            document.querySelector('#expired').style.display = 'block';

        } else if(s.value != 0) {
            s.value--;
        } else if(m.value != 0 && s.value == 0) {
            s.value = 59;
            m.value--;
        } else  if(m.value == 0 && s.value == 0 && h.value != 0) {
            m.value = 59;
            s.value = 59;
            h.value--;
        }
    }

    function stopTimer(){
        clearInterval(startTimer);
    }

    function startInterval(){
            startTimer = setInterval(()=>{
                timer();
            }, 1000);
        }

    start.addEventListener("click", ()=>{
        startInterval();
    });


    reset.addEventListener("click", ()=>{
        h.value = 0;
        m.value = 0;
        s.value = 0;
        document.querySelector('#expired').style.display = 'none';
        stopTimer();
    });

    promodoro.addEventListener("click", ()=>{
        m.value = 25;
        s.value = 0;
        h.value = 0;
        startInterval();
    });
})