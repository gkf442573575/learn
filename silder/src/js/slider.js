!(function () {
    let $el = null;
    let config = {};
    let $silde_ul = null;
    let $silde_ul_li = null;
    let sildeInt = null;
    let current = 0;

    function init(el, uConfig) {
        $el = el;
        config = {
            width: uConfig.width ? uConfig.width : $el.width(),
            height: uConfig.height ? uConfig.height : $el.height(),
            speed: uConfig.speed ? uConfig.speed : 500,
            intervalTime: uConfig.intervalTime ? uConfig.intervalTime : 5000,
            direction: uConfig.direction ? uConfig.direction : 'horizontal',
            loop: uConfig.loop ? uConfig.loop : false
        };
        $silde_ul = $el.find('.slider-wrapper');
        $silde_ul_li = $silde_ul.find('.slider-item');
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
        let isH = config.direction == 'horizontal' ? true : false;
        let listClassName = isH ? 'slider-item-left' : 'slider-item-top';
        let cssObj = isH ? {
            width: config.width
        } : {
            height: config.height
        };
        let itemLen = $silde_ul_li.length;
        let ulCssObj = isH ? {
            width: config.width * itemLen,
            left: config.loop ? -config.width : 0
        } : {
            top: config.loop ? -config.height : 0
        };
        $silde_ul.css(ulCssObj);
        $silde_ul_li.each(function () {
            $(this).addClass(listClassName).css(cssObj);
        });
        animat(isH, itemLen);
    };

    function animat(isH, itemLen) {
        let currentLen = config.loop ? itemLen - 2 : itemLen;
        let intCssObj = isH ? {
            left: config.loop ? -config.width : 0
        } : {
            top: config.loop ? -config.height : 0
        };
        sildeInt = setInterval(() => {
            if (current < currentLen) {
                current++;
                let multiple = config.loop ? (current + 1) : current;
                let animatObj = isH ? {
                    left: -config.width * multiple
                } : {
                    top: -config.height * multiple
                };
                $silde_ul.stop(true, false).animate(animatObj, config.speed, function () {
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
        silder: function (userconfig) {
            new Silder($(this), userconfig);
        }
    });

})(jQuery || $)