//---- Custom JS functionalities ----//
'use strict';

(function() {

    //---- Module - Scroll to anchor ----//
    var scrollToAnchor = {
        listContainer: $('[data-scroll-to-anchor]'),

        init: function() {

            scrollToAnchor.listContainer.each( function(i,element) {

                // Find links
                var link = $(element).find('a');

                // Loop through every link in set and do stuff :D
                link.each( function(index,singleLink) {

                    var type = "scroll";

                    // Disable module if we have a class on element
                    if ($(singleLink).hasClass('js-anchor--disable')) {
                        type = "disabled";
                    }

                    scrollToAnchor.clickEvent(singleLink, type);

                });

            });

        },

        clickEvent: function(element, type) {

            // Click with element from init function
            $(element).on('click', function(e) {
                var target,
                    offset = 0;

                // Set offset if specified
                if($(this).data('scroll-offset')) {
                    offset = $(this).data('scroll-offset');
                }

                // If has
                if($(element).data('scroll-target')) {
                    target = $(element).data('scroll-target');
                }

                // If not
                if(!$(element).data('scroll-target')) {
                    target = $(element).attr('href');
                }

                if (type == 'scroll') {

                    // Prevent default link behaviour
                    e.preventDefault();

                    // Call action with that element
                    scrollToAnchor.animate(offset, target);

                }

            });

        },

        animate: function(offset, target) {

            $('html, body').animate({
                    scrollTop: $(target).offset().top - offset
            }, 500);

        }

    };
    //---- Module - END ----//


    //---- Module - Multiple Owl Carousels ----//
    var carousels = {
        carousels_selector: $('[data-slider]'),

        init: function() {

            // Lopp through carousels
            carousels.carousels_selector.each( function() {

                // Get carousel name
                var carousel_name = $(this).attr('data-slider');
                var owl = $(this);


                                if(carousel_name == 'home') {

                                    owl.on('initialized.owl.carousel', function(event) {
                                        console.log(event);
                                    });

                                }

                // Enable looped carousel with customized or default settings
                owl.owlCarousel(carousels.carousels_options(carousel_name));


                if(carousel_name == 'home') {

                    owl.on('change.owl.carousel', function(event) {
                        console.log(event);
                    });

                }

            });

        },

        carousels_options: function(carousel_name){

            // Set var
            var carousel_settings;

            // Switch for settongs
            switch (carousel_name) {

                case 'home':
                    carousel_settings = {
                        items: 1,
                        autoplay: true
                    };
                    break;

                case 'trending-products':
                    carousel_settings = {
                        items: 1,
                    };
                    break;

                case 'blog':
                    carousel_settings = {
                        items: 1,
                        margin: 30,
                        dots: false,
                        nav: true,
                        loop: true,
                        responsive : {
                            768 : {
                                items: 2,
                            }
                        }
                    };
                    break;

                default:
                    carousel_settings = {
                        items: 1,
                    };

            }

            // Return settings for each carousel
            return carousel_settings;

        }
    };
    //---- Module - END ----//

    //---- Modules - INIT ----//
    carousels.init();
    scrollToAnchor.init();

    //---- Modules - INIT END ----//
    //
    // $('input').on('input', function() {
    //     $(this).toggleClass('has-value')
    // });
    //
    // $('#hamburger-menu').click(function(){
    //     $(this).toggleClass('is-active');
    //     $('#main-header .m-navigation').toggleClass('is-active');
    //     $('#main-header').addClass('l-header--color');
    //     if (document.body.scrollTop === 0 && !$('#main-header .m-navigation').hasClass('is-active')) {
    //         $('#main-header').removeClass('l-header--color');
    //     }
    // });
    //
    function checkTop() {

        var main_header = $('#main-header'),
            color_class = 'header--active';

        if (document.body.scrollTop !== 0) {
            main_header.addClass(color_class)
        }
        if (document.body.scrollTop === 0 && !$('#main-header .navigation').hasClass('is-active')) {
            main_header.removeClass(color_class)
        }

    };

    checkTop();
    $(document).scroll(function(){
        checkTop();
    });

}())
