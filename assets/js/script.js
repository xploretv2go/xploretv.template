;(function($) {
    "use strict";

    window.addEventListener("load", function(){
        // Navigable elements are initialized in _functions/section_X.php
        // Initialize.
        SpatialNavigation.init();

        // Make the *currently existing* navigable elements focusable.
        SpatialNavigation.makeFocusable();

        // Focus the first focusable element of the section in viewport.
        SpatialNavigation.pause();

        var visibleSection = $('#section_0');
        $('section').each(function(index, value) {
            if ($(this).offset().top > $(window).scrollTop()) {
                visibleSection = $(this);
                return false;
            }
        });

        var searchString = '#' + visibleSection.attr('id') + ' .focusable:first';
        var waitForSpatialNavigation = setInterval(function(){
            if (SpatialNavigation.focus(searchString) === true) {
                clearInterval(waitForSpatialNavigation);
            }
        });
        SpatialNavigation.resume();
    }, false);

    // All valid events.
    var validEvents = [
        'sn:willmove',
        'sn:willunfocus',
        'sn:unfocused',
        'sn:willfocus',
        'sn:focused',
        'sn:enter-down',
        'sn:enter-up',
        'sn:navigatefailed',
        'keypress',
        'keydown',
        'keyup',
        'onblur'
     ];

    var key = "";
    var eventHandler = function(evt) {

        if(evt.type == 'keydown') {
            key = evt.key;
        }

        if (evt.type == 'sn:willfocus') {
            
            if( key == 'ArrowDown' || key == 'ArrowUp' ){
                // Scroll to active section.
                var screenHeight = $(window).height();
                var sectionHeight = $(evt.target).closest('section').outerHeight();
                var sectionOffset = $(evt.target).closest('section').offset().top;
                var elementHeight = $(evt.target).outerHeight();
                var elementOffset = $(evt.target).offset().top;
                var targetScrollTop = 0;
                // Scroll to top of section by default.
                targetScrollTop = sectionOffset;
                // Scroll back a little if the section height is smaller as the screen height.
                if (sectionHeight < screenHeight) {
                    targetScrollTop = targetScrollTop - (screenHeight/2) + (sectionHeight/2);
                }
                // Scroll if an element within a section is out of the viewport.
                if (sectionHeight >= screenHeight) {
                    if ((elementOffset + elementHeight + 60) >= (sectionOffset + screenHeight)) {
                        targetScrollTop = elementOffset - (screenHeight - elementHeight) + 60;
                    }
                }
                // Always scroll to absolute top if there is only a very small distance.
                if (targetScrollTop < 100) {
                    targetScrollTop = 0;
                }
                // All done!
                $('html, body').animate({
                    scrollTop: targetScrollTop
                }, {
                    queue: false
                }, 500);
            }
        }

        // Focus on input type text via helper element.
        if ($(evt.target).is('a.input-wrapper')) {
            if (evt.type == 'sn:enter-up') {
                evt.preventDefault();
                if ($(evt.target).hasClass('just-exited')) {
                    $(evt.target).removeClass('just-exited')
                    return false;
                }
                $(evt.target).hide();
                SpatialNavigation.focus($(evt.target).next('input'));
                $(evt.target).next('input').focus();
                $(evt.target).next('input').get(0).setSelectionRange(0, 0); // Set cursor to the beginning.
                SpatialNavigation.pause();
                return false;
            }
        }

        // Leave input type text and reactivate helper element.
        if ($(evt.target).is('input[type="text"]')) {
            if (evt.key == 'ArrowDown' || evt.key == 'ArrowUp' || evt.key == 'Escape' || evt.key == 'Enter') {
                evt.preventDefault();
                $(evt.target).blur();
                $(evt.target).prev().show();
                $(evt.target).prev().addClass('just-exited');
                $(evt.target).prev().focus();
                SpatialNavigation.focus($(evt.target).prev());
                SpatialNavigation.resume();
                return false;
            }
        }

        // Prevent opening a link if attribute href is empty.
        if (evt.target instanceof HTMLAnchorElement) {
            if (evt.type == 'sn:enter-down') {
                if ($(evt.srcElement).attr('href') && $(evt.srcElement).attr('href') == '') {
                    evt.preventDefault();
                    return false;
                } else {
                    window.location.href = evt.srcElement.href;
                }
            }
        }

        if (evt.type == 'sn:focused') {
            // Pause video on change focus Youtube/Vimeo.
            $('.js-video-global-pause').each(function() {
                if($(this).hasClass('slider-video-play') || $(this).hasClass('vimeo-video-play')) {
                    $(this).trigger('click');
                }
            });

            $('video').each(function() {
                $(this).trigger('pause');
                $(this).attr('currentTime', 0);
                $(this).trigger('load');
                $('.js-xploretv-d-content').fadeTo("fast",1);
            })
        };
    };

    validEvents.forEach(function(type) {
        window.addEventListener(type, eventHandler);
    });

    // Time
    function xploretvTime() {
        var currentdate = new Date();
        //currentdate.toLocaleString('de-DE', { timeZone: 'Europe/Vienna' })
        var minutes = currentdate.getMinutes();
        minutes = minutes > 9 ? minutes : '0' + minutes;
        var time = currentdate.getHours() + ":" + minutes;

        $('#js-xploretv-date-time .js-xploretv-time').text(time);

        setTimeout(xploretvTime, 1000);
    };

    // Date
    function xploretvDate() {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var currentdate = new Date();
        var day = currentdate.toLocaleDateString("de-AT", options);

        $('#js-xploretv-date-time .js-xploretv-date').text(day);
    }

    if($('#js-xploretv-date-time').length > 0) {
        xploretvTime();
        xploretvDate();
    }

    // History back on [ESC].
    //window.addEventListener("keyup", function(e){ if(e.keyCode == 27) history.back(); }, false);



}(jQuery));

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
            end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
;;(function($) {
    "use strict";

    if ($('.js-xploretv-b-slider').length > 0) {
        var slider = $('.js-xploretv-b-slider');
        $(slider).each(function(index){
            $(this).addClass('xploretv-b-slider_'+index);
            $(this).not('.slick-initialized').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '25px',
                initialSlide: 0,
                focusOnSelect: true,
                variableWidth: true,
                dots: false,
                arrows: false
            });

            $('.xploretv-b-slider_'+index).each(function(){
                $(this).on('beforeChange',function(event){
                    SpatialNavigation.pause();
                });
                $(this).on('afterChange',function(event){
                    SpatialNavigation.resume();
                    SpatialNavigation.focus($(this).find('.slick-current'));
                });
            });

        });
    }
}(jQuery));
;;(function($) {
    "use strict";

    //  Default Video
    $('.js-xploretv-d-start.loc-video').on('click sn:enter-down', function() {
        location.href = "#" + $(this).closest('section').attr('id');
        if ($(this).parent().parent().parent().parent().find('.js-xploretv-d-video.loc-video').length > 0) {
            $(this).parent().parent().parent().parent().find('.js-xploretv-d-video.loc-video').trigger('play');
            $(this).parent().parent().parent('.js-xploretv-d-content').fadeTo('fast', 0);
        }
    });

    $('.js-xploretv-d-video.loc-video').on('ended', function(){
        $('.js-xploretv-d-content').fadeTo("fast", 1);
        $(this).trigger('load');
    });
}(jQuery));
;;(function($) {
    "use strict";

    if($('.js-xploretv-e-slider').length > 0) {
        $('.js-xploretv-e-slider').each(function(index) {
            $(this).addClass('xploretv-e-slider_'+index);
            $(this).not('.slick-initialized').slick({
                  accessibility: true,
                  infinite: false,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  centerMode: true,
                  speed: 300,
                  asNavFor: '.product-info',
                  initialSlide: 0,
                  centerPadding: '525px',
                  focusOnSelect: true,
                  dots: false,
                  arrows: false,
                  responsive: [{
                       breakpoint: 1300,
                       settings: {
                           initialSlide: 2,
                           centerPadding: '222px',
                       }
                   }]
            });

            $('.xploretv-e-slider_'+index+' .slick-slide').each(function(){
                $(this).on('beforeChange',function(event){
                    SpatialNavigation.pause();
                });
                $(this).on('afterChange',function(event){
                    SpatialNavigation.resume();
                    SpatialNavigation.focus($(this).find('.slick-current'));
                });
            });
        });
    }

    if ($('.product-info').length > 0) {
        $('.product-info').each(function(index){
            $(".product-info").not('.slick-initialized').slick({
                accessibility: true,
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                speed: 260,
                fade: true,
                initialSlide: 0,
                asNavFor: '.xploretv-e-slider_'+index
            });
        });
    };
}(jQuery));
;;(function($) {
    "use strict";

    // Checkboxes
    $('.xploretv-g-radio-ui').on('sn:focused',function(){
        $('.xploretv-g-radio').find('input').each(function(){
            $(this).prop('checked', false);
        })
        $(this).parent().find('input').prop('checked', true);
     });

     $('.xploretv-g-checkbox').on('sn:enter-down',function(){
         if($(this).find('input').prop('checked') == true) {
             $(this).find('input').prop('checked', false);
         } else {
             $(this).find('input').prop('checked', true);
         }
     });

     // Radio buttons
     $(".radio .xploretv-g-checkbox").on('sn:enter-down', function(){
         $(this).closest('.radio').find('input').prop("checked", false);
         $(this).find('input').prop("checked", true);
     });

     // Send form.
     $(".myForm").submit(function(e) {
         e.preventDefault();
         var formElement = $(this);
         var sectionElement = formElement.closest('section');
         var form_data = $(this).serializeArray();
         var method = formElement.attr('method');
         var url = formElement.attr('action');
         var form_valid = true;

         // Form validation.
         $('.xploretv-g-checkbox-group.required').each(function( index, value ){
             var is_checked = $(this).find('input:checkbox:checked').length;
             if (is_checked == 0) {
                 $(this).find('p.has-error').removeClass('hidden');
                 form_valid = false;
             } else {
                 $(this).find('p.has-error').addClass('hidden');
             }
         });

         $('.xploretv-g-radio-group.required').each(function( index, value ){
             var is_checked = $(this).find('input:checkbox:checked').length;
             if (is_checked == 0) {
                 $(this).find('p.has-error').removeClass('hidden');
                 form_valid = false;
             } else {
                 $(this).find('p.has-error').addClass('hidden');
             }
         });

         if (form_valid) {
             var statusElement = sectionElement.find('.status');
             var responseElement = sectionElement.find('.response');
             $.ajax({
                 method: method,
                 url: url,
                 data: form_data,
                 success: function(data) {
                     var returnData = JSON.parse(data);
                     if (returnData.status === 'success') {
                         formElement.hide(); // Hide form
                         statusElement.hide(); // Hide status
                         responseElement.fadeIn();
                         location.href = "#" + sectionElement.attr('id');
                         SpatialNavigation.focus(sectionElement.find('.catch-submit:last'));
                         if (sectionElement.find('.catch-submit').length > 1) {
                             sectionElement.find('.catch-submit').not('.catch-submit:last').removeClass('focusable');
                         }
                     } else {
                         statusElement.hide();
                         statusElement.fadeIn();
                         statusElement.html('<h3>' + returnData.message + '</h3>');
                     }
                 },
                 error: function( xhr, textStatus) {
                     var errorMessage = xhr.status + ' - ' + xhr.statusText;
                     statusElement.hide();
                     statusElement.fadeIn();
                     statusElement.html('<h3>' + errorMessage + '</h3>');
                 }
             });
         }
     });
}(jQuery));
;;(function($) {
    "use strict";

    if ($('.js-xploretv-k-slider').length > 0) {
        var slider = $('.js-xploretv-k-slider');
        $(slider).each(function(){
            slider.not('.slick-initialized').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                centerPadding: '25px',
                initialSlide: 0,
                focusOnSelect: true,
                variableWidth: true,
                dots: false,
                arrows: false
            });
        });
    }
}(jQuery));
