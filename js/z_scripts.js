var defaultMapsStyle = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e9e9e9"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dedede"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#333333"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f2f2f2"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#fefefe"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    }
];

var map = null;

function initMap() {
    var uluru = {
        lat: 53.2865,
        lng: 10.7335
    };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: uluru,
        styles: defaultMapsStyle,
        disableDefaultUi: false
    });


}

//---- Custom JS functionalities ----//
'use strict';

(function() {

    //---- Module - Trigger ----//
    var trigger = {

        // Some defaults
        triggerElement: $('.js-trigger'),
        triggerDataName: 'trigger-element',
        triggerActiveClass: 'is-active',
        triggerInActiveClass: 'is-inactive',

        init: function() {

            // We want every button to work on their own
            trigger.triggerElement.each(function(i, element) {

                // Add class if not exists
                trigger.checkClass(element);

                // Button on click
                trigger.clickEvent(element);

            });

        },

        action: function(target) {

            // Get element to trigger
            var triggered = $(target).data(trigger.triggerDataName);
            var closest = $(target).closest(triggered);


            // If target is not active
            if ($(target).hasClass(trigger.triggerInActiveClass)) {

                                $('body').addClass('block');
                // Remove is-inactive class and add is-active class on button
                $(target).removeClass(trigger.triggerInActiveClass);
                $(target).addClass(trigger.triggerActiveClass);

                // Check if we should look only for closest element
                if ($(target).data('trigger-closest')) {
                    // Remove is-inactive class and add is-active class on element from data attr
                    $(closest).removeClass(trigger.triggerInActiveClass);
                    $(closest).addClass(trigger.triggerActiveClass);
                } else {
                    // Remove is-inactive class and add is-active class on element from data attr
                    $(triggered).removeClass(trigger.triggerInActiveClass);
                    $(triggered).addClass(trigger.triggerActiveClass);
                }

            } else {

                // Remove is-active class and add is-inactive class on button
                $(target).addClass(trigger.triggerInActiveClass);
                $(target).removeClass(trigger.triggerActiveClass);
                $('body').removeClass('block');

                // Check if we should look only for closest element
                if ($(target).data('trigger-closest')) {
                    // Remove is-active class and add is-inactive class on element from data attr
                    $(closest).addClass(trigger.triggerInActiveClass);
                    $(closest).removeClass(trigger.triggerActiveClass);
                } else {
                    // Remove is-active class and add is-inactive class on element from data attr
                    $(triggered).addClass(trigger.triggerInActiveClass);
                    $(triggered).removeClass(trigger.triggerActiveClass);
                }

            }

        },

        checkClass: function(target) {

            // Get element to trigger
            var triggered = $(target).data(trigger.triggerDataName);

            // If is-inactive isn't set, but we have init on element
            if (!$(target).hasClass(trigger.triggerInActiveClass)) {

                // Add is-inactive class to button
                $(target).addClass(trigger.triggerInActiveClass);

                // Add is-inactive class to trigger
                $(triggered).addClass(trigger.triggerInActiveClass);

            }

        },

        clickEvent: function(element) {

            // Click with element from init function
            $(element).on('click', function(e) {

                // Prevent default link behaviour
                e.preventDefault();


                // Call action with that element
                trigger.action(element);
            });

        }

    };
    //---- Module - End ----//

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

    function moveProgressBar(id, timing) {

        var getPercent = 100;

        var select_progress_bar = $('[data-current-id="'+ id +'"]'),
        find_progress_bar = select_progress_bar.find('.progress'),
        find_progress_line = find_progress_bar.find('.progress__line'),
        check_progress_width = find_progress_bar.width();
        var progress_total = getPercent * check_progress_width;
        var animation_length = timing;


        find_progress_line.stop().animate({
            left: progress_total
        }, animation_length);
    };

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
                        console.log(event.item.index);
                        moveProgressBar(event.item.index, 80000);
                    });

                }

                // Enable looped carousel with customized or default settings
                owl.owlCarousel(carousels.carousels_options(carousel_name));


                if(carousel_name == 'home') {

                    owl.on('change.owl.carousel', function (e) {
                        if (!e.namespace || e.property.name != 'position') return;

                        var carousel = e.relatedTarget

                        before = carousel.relative(carousel.normalize(carousel.current(), false))
                        after = carousel.relative(carousel.normalize(e.property.value, false))
                        change = true

                        if(before > after) {
                            moveProgressBar(e.item.index + 1, 80000);
                        }
                        if(before < after) {
                            moveProgressBar(e.item.index + 1, 80000);
                        }
                    })

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
                    autoplay: true,
                    mouseDrag: false
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

    function triggerMap() {

        $('.map__close').on("click", function(e){
            e.preventDefault();
            $('body').removeClass('block');
            $('.map, .map__overlay.js-trigger').removeClass('map--active');
            $('.map, .map__overlay.js-trigger').addClass('is-inactive');
        });
        trigger.triggerActiveClass = 'map--active';
        trigger.init();
    };
    triggerMap();


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
