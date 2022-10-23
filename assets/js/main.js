$(document).ready(function () {

    // preloader 
    // window.onload = function () {
    //     document.getElementById('preloader').style.display = "none";
    // }

    // sticky Nav 
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 20) {
            $("#navbar").addClass("sticky");
        } else {
            $("#navbar").removeClass("sticky");
        }
    });

})

