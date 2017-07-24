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


(function() {
    //---- Custom JS functiona ities ----//
    'use strict';

    //---- Module - Trig ger ----//
    var trigger = {

        // Some defaults
        triggerElement: $('.js-trigger'),
        triggerDataName: 'trigger-element',
        triggerActiveClass: 'is-active ',
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

            scrollToAnchor.listContainer.each(function(i, element) {

                // Find links
                var link = $(element).find('a');

                // Loop through every link in set and do stuff :D
                link.each(function(index, singleLink) {

                    var type = 'scroll';

                    // Disable module if we have a class on element
                    if ($(singleLink).hasClass('js-anchor--disable')) {
                        type = 'disabled';
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
                if ($(this).data('scroll-offset')) {
                    offset = $(this).data('scroll-offset');
                }

                // If has
                if ($(element).data('scroll-target')) {
                    target = $(element).data('scroll-target');
                }

                // If not
                if (!$(element).data('scroll-target')) {
                    target = $(element).attr('href');
                }

                if (type === 'scroll') {

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

        var selectProgressBar = $('[data-current-id="' + id + '"]'),
            findProgressBar = selectProgressBar.find('.progress'),
            findProgressLine = findProgressBar.find('.progress__line'),
            checkProgressWidth = findProgressBar.width();
        var progressTotle = getPercent * checkProgressWidth;
        var animateionLength = timing;


        findProgressLine.stop().animate({
            left: progressTotle
        }, animateionLength);
    }

    //---- Module - Multiple Owl Carousels ----//
    var carousels = {
        carouselsSelector: $('[data-slider]'),

        init: function() {

            // Lopp through carousels
            carousels.carouselsSelector.each(function() {

                // Get carousel name
                var carouselName = $(this).attr('data-slider');
                var owl = $(this);


                if (carouselName === 'home') {

                    owl.on('initialized.owl.carousel', function(event) {
                        console.log(event.item.index);
                        moveProgressBar(event.item.index, 80000);
                    });

                }

                // Enable looped carousel with customized or default settings
                owl.owlCarousel(carousels.carouselOptions(carouselName));


                if (carouselName === 'home') {

                    owl.on('change.owl.carousel', function(e) {
                        if (!e.namespace || e.property.name !== 'position') return;

                        var carousel = e.relatedTarget,
                            before = carousel.relative(carousel.normalize(carousel.current(), false)),
                            after = carousel.relative(carousel.normalize(e.property.value, false));

                        if (before > after) {
                            moveProgressBar(e.item.index + 1, 80000);
                        }
                        if (before < after) {
                            moveProgressBar(e.item.index + 1, 80000);
                        }
                    });

                }

            });

        },

        carouselOptions: function(carouselName) {

            // Set var
            var carouselSettings;

            // Switch for settongs
            switch (carouselName) {

                case 'home':
                    carouselSettings = {
                        items: 1,
                        autoplay: true,
                        mouseDrag: false
                    };
                    break;

                case 'trending-products':
                    carouselSettings = {
                        items: 1,
                    };
                    break;

                case 'blog':
                    carouselSettings = {
                        items: 1,
                        margin: 30,
                        dots: false,
                        nav: true,
                        loop: true,
                        responsive: {
                            768: {
                                items: 2,
                            }
                        }
                    };
                    break;

                default:
                    carouselSettings = {
                        items: 1,
                    };

            }

            // Return settings for each carousel
            return carouselSettings;

        }
    };
    //---- Module - END ----//

    //---- Modules - INIT ----//
    carousels.init();
    scrollToAnchor.init();

    function triggerMap() {

        $('.map__close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('block');
            $('.map, .map__overlay.js-trigger').removeClass('map--active');
            $('.map, .map__overlay.js-trigger').addClass('is-inactive');
        });
        trigger.triggerActiveClass = 'map--active';
        trigger.init();
    }
    triggerMap();


    function checkTop() {

        var mainHeader = $('#main-header'),
            colorClass = 'header--active';

        if (document.body.scrollTop !== 0) {
            mainHeader.addClass(colorClass);
        }
        if (document.body.scrollTop === 0 && !$('#main-header .navigation').hasClass('is-active')) {
            mainHeader.removeClass(colorClass);
        }

    }

    checkTop();
    $(document).scroll(function() {
        checkTop();
    });

    function isScrolledIntoView(el) {
        const elemTop = el.getBoundingClientRect().top;
        const elemBottom = el.getBoundingClientRect().bottom;

        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

    var userScrolled = false;
    var counted = false;

    $(window).scroll(function() {
        userScrolled = true;
    });

    function check_section_on_scroll(el) {
        'use strict';

        if (isScrolledIntoView(el) && counted === false) {
            console.log('scroll');
            $('[data-countTo]').each(function() {
                var final = $(this).attr('data-countTo');
                $(this).countTo({
                    from: 0,
                    to: final,
                    speed: 2000
                });

                counted = true;

            })


        };

    }

    setInterval(function() {
        'use strict';
        var numbers = document.getElementById('numbers');
        if (userScrolled) {
            check_section_on_scroll(numbers);
            userScrolled = false;
        }
    }, 50);





}());
