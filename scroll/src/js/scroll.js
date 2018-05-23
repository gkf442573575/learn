$(function() {
    let scrollEl = document.querySelector(".scroll"),
        ul = scrollEl.querySelector('ul');
    let pullDown = document.querySelector('.pullDown');
    let upload = document.querySelector('.pullup');
    let stopHeight = pullDown.offsetHeight;
    let scroll = new BScroll(scrollEl, {
        tap: true,
        pullUpLoad: true,
        pullDownRefresh: {
            threshold: 50,
            stop: stopHeight * 2
        }
    });
    // 下拉加载的dom
    let $pullDown = $(".pullDown"),
        $refreshLoad = $pullDown.find('.loading'),
        $beforeRefresh = $pullDown.find('.beforeRefresh'),
        $refreshEnd = $pullDown.find('.refreshEnd');
    let $pullUp = $('.pullup'),
        $upLoad = $pullUp.find('.loading'),
        $nomore = $pullUp.find('.nomore');


    scroll.on('scroll', function(pos) {
        pullDown.style.top = Math.min(pos.y - 50, 10) + 'px';
    });

    let page = 1;
    // 上拉加载
    scroll.on('pullingUp', function() {
        // upload.style.display = 'block';
        let el = document.createElement('li');
        el.className = 'item';
        el.innerHTML = '新建的数据.....';
        setTimeout(function() {
            if (page > 3) {
                allLoad();
                return;
            }
            page++;
            ul.appendChild(el);
            scroll.finishPullUp();
        }, 3000);
    });
    // 下拉刷新
    scroll.on('pullingDown', function() {
        beginRefresh();
        setTimeout(function() {
            endFefresh();
            setTimeout(function() {
                scroll.finishPullDown();
                initRefresh();
            }, 500);
        }, 3000);
    });

    $('.content ul').on('tap', '.item', function() {
        let id = $(this).attr('data-id');
        console.log('id', id);
    });


    function allLoad() {
        $upLoad.hide();
        $nomore.show();
        scroll.closePullUp();
    }

    function beginRefresh() {
        $beforeRefresh.hide();
        $refreshLoad.show();
    }

    function endFefresh() {
        $refreshLoad.hide();
        $refreshEnd.show();
    }

    function initRefresh() {
        $beforeRefresh.show();
        $refreshLoad.hide();
        $refreshEnd.hide();
    }
})