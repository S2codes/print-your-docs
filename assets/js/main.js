$(document).ready(function () {

    // preloader 
    window.onload = function () {
        document.getElementById('preloader').style.display = "none";
    }

    // sticky Nav 
    console.log('qry');
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if (scroll > 20) {
            $("#navbar").addClass("sticky");
        } else {
            $("#navbar").removeClass("sticky");
        }
    });

})