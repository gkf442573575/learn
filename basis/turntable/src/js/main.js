(function(global, factory) {
    "use strict";
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global.Turntable = factory());
    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, (function() {


    /**
     * @function 是否含有某个class名
     * @param {Object} ele   HTML Object
     * @param {String} cls   className
     * @return {Boolean}
     */
    function hasClass(ele, cls) {
        if (!ele || !cls) return false;
        if (ele.classList) {
            return ele.classList.contains(cls);
        } else {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
    }

    /**
     * @function 添加一个class名称
     * @param {*} ele 
     * @param {*} cls 
     */
    function addClass(ele, cls) {
        if (ele.classList) {
            ele.classList.add(cls);
        } else {
            if (!hasClass(ele, cls)) ele.className += '' + cls;
        }
    }


    let cssPrefix,
        eventPrefix,
        vendors = {
            '': '',
            Webkit: 'webkit',
            Moz: '',
            O: 'o',
            ms: 'ms'
        },
        testEle = document.createElement('p'),
        cssSupport = {};

    // 嗅探特性
    Object.keys(vendors).some(function(vendor) {
        if (testEle.style[vendor + (vendor ? 'T' : 't') + 'ransitionProperty'] !== undefined) {
            cssPrefix = vendor ? '-' + vendor.toLowerCase() + '-' : '';
            eventPrefix = vendors[vendor];
            return true;
        }
    });

    /**
     * [兼容事件前缀]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    /**
     * [兼容CSS前缀]
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    function normalizeCss(name) {
        name = name.toLowerCase();
        return cssPrefix ? cssPrefix + name : name;
    }

    cssSupport = {
        cssPrefix: cssPrefix,
        transform: normalizeCss('Transform'),
        transitionEnd: normalizeEvent('TransitionEnd')
    }

    let transform = cssSupport.transform;
    let transitionEnd = cssSupport.transitionEnd;



    let $el, canvasW, canvasH, radius, prizes, startAngle, textR, angelTo, defaultColor, defaultFont;



    function init(opts) {
        $el = document.querySelector(opts.el);

        // 礼物列表
        prizes = opts.prizes;
        // canvas的高度
        canvasH = opts.height || 300;
        // canvas的宽度
        canvasW = opts.width || 300;
        // 圆弧半径为高度和宽度的最小值除以2
        radius = (Math.min(canvasH, canvasW)) / 2;
        // 初始化的角度
        startAngle = 0;
        // 字体半径
        textR = opts.textR || canvasW * 0.4;
        angelTo = opts.angelTo || 0;
        // 默认背景色 无默认就是白色
        defaultColor = opts.defaultColor || '#fff';
        // 默认的字体
        defaultFont = opts.defaultFont || '16px Microsoft YaHei';

        let CANVAS = $el.querySelector('.turntable-canvas');
        $el.style.width = canvasW + 'px';
        $el.style.height = canvasH + 'px';
        addClass($el, 'turntable');
        if (CANVAS) {
            CANVAS.width = canvasH;
            CANVAS.height = canvasW;
            drawTurntable1();
            //TODO:存在cavas就进行画图
        } else {
            // TODO: 不存在canvas 就进行创建，创建完成后画图
            createCanvas(() => {
                drawTurntable1()
            });
        }
    }


    function createCanvas(callback) {
        let canvas = document.createElement('canvas');
        canvas.className = 'turntable-canvas';
        canvas.height = canvasH;
        canvas.width = canvasW;
        canvas.innerHTML = `抱歉!浏览器不支持.`;
        $el.appendChild(canvas);
        callback()
    }


    /**
     * // TODO: 创建 DEMO思路1 有不完善之处 只能做图片的选择  
     */
    function drawTurntable1() {
        angelTo = angelTo || 0;
        let canvas = $el.querySelector('.turntable-canvas');
        let ctx = canvas.getContext('2d');
        let x = canvasW / 2,
            y = canvasH / 2;

        // 礼物长度
        let prizesLen = prizes.length;
        let rotateDeg = 360 / (prizesLen * 2) + 90; // 扇形回转角度
        ctx.clearRect(0, 0, canvasW, canvasH);
        // 平分的弧度
        let desAngle = 2 * Math.PI / prizesLen;



        let turnNum = 1 / prizesLen;
        let $goodsEl = document.createElement('ul');
        $goodsEl.className = 'turntable-goods';
        let listhtml = '';
        for (let i = 0; i < prizesLen; i++) {
            let item = prizes[i];
            let fillStyle = item.color || defaultColor;
            let angle = startAngle + i * desAngle;

            ctx.save();
            ctx.beginPath();
            ctx.translate(x, y);
            ctx.moveTo(0, 0);
            ctx.rotate((360 / prizesLen * i - rotateDeg) * Math.PI / 180);
            ctx.arc(0, 0, radius, 0, desAngle, false);
            ctx.fillStyle = fillStyle;
            ctx.fill();

            ctx.restore();


            let style = `
                ${transform}: rotate(${i * turnNum }turn)
            `;
            listhtml += `
                <li class='turntable-item' style='${style}'>
                    <img src=${item.imgsrc}/>
                </li>
            `;
        }
        $goodsEl.innerHTML = listhtml;
        $el.appendChild($goodsEl);
    }


    class Turntable {
        constructor(opts) {
            opts = opts || {};
            let el = opts.el;
            let prizes = opts.prizes;
            if (!el) {
                console.error('未设置外层元素');
            }
            if (!prizes || !prizes.length) {
                console.error('请设置奖品列表');
            }
            this.init(opts);
        }
        init(opts) {
            init(opts);
        }
    };
    return Turntable;
}))