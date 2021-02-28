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