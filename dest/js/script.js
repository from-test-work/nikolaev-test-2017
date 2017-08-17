'use strict';

(function (e) {
    // Polifill Closest
    e.closest = e.closest || function (css) {
        var node = this;
        while (node) {
            if (node.matches(css)) return node;else node = node.parentElement;
        }
        return null;
    };
    // Polifill Matches
    e.matches || (e.matches = e.matchesSelector || function (selector) {
        var matches = document.querySelectorAll(selector),
            th = this;
        return Array.prototype.some.call(matches, function (e) {
            return e === th;
        });
    });
})(Element.prototype);

var currentYear = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {

    //Banner init
    carouselInit('testimonials-carousel');
    partner('partner-carousel');
    //Accordion init
    accordion('.accordion');

    /*
    * @function    Fancybox
    * @Components
    */
    $(".fancybox").fancybox({
        openEffect: 'fade', /* none, fade, elastic */
        closeEffect: 'fade',
        openSpeed: 300, /* ms, "slow", "normal", "fast"*/
        closeSpeed: 300,
        /* mouseWheel : false,*/
        helpers: {
            /*title : null */
            title: {
                type: 'inside' /* 'float', 'inside', 'outside', 'over', 'null' */
            }
        }
    });
    /*
    * @function    Copyright Year
    * @Components
    */
    $(".copyright-year").text(currentYear);

    /*
    * @function   Scroll to Top
    * @Components
    */
    $('#page').scroll(function () {
        if ($(this).scrollTop() >= 350) {
            $('#return-to-top').fadeIn(200);
        } else {
            $('#return-to-top').fadeOut(200);
        }
    });
    $('#return-to-top').click(function (e) {
        e.preventDefault();
        $('#page').animate({
            scrollTop: 0
        }, 500);
    });

    window.onload = function () {
        // GMap
        // initMap();
        mmenu();
    };
});

window.addEventListener('load', function (event) {});

window.addEventListener('resize', function (event) {});

/*
  Slidemenu
*/
function mmenu() {
    var $body = document.body,
        $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
            $body.className = $body.className == 'menu-active' ? '' : 'menu-active';
        });
    }
}

/*
 * @function    Carousel Swiper
 * @Components
 */

function carouselInit(id) {
    if (document.getElementById(id)) {
        var swiper = new Swiper('#' + id, {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            parallax: true,
            slidesPerView: 1,
            loop: true,
            spaceBetween: 30,
            autoplay: 5000,
            speed: 600,
            effect: 'slide'
        });
    }
}

function partner(id) {
    if (document.getElementById(id)) {
        var swiper = new Swiper('#' + id, {
            slidesPerView: 3,
            parallax: true,
            loop: true,
            spaceBetween: 30,
            autoplay: 5000,
            speed: 600,
            effect: 'slide',
            breakpoints: {
                // when window width is <= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window width is <= 480px
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is <= 640px
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }
}

/*
 * @function    Toggle Menu
 * @Components
 */

/*
 * @function    Accordion
 * @Components
 */
function accordion(selector) {
    if (document.querySelectorAll(selector)) {
        var elems = document.querySelectorAll(selector);
        elems = Array.prototype.slice.call(elems);
        [].forEach.call(elems, function (elem) {

            elem.onclick = function (e) {
                e.preventDefault();
                var target = e.target;
                var accordionItem = target.closest('.accordion__item');
                var accordionIcons = function accordionIcons() {
                    var _this = target;
                    var realTarget = void 0;
                    var name = target.className;
                    if (name.indexOf('material-icons') == -1) {
                        realTarget = target.querySelector('.material-icons');
                        return realTarget;
                    } else {
                        realTarget = _this;
                        return realTarget;
                    }
                };
                if (target.className.indexOf('accordion__cnt') == -1) {
                    if (accordionItem.className.indexOf('accordion__item--opened') == -1) {
                        [].forEach.call(document.querySelectorAll('.accordion .accordion__item'), function (el) {
                            el.classList.remove("accordion__item--opened");
                            el.querySelector('.accordion__icons i').innerHTML = 'add';
                        });
                        accordionItem.className += " accordion__item--opened";
                        accordionIcons().innerHTML = 'remove';
                    } else {
                        accordionItem.className = accordionItem.className.replace(" accordion__item--opened", "");
                        accordionIcons().innerHTML = 'add';
                    }
                } else {
                    e.stopPropagation();
                    return 0;
                }
            };
        });
    }
}

/*
 * @function    HTML 5 video + YouTube src
 * @Components
 */

/*
 * @function    Google Map
 * @Components
 */
function initMap() {
    var center = { lat: 46.976387, lng: 31.998539 };
    var defs = {
        marker: {
            basic: 'images/map-point.png',
            active: 'images/gmap_marker_active.png'
        }
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center,
        styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#000000"
            }, {
                "lightness": 40
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 17
            }]
        }]
    });
    var marker = new google.maps.Marker({
        position: center,
        icon: defs.marker.basic,
        map: map,
        animation: google.maps.Animation.DROP

    });
    marker.addListener('click', toggleBounce);

    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}
//# sourceMappingURL=script.js.map
