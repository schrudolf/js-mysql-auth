// fadeOut Alerts
$(".alert").ready(function() {
    $( "div.alert" )
    .fadeIn(300)
    .delay(5000)
    .fadeOut(1000);
});

$('.leftnav').on('click','li',function(){
    $('.leftnav li.active').removeClass('active');
    $(this).addClass('active');
})