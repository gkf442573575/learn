(function () {
    var $,
        ele,
        container,
        canvas,
        num,
        prizes,
        btn,
        deg = 0,
        fnGetPrize,
        fnGotBack,
        optsPrize;

    var cssPrefix,
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
    Object.keys(vendors).some(function (vendor) {
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

    var transform = cssSupport.transform;
    var transitionEnd = cssSupport.transitionEnd;

    // alert(transform);
    // alert(transitionEnd);

    function init(opts) {
        fnGetPrize = opts.getPrize;
        fnGotBack = opts.gotBack;
        if (!opts.el) {
            console.error('未设置转盘元素');
            return;
        }
        if (!opts.prizes) {
            console.error('未设置奖品');
            return;
        }
        prizes = opts.prizes;
        num = prizes.length;
        let el = opts.el;
        ele = document.querySelector(el); // 全局的主体
        appendTurntable(opts, () => {
            draw(opts);
        });
        events();
    }

    /**
     * @param {object} el elment
     * @param {function} callback 回调函数
     */

    function appendTurntable(opts, callback) {
        let eleClassName = 'turntable';
        let hasTurntableClass = hasClass(ele, eleClassName);
        if (!hasTurntableClass) {
            addClass(ele, eleClassName);
        }
        let CANVAS = ele.querySelector('.turntable-canvas');
        // canvas的高宽 默认为300
        let canvasH = opts.height || 300,
            canvasW = opts.width || 300;
        if (!CANVAS) {
            let canvasChild = document.createElement('div');
            canvasChild.className = 'turntable-container';
            let canvas = document.createElement('canvas');
            canvas.className = 'turntable-canvas';
            canvas.height = canvasH;
            canvas.width = canvasW;
            canvas.innerHTML = `抱歉!浏览器不支持.`;
            canvasChild.appendChild(canvas);
            ele.appendChild(canvasChild);
        } else {
            CANVAS.width = canvasW;
            CANVAS.height = canvasH;
        }

        callback();
    }




    /**
     * [绘制转盘]
     * @param  {String} id
     * @param  {Number} 奖品份数
     */
    function draw(opts) {
        opts = opts || {};

        if (!opts.el || num >>> 0 === 0) {
            return
        };

        var el = opts.el,
            rotateDeg = 360 / num / 2 + 90, // 扇形回转角度
            ctx,
            prizeItems = document.createElement('ul'), // 奖项容器
            turnNum = 1 / num, // 文字旋转 turn 值
            html = []; // 奖项



        canvas = ele.querySelector('.turntable-canvas');
        container = ele.querySelector('.turntable-container');
        btn = ele.querySelector('.turntable-btn');

        if (!canvas.getContext) {
            // alert('抱歉！浏览器不支持。');
            return;
        }
        // 获取绘图上下文
        ctx = canvas.getContext('2d');

        for (var i = 0; i < num; i++) {
            // 保存当前状态
            ctx.save();
            // 开始一条新路径
            ctx.beginPath();
            // 位移到圆心，下面需要围绕圆心旋转
            ctx.translate(150, 150);
            // 从(0, 0)坐标开始定义一条新的子路径
            ctx.moveTo(0, 0);
            // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
            ctx.rotate((360 / num * i - rotateDeg) * Math.PI / 180);
            // 绘制圆弧
            ctx.arc(0, 0, 150, 0, 2 * Math.PI / num, false);
            ctx.fillStyle = '#ffffff';
            // 填充扇形
            ctx.fill();
            // 绘制边框
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = '#e4370e';
            ctx.stroke();

            // 恢复前一个状态
            ctx.restore();

            // 奖项列表
            html.push('<li class="turntable-item"> <span style="' + transform + ': rotate(' + i * turnNum + 'turn)">' + opts.prizes[i] + '</span> </li>');
            if ((i + 1) === num) {
                prizeItems.className = 'turntalbe-list';
                container.appendChild(prizeItems);
                prizeItems.innerHTML = html.join('');
            }

        }

    }



    /**

     * 旋转转盘
     * @param  {[type]} deg [description]
     * @return {[type]}     [description]
     */
    function runRotate(deg) {
        // runInit();

        // setTimeout(function() {
        // addClass(container, 'run');
        container.style[transform] = 'rotate(' + deg + 'deg)';
        // }, 10);
    }

    /**
     * 抽奖事件
     * @return {[type]} [description]
     */
    function events() {
        bind(btn, 'click', function () {
            /*      var prizeId,
                      chances;*/

            addClass(btn, 'disabled');

            fnGetPrize(function (data) {
                optsPrize = {
                    prizeId: data[0],
                    chances: data[1]
                }
                // 计算旋转角度
                deg = deg || 0;
                deg = deg + (360 - deg % 360) + (360 * 10 - data[0] * (360 / num))
                runRotate(deg);
            });

            // 中奖提示
            bind(container, transitionEnd, eGot);
        });
    }

    function eGot() {
        if (optsPrize.chances) removeClass(btn, 'disabled');
        fnGotBack(prizes[optsPrize.prizeId]);
    }


    /**
     * Bind events to elements 
     * @param {Object}    ele    HTML Object
     * @param {Event}     event  Event to detach 
     * @param {Function}  fn     Callback function 
     */
    function bind(ele, event, fn) {
        if (typeof addEventListener === 'function') {
            ele.addEventListener(event, fn, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + event, fn);
        }
    }
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





    // removeClass
    function removeClass(ele, cls) {
        if (ele.classList) {
            ele.classList.remove(cls);
        } else {
            ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    var gbTurntable = {
        init: function (opts) {
            return init(opts);
        }
    }

    // (@see https://github.com/madrobby/zepto/blob/master/src/zepto.js)
    window.gbTurntable === undefined && (window.gbTurntable = gbTurntable);

    // AMD (@see https://github.com/jashkenas/underscore/blob/master/underscore.js)
    if (typeof define == 'function' && define.amd) {
        define('canvas-turntable', [], function () {
            return gbTurntable;
        });
    }

}());




(function (global, factory) {

    "use strict";
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.Turntable = factory());

    // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, (function () {


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
            // 元素
            this.el = document.querySelector(el);
            // 礼物列表
            this.prizes = opts.prizes;

            // canvas的高度
            this.canvasH = opts.height || 300;
            // canvas的宽度
            this.canvasW = opts.width || 300;
            // 初始化的角度
            this.startAngle = 0;
            this.textR = opts.textR || this.canvasW * 0.4;
            this.angelTo = opts.angelTo || 0;
            this.init();
        }
        init() {
            addClass(this.el, 'turntable');
            let CANVAS = this.el.querySelector('.turntable-canvas');
            if (CANVAS) {
                CANVAS.width = this.canvasH;
                CANVAS.height = this.canvasW;
                this.drawTurntable();
                //TODO:存在cavas就进行画图
            } else {
                // TODO: 不存在canvas 就进行创建，创建完成后画图
                this.createCanvas(() => {
                    this.drawTurntable()
                });
            }
        }
        createCanvas(callback) {
            let canvasChild = document.createElement('div');
            canvasChild.className = 'turntable-container';
            let canvas = document.createElement('canvas');
            canvas.className = 'turntable-canvas';
            canvas.height = this.canvasH;
            canvas.width = this.canvasW;
            canvas.innerHTML = `抱歉!浏览器不支持.`;
            canvasChild.appendChild(canvas);
            this.el.appendChild(canvasChild);
            callback()
        }
        drawTurntable(angelTo) {
            angelTo = angelTo || 0;
            let canvas = this.el.querySelector('.turntable-canvas');
            let ctx = canvas.getContext('2d');
            let x = this.canvasW / 2,
                y = this.canvasH / 2;

            // 礼物长度
            let prizesLen = this.prizes.length;
            let rotateDeg = 360 / (prizesLen * 2) + 90; // 扇形回转角度
            ctx.clearRect(0, 0, this.canvasW, this.canvasH);
            // 平分角度
            let angle = (2 * Math.PI / 360) * (360 / prizesLen);
            let startAngle = angle / 2;
            for (var i = 0; i < prizesLen; i++) {
                let item = this.prizes[i];
                let fillStyle = item.color || '#fff';
                ctx.save()
                ctx.beginPath();
                ctx.translate(x, y)
                ctx.moveTo(0, 0);
                ctx.rotate((360 / prizesLen * i - rotateDeg) * Math.PI / 180);
                ctx.arc(0, 0, this.canvasW / 2, 0, 2 * Math.PI / prizesLen, false);
                ctx.fillStyle = fillStyle;
                ctx.fill();
                // 保存一次
                // ctx.rotate(0);
                // ctx.save();

                // ctx.rotate(startAngle);
                ctx.fillStyle = item.fontStyle || '#333';
                ctx.textAlign = "center";
                ctx.fillText(item.text, 0, -200);
                // ctx.restore();

                ctx.restore();
            }
        }
        loadimg() { // 加载图片

        }



    }







    return Turntable;
}))