!(function() {
    let $el = null;
    let config = {};
    let $silde_ul = null;
    let $silde_ul_li = null;
    let sildeInt = null;
    let current = 0;

    function init(el, uConfig) {
        $el = el;
        $silde_ul = $el.find('.slider-wrapper');
        $silde_ul_li = $silde_ul.find('.slider-item');
        if ($silde_ul_li.length <= 1) {
            return;
        }
        config = {
            width: uConfig.width ? uConfig.width : $el.width(),
            height: uConfig.height ? uConfig.height : $el.height(),
            speed: uConfig.speed ? uConfig.speed : 500,
            intervalTime: uConfig.intervalTime ? uConfig.intervalTime : 5000,
            direction: uConfig.direction ? uConfig.direction : 'horizontal',
            loop: uConfig.loop ? uConfig.loop : false
        };
        setHtml();
    };

    function setHtml() {
        if (config.loop) {
            let item0 = $silde_ul_li.eq(0).get(0).outerHTML;
            let itemLast = $silde_ul.find('.slider-item:last').get(0).outerHTML;
            $silde_ul.append(item0);
            $silde_ul.prepend(itemLast);
            $silde_ul_li = $silde_ul.find('.slider-item');
        }
        setlistH();
    };

    function setlistH() {
        let listClassName = '';
        let cssObj = {};
        let itemLen = $silde_ul_li.length;
        let ulCssObj = {};
        let intCssObj = {};
        if (config.direction == 'horizontal') {
            listClassName = 'slider-item-left';
            cssObj = {
                width: config.width
            };
            ulCssObj = {
                width: config.width * itemLen,
                left: config.loop ? -config.width : 0
            };
            intCssObj = {
                left: config.loop ? -config.width : 0
            };
        } else if (config.direction == 'vertical') {
            listClassName = 'slider-item-top';
            cssObj = {
                height: config.height
            };
            ulCssObj = {
                top: config.loop ? -config.height : 0
            };
            intCssObj = {
                top: config.loop ? -config.height : 0
            };
        } else {
            return;
        }
        $silde_ul.css(ulCssObj);
        $silde_ul_li.each(function() {
            $(this).addClass(listClassName).css(cssObj);
        });
        animat(intCssObj, itemLen);
    };

    function animat(intCssObj, itemLen) {
        let currentLen = config.loop ? itemLen - 2 : itemLen;
        sildeInt = setInterval(() => {
            if (current < currentLen) {
                current++;
                let multiple = config.loop ? (current + 1) : current;
                let animatObj = {};
                if (config.direction == 'horizontal') {
                    animatObj = {
                        left: -config.width * multiple
                    }
                } else if (config.direction == 'vertical') {
                    animatObj = {
                        top: -config.height * multiple
                    }
                };
                $silde_ul.stop(true, false).animate(animatObj, config.speed, function() {
                    if (current == currentLen) {
                        $silde_ul.css(intCssObj);
                        current = 0;
                    }
                });
            }
        }, config.intervalTime);
    };

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