!(function() {


    let $el = null;
    let config = {};
    let $silde_ul = null;
    let $silde_ul_li = null;

    function init(el, uConfig) {
        $el = el;
        config = {
            width: uConfig.width ? uConfig.width : $el.width(),
            height: uConfig.height ? uConfig.height : $el.height(),
            speed: uConfig.speed ? uConfig.speed : 500,
            intervalTime: uConfig.intervalTime ? uConfig.intervalTime : 5000,
            direction: uConfig.direction ? uConfig.direction : 'horizontal'
        };
        $silde_ul = $el.find('.slider-wrapper');
        $silde_ul_li = $silde_ul.find('.slider-item');
        setlistH();
    }


    function setlistH() {
        $silde_ul_li.each(function() {
            $(this).css({
                height: config.height
            })
        });
    }

    class Silder {
        constructor(el, userconfig) {
            if (!el.hasClass('slider-container')) {
                el.addClass('slider-container')
            };
            init(el, userconfig);
        }
    }

    $.fn.extend({
        silder: function(userconfig) {
            new Silder($(this), userconfig);
        }
    });

})(jQuery || $)