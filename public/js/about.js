$(window).scroll(function(){
  var scroll = $(window).scrollTop();
  $(document.getElementById("stars")).css({
    width: (100 + scroll/10) + "%",
    height: (100 + scroll/10) + "%"
  });
})
