// Preloader
$(document).ready(function () {

  setTimeout(function () {
    $('body').addClass('loaded');
    $('h1').css('color', '#222222');
  }, 2500);

});

// Typed.js
if ($('.santuelement').length) {
  var typed = new Typed('.santuelement', {
    strings: ["Aspiring Software Engineer","Full Stack Developer","AI Explorer","Problem Solver","Tech Innovator"],
    typeSpeed: 100,
    loop: true,
    backDelay: 1100,
    backSpeed: 30
  });
}

(function ($) {
  "use strict";

  // Navigation click scroll
  $(document).on('click', '.nav-menu a, .mobile-nav a', function (e) {

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {

      var hash = this.hash;
      var target = $(hash);

      if (target.length) {
        e.preventDefault();

        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $('html, body').animate({ scrollTop: 0 }, 350);
          return;
        }

        $('#header').addClass('header-top');

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        $('html, body').animate({
          scrollTop: target.offset().top - 80
        }, 350);

        return false;
      }
    }
  });

  // Initial hash load
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav')
        .find('a[href="' + initial_nav + '"]')
        .parent('li').addClass('active');
    }
  }

  // Mobile Nav
  if ($('.nav-menu').length) {

    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });

    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function () {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  }

  // Counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 3,
    time: 1000
  });

  // Skills progress
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      900: { items: 3 }
    }
  });

  // Portfolio filter
  $(window).on('load', function () {

    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Venobox
  $('.venobox').venobox({
    share: false
  });

  // Portfolio details
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);



