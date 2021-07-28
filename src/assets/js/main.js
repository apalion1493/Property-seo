import './config/jqueryLoad';
import 'bootstrap/dist/js/bootstrap.min';
import 'popper.js/dist/popper.min';
import 'owl.carousel/dist/owl.carousel';
// import 'slick-carousel/slick/slick.min';
// import 'libs/scrollspy';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import ScrollMagic from 'scrollmagic/scrollmagic/uncompressed/ScrollMagic';
import Wow from 'wow.js';
const wow = new Wow();
wow.init();

$(document).ready(function(){
    $(".anchor--link").on("click", function () {
        event.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 3000);
    });

    $('#burger').click(function () {
        $('.menu-modal').addClass('active');
        $('#app').addClass('active');
        $('body').addClass('active');
    });

    $('#main-menu-close').click(function () {
        $('.menu-modal').removeClass('active');
        $('#app').removeClass('active');
        $('body').removeClass('active');
    });

    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();

    $('.owl-carousel').owlCarousel({
        margin:27,
        loop:false,
        autoWidth:true,
        items:3
    });

});

var controller = new ScrollMagic.Controller();
//
var scene1 = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 900, triggerHook: 0.1,})
    .setPin("#scroll-topics__content")
    // .addIndicators({name: "1"})
    .setClassToggle(".scroll-topics__leftBlock-1", "active")
    .addTo(controller);

var scene2 = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: 900, triggerHook: 0.01})
    .setPin("#scroll-topics__content2")
    // .addIndicators({name: "2"})
    .setClassToggle(".scroll-topics__leftBlock-2", "active")
    .addTo(controller);

var scene3 = new ScrollMagic.Scene({triggerElement: "#trigger3", duration: 900, triggerHook: 0.1,})
    .setPin("#scroll-topics__content3")
    // .addIndicators({name: "3"})
    .setClassToggle(".scroll-topics__leftBlock-3", "active")
    .addTo(controller);

var scene4 = new ScrollMagic.Scene({triggerElement: "#trigger4", duration: 900, triggerHook: 0.03,})
    .setPin("#scroll-topics__content4")
    // .addIndicators({name: "4"})
    .setClassToggle(".scroll-topics__leftBlock-4", "active")
    .addTo(controller);

var scene5 = new ScrollMagic.Scene({triggerElement: "#trigger5", duration: 900, triggerHook: 0.1,})
    .setPin("#scroll-topics__content5")
    // .addIndicators({name: "5"})
    .setClassToggle(".scroll-topics__leftBlock-5", "active")
    .addTo(controller);


let isMobile = false;
$(document).ready( function() {
    if ($('body').width() >= 992) {
        isMobile = true;
    }
    if (isMobile) {
        (function(){
            var a = document.querySelector('#scroll-topics__leftBlock'), b = null, P = 0;
            window.addEventListener('scroll', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            function Ascroll() {
                if (b == null) {
                    var Sa = getComputedStyle(a, ''), s = '';
                    for (var i = 0; i < Sa.length; i++) {
                        if (Sa[i].indexOf('box-sizing') === 0 || Sa[i].indexOf('overflow') === 0 || Sa[i].indexOf('width') === 0 || Sa[i].indexOf('padding') === 0 || Sa[i].indexOf('border') === 0 || Sa[i].indexOf('outline') === 0 || Sa[i].indexOf('box-shadow') === 0 || Sa[i].indexOf('background') === 0) {
                            s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                        }
                    }
                    a.innerHTML = '<div style="'+s+'">'+a.innerHTML+'</div>';
                    b = a.children[0];
                    a.style.height = b.getBoundingClientRect().height + 'px';
                    a.style.padding = '0';
                    a.style.border = '0';
                }
                var Ra = a.getBoundingClientRect(),
                    R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.border-bottom-animation').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
                if ((Ra.top - P) <= 0) {
                    if ((Ra.top - P) <= R) {
                        b.className = 'stop';
                        b.style.top = - R +'px';
                    } else {
                        b.className = 'sticky';
                        b.style.top = P + 'px';
                    }
                } else {
                    b.className = '';
                    b.style.top = '';
                }
            }
        })()
    }
} );


$(document).ready(function () {
    $(function() {
        let blockStatus = true;
        $(window).scroll(function() {
            let target_block = $(".animated .price");
            let scrollEvent = ($(window).scrollTop() > (target_block.position().top - $(window).height()));
            if(scrollEvent && blockStatus) {
                blockStatus = false;
                $({numberValue: 0}).animate({numberValue: 130}, {
                    duration: 1000,
                    easing: "linear",
                    step: function(val) {
                        $(".price").html(Math.ceil(val));
                    }
                });
            }
        });
        
        $('.write-ToUs__form button').click(function (e) {
            var data = $('.write-ToUs__form').serialize();
            $.post(
                'send.php',
                data
            ).done(function (response) {
                $('.write-ToUs__form input, .write-ToUs__form textarea').each(function () {
                    $(this).val('');
                });
                $('.alert-message-sent').removeClass('d-none');
                setTimeout(function () {
                    $('.alert-message-sent').addClass('d-none');
                }, 4000);
            }).fail(function() {
                $('.alert-message-error').removeClass('d-none');
                setTimeout(function () {
                    $('.alert-message-error').addClass('d-none');
                }, 4000);
            });
            e.stopPropagation();
            return false;
        });
    });
});

(function() {

    'use strict';
    let tabs = function(options) {

        let el = document.querySelector(options.el);
        let tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
        let tabContentContainers = el.querySelectorAll(options.tabContentContainers);
        let activeIndex = 0;
        let initCalled = false;

        let init = function() {
            if (!initCalled) {
                initCalled = true;
                el.classList.remove('no-js');

                for (let i = 0; i < tabNavigationLinks.length; i++) {
                    let link = tabNavigationLinks[i];
                    handleClick(link, i);
                }
            }
        };

        let handleClick = function(link, index) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                goToTab(index);
            });
        };


        let goToTab = function(index) {
            if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
                tabNavigationLinks[activeIndex].classList.remove('is-active');
                tabNavigationLinks[index].classList.add('is-active');
                tabContentContainers[activeIndex].classList.remove('is-active');
                tabContentContainers[index].classList.add('is-active');
                activeIndex = index;
            }
        };


        return {
            init: init,
            goToTab: goToTab
        };
    };

    window.tabs = tabs;

})();

let myTabs1 = tabs({
    el: '#tabs1',
    tabNavigationLinks: '.tab-link',
    tabContentContainers: '.tab-content'
});

myTabs1.init();
