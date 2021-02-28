$("#filterBtn").click(function() {  
    $("#filterModal").toogle();
});

$('#uploadSection').click(function() {
    $('#uploadFiles').show();
});

$('#ratingSubmit').click(function() {
    if ($('input:radio:checked').length < 1) {
        $('#alertRadio').show();
    } else {
        alert('Success!');
    }
    return false;
});

$(function() {
    $('.custom-control-input').click(function(e) {
        $('.custom-control-input').not(this).prop('checked', false);
    });
});

/*
  //prevent enter to be submit
  $(document).on("keydown", "form", function(event) { 
    return event.key != "Enter";
});*/

/* ToDO List */
$(document).ready(function() {
    $('button').click(function() {
        if ($("input[name=task]").val() !== '')
            $('#todo').append("<ul>" + $("input[name=task]").val() + " <a href='#' class='close' aria-hidden='true'>&times;</a></ul>");
    });
    $("body").on('click', '#todo a', function() {
        $(this).closest("ul").remove();
    });
});

/* Timer Functions */
var mySeconds;
var intervalHandle;

function resetPage() {
    document.getElementById("inputArea").style.display = "none";
}

function tick() {
    var timeDisplay = document.getElementById("time");

    var min = Math.floor(mySeconds / 60);
    var sec = mySeconds - (min * 60);

    if (sec < 10) {
        sec = "0" + sec;
    }

    var message = min.toString() + ":" + sec;

    timeDisplay.innerHTML = message;

    if (mySeconds === 0) {
        alert("Done! Great Job!");
        clearInterval(intervalHandle);
        resetPage();
    }
    mySeconds--;


}

function startCounter() {
    var myInput = document.getElementById("minutes").value;
    if (isNaN(myInput)) {
        alert("Type a valid number please");
        return;
    }
    mySeconds = myInput * 60;

    intervalHandle = setInterval(tick, 1000);

    document.getElementById("inputArea").style.display = "none";


}


window.onload = function() {
    var myInput = document.createElement("input");
    myInput.setAttribute("type", "text");
    myInput.setAttribute("style", "display:table-cell; width:75%");
    myInput.setAttribute("id", "minutes");

    var myButton = document.createElement("input");
    myButton.setAttribute("type", "button");
    myButton.setAttribute("value", "Start Timer");

    myButton.onclick = function() {
        startCounter();

    }
    document.getElementById("inputArea").appendChild(myInput);
    document.getElementById("inputArea").appendChild(myButton);


}