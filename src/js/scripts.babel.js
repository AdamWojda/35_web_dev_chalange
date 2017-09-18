const defaultMapsStyle = [
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                color: "#e9e9e9",
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                color: "#f5f5f5",
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                color: "#ffffff",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                color: "#f5f5f5",
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
            {
                color: "#dedede",
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [
            {
                visibility: "on",
            },
            {
                color: "#ffffff",
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        elementType: "labels.text.fill",
        stylers: [
            {
                saturation: 36,
            },
            {
                color: "#333333",
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        elementType: "labels.icon",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                color: "#f2f2f2",
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.fill",
        stylers: [
            {
                color: "#fefefe",
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [
            {
                color: "#fefefe",
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
];

function initMap() {

    const position = {
              lat: 53.2865,
              lng: 10.7335,
          };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: position,
        styles: defaultMapsStyle,
        disableDefaultUi: false,
    });
}


(function () {


    // ---- Module - Trigger ---- //
    const trigger = {

        // Some defaults
        triggerElement: $('.js-trigger'),
        triggerDataName: 'trigger-element',
        triggerActiveClass: 'is-active ',
        triggerInActiveClass: 'is-inactive',

        init() {

            // We want every button to work on their own
            trigger.triggerElement.each((i, element) => {

                // Add class if not exists
                trigger.checkClass(element);

                // Button on click
                trigger.clickEvent(element);

            });

        },

        action(target) {

            // Get element to trigger
            const triggered = $(target).data(trigger.triggerDataName);
            const closest = $(target).closest(triggered);


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

        checkClass(target) {

            // Get element to trigger
            const triggered = $(target).data(trigger.triggerDataName);

            // If is-inactive isn't set, but we have init on element
            if (!$(target).hasClass(trigger.triggerInActiveClass)) {

                // Add is-inactive class to button
                $(target).addClass(trigger.triggerInActiveClass);

                // Add is-inactive class to trigger
                $(triggered).addClass(trigger.triggerInActiveClass);

            }

        },

        clickEvent(element) {

            // Click with element from init function
            $(element).on('click', (e) => {

                // Prevent default link behaviour
                e.preventDefault();


                // Call action with that element
                trigger.action(element);
            });

        },

    };
    // ---- Module - End ---- //

    // ---- Module - Scroll to anchor ---- //
    const scrollToAnchor = {
        listContainer: $('[data-scroll-to-anchor]'),

        init() {

            scrollToAnchor.listContainer.each((i, element) => {

                // Find links
                const link = $(element).find('a');

                // Loop through every link in set and do stuff :D
                link.each((index, singleLink) => {

                    let type = 'scroll';

                    // Disable module if we have a class on element
                    if ($(singleLink).hasClass('js-anchor--disable')) {
                        type = 'disabled';
                    }

                    scrollToAnchor.clickEvent(singleLink, type);

                });

            });

        },

        clickEvent(element, type) {

            // Click with element from init function
            $(element).on('click', function (e) {
                let target;
                let offset = 0;

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

        animate(offset, target) {

            $('html, body').animate({
                scrollTop: $(target).offset().top - offset,
            }, 500);

        },

    };
    // ---- Module - END ---- //

    function moveProgressBar(id, timing) {

        const getPercent = 100;
        const selectProgressBar = $(`[data-current-id="${id}`);
        const findProgressBar = selectProgressBar.find('.progress');
        const findProgressLine = findProgressBar.find('.progress__line');
        const checkProgressWidth = findProgressBar.width();
        const progressTotle = getPercent * checkProgressWidth;
        const animateionLength = timing;


        findProgressLine.stop().animate({
            left: progressTotle,
        }, animateionLength);
    }

    // ---- Module - Multiple Owl Carousels ---- //
    const carousels = {
        carouselsSelector: $('[data-slider]'),

        init() {

            // Lopp through carousels
            carousels.carouselsSelector.each(function () {

                // Get carousel name
                const carouselName = $(this).attr('data-slider');
                const owl = $(this);


                if (carouselName === 'home') {

                    owl.on('initialized.owl.carousel', (event) => {
                        // console.log(event.item.index);
                        moveProgressBar(event.item.index, 80000);
                    });

                }

                // Enable looped carousel with customized or default settings
                owl.owlCarousel(carousels.carouselOptions(carouselName));


                if (carouselName === 'home') {

                    owl.on('change.owl.carousel', (e) => {
                        if (!e.namespace || e.property.name !== 'position') return;

                        const carousel = e.relatedTarget;
                        const before = carousel.relative(
                            carousel.normalize(carousel.current(), false),
                        );
                        const after = carousel.relative(
                            carousel.normalize(e.property.value, false),
                        );

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

        carouselOptions(carouselName) {

            // Set var
            let carouselSettings;

            // Switch for settongs
            switch (carouselName) {

                case 'home':
                    carouselSettings = {
                        items: 1,
                        autoplay: true,
                        mouseDrag: false,
                    };
                    break;

                case 'trending-products':
                    carouselSettings = {
                        items: 1,
                    };
                    break;

                case 'quote':
                    carouselSettings = {
                        items: 1,
                        nav: true,
                        loop: true,
                        dots: false,
                        navText: ['<svg class="svg svg--arrowcarousel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svg/all-sprite.svg#down"></use></svg>','<svg class="svg svg--arrowcarousel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svg/all-sprite.svg#down"></use></svg>']
                    };
                    break;

                case 'quoteImage':
                    carouselSettings = {
                        items: 1,
                        nav: true,
                        loop: true,
                        dots: false,
                        navText: ['<svg class="svg svg--arrowcarousel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svg/all-sprite.svg#down"></use></svg>','<svg class="svg svg--arrowcarousel"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/svg/all-sprite.svg#down"></use></svg>']

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
                            },
                        },
                    };
                    break;

                default:
                    carouselSettings = {
                        items: 1,
                    };

            }

            // Return settings for each carousel
            return carouselSettings;

        },
    };
    // ---- Module - END ---- //

    // ---- Modules - INIT ---- //
    carousels.init();
    scrollToAnchor.init();

    // find element
    $owl = $('body').find('[data-slider="testimonals"]');

    // set the owl-carousel otions
    var carousel_Settings = {
      touchDrag: false,
      mouseDrag: false
    };

    function initialize(){
      var containerWidth = window.innerWidth;
      if(containerWidth <= 700) {
        // initialize owl-carousel if window screensize is less the 767px
        $owl.owlCarousel( carousel_Settings );
      } else {
        // destroy owl-carousel and remove all depending classes if window screensize is bigger then 767px
        $owl.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        $owl.find('.owl-stage-outer').children().unwrap();
      }
    }

    // initilize after window resize
    var id;
    $(window).resize( function() {
      clearTimeout(id);
      id = setTimeout(initialize, 500);
    });

    // initilize onload
    initialize();

    function tabs(e) {

        // Content list
        const tabsListEl = document.getElementsByClassName('tabs__list__element');
        const tabsListElCurr = this.getAttribute('data-contenttab');
        const tabsListElCurrClass = 'tabs__list__element--collapsed';

        // Images list
        const tabsImagesEl = document.getElementsByClassName('tabs__images__element');
        const tabsImagesElName = '.tabs__images__element';
        const tabsImagesElCurr = tabsImagesElName.concat('[data-imagetab="', tabsListElCurr, '"]');
        const tabsImagesElCurrClass = 'tabs__images__element--active';
        const tabsImagesElCurrElem = document.querySelectorAll(tabsImagesElCurr);

        // Loop through images list elements
        for (let i = 0; i < tabsImagesEl.length; i += 1) {
            let thisItem = tabsImagesEl[i];

            // Remove current class form all elements
            thisItem.classList.remove(tabsImagesElCurrClass);

            // Add class to current image - based on clicked list element data attr
            tabsImagesElCurrElem[0].classList.add(tabsImagesElCurrClass);
        }

        // Loop through content list elements
        for (let i = 0; i < tabsListEl.length; i += 1) {
            let thisItem = tabsListEl[i];

            // Add class to all elements
            thisItem.classList.add(tabsListElCurrClass);

            // Remove current class form element
            this.classList.remove(tabsListElCurrClass);

        }
    }

    // Loop through content list elements
    const tabsListEl = document.getElementsByClassName('tabs__list__element');

    for (let i = 0; i < tabsListEl.length; i += 1) {

        // Current item
        let thisItem = tabsListEl[i];

        // Invoke click function
        thisItem.addEventListener('click', tabs);
    }



    function triggerMap() {

        $('.map__close').on('click', (e) => {
            e.preventDefault();
            $('body').removeClass('block');
            $('.map, .map__overlay.js-trigger').removeClass('map--active');
            $('.map, .map__overlay.js-trigger').addClass('is-inactive');
        });
        trigger.triggerActiveClass = 'map--active';
        trigger.init();
    }
    triggerMap();

    // ---- Module - Add class to header on scroll ---- //

    const assignClassToHeader = () => {

        const mainHeader = document.getElementById('main-header');
        const mainHeaderNav = document.getElementById('main-navigation');
        const activeClass = 'header--active';

        // Check for scrolling
        if (document.body.scrollTop !== 0) {
            mainHeader.classList.add(activeClass);
        }

        // If scrolled to top - remove class
        if (document.body.scrollTop === 0 && !mainHeaderNav.classList.contains('is-active')) {
            mainHeader.classList.remove(activeClass);
        }

    }

    assignClassToHeader;
    window.addEventListener('scroll', assignClassToHeader);

    // ---- Module - END ---- //

    let userScrolled = false;
    let counted = false;

    function isScrolledIntoView(el) {
        const elemTop = el.getBoundingClientRect().top;
        const elemBottom = el.getBoundingClientRect().bottom;

        const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        return isVisible;
    }

    function checkSectionOnScroll(element) {

        if (isScrolledIntoView(element) && counted === false) {

            $('[data-countTo]').each(function () {

                const final = $(this).attr('data-countTo');

                $(this).countTo({
                    from: 0,
                    to: final,
                    speed: 2000,
                });

                counted = true;

            });


        }

    }

    $(window).scroll(() => {
        userScrolled = true;
    });

    setInterval(() => {

        const numbers = document.getElementById('numbers');

        if (userScrolled) {
            checkSectionOnScroll(numbers);
            userScrolled = false;
        }

    }, 50);

    const openCloseMenu = function() {
        const $mainHeader = $('#main-header');
        const $this = $(this);

        if(!$mainHeader.hasClass('header--open')) {
            $mainHeader.addClass('header--open');
            $this.addClass('is-active');
        } else {
            $mainHeader.removeClass('header--open');
            $this.removeClass('is-active');
        }

        if(!$mainHeader.hasClass('header--active') ){
            $mainHeader.addClass('header--active');
        }
    };

    $('#hamburger-menu').click(openCloseMenu)


}());
