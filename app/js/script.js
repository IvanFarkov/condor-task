//Nav

 $("nav div").click(function() {
            $("ul").slideToggle();
            $("ul ul").css("display", "none");
      });

      $('ul li').click(function () {
 $(this).siblings().find('ul').slideUp();
 $(this).find('ul').slideToggle();
});

      $(window).resize(function() {
            if($(window).width() > 768) {
                  $("ul").removeAttr('style');
            }
      });





//Slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

//Logo gap
if($('body').width() < 768){
    $('#nav').addClass('col-12');
}

else{
    $('#nav').addClass('col-11');
}