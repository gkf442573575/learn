$(function() {
    let resurl = $("input[name='res_url']").val(),
        qinniuimgser = $("input[name='qiniuimgser']").val(),
        imgserver = $("input[name='imgserver']").val();
    let $accountlist = $("#accountlist"),
        $accountsearch = $("#accountsearch"),
        $accountsearchlist = $("#account_searchlist"),
        $nowaccount = $("#now_account"),
        $accountsearchbtn = $("#accountsearch_btn"),
        $friendlist = $("#friendlist"),
        $friendsearch = $("#friendsearch"),
        $friendsearchlist = $("#friend_searchlist"),
        $nowfriend = $("#now_friend"),
        $friendsearchbtn = $("#friendsearch_btn"),
        $chatnickname = $("#chatnickname"),
        $msginput = $("#msginput"),
        $replylist = $("#replylist");



    let Chat = {
        refreshtime: 10000,
        virtualchatlist: [], //虚拟用户的列表
        virtualpageon: 1, // 虚拟用户的页数
        virtualpagecout: 0, // 虚拟账户的列表
        friendchatlist: [], // 好友信息列表
        friendpageon: 1, // 好友列表的第几页
        friendpagecout: 0, // 好友列表的总页数
        userid: null, // 当前的虚拟账户ID
        cuserid: null, // 当前的信息列表的用户id
        chatid: null, // 当前聊天的id
        searchVirtualUser: [], // 搜索的虚拟用户
        searchFriendUser: [], // 搜索的其他用户
        init() {
            this.getVirtual();
            setTimeout(() => {
                this.refresh();
            }, this.refreshtime);
        },
        refresh() { // 刷新开始
            setInterval(() => {
                this.getVirtual();
                if (this.userid) {
                    this.getVirtual();
                    if (this.cuserid) {
                        this.getReplyContent();
                    }
                }
            }, this.refreshtime);
        },
        appendlist(list) {
            let appendhtml = '';
            if (list && list.length > 0) {
                list.forEach(item => {
                    let nickname = item.nickname ? item.nickname : '用户' + item.userid,
                        num = item.unreadnum,
                        userhead = item.userheadpath,
                        isvisible = num && num > 0 ? 'visible' : 'hidden',
                        numtext = num && num > 99 ? '99+' : num;
                    let listitme = `
                    <div class="listitme" data-userid="${item.userid}" data-cuserid='${item.cuserid}'>
                        <div class="userhead">
                            <img src="${userhead}" alt="" srcset="">
                        </div>
                        <div class="nikename">${nickname}</div>
                        <div class="msgnum" style="visibility:${isvisible}">${numtext}</div>
                    </div>
                `
                    appendhtml += listitme;
                });
            }
            return appendhtml;
        },
        replylistScrollEnd() { // 回复列表滚动到底
            let scrollH = $replylist.get(0).scrollHeight;
            $replylist.scrollTop(scrollH);
        },
        trancechatlist(list) { // 将list处理数据结构
            list.forEach(item => {
                item.nickname = item.nickname ? item.nickname : '用户' + item.userid;
                item.userheadpath = item.userheadpath ? item.userheadpath : '默认头像';
            });
            return list;
        },
        setPaginator(pagetype) { // 确定一下类型 是 虚拟用户分页还是消息分页
            pagetype = pagetype == 1 && pagetype ? true : false;
            let el = pagetype ? '#accountpage' : '#friendspage',
                totalPages = pagetype ? this.virtualpagecout : this.friendpagecout,
                currentPage = pagetype ? this.virtualpageon : this.friendpageon;
            $.jqPaginator(el, {
                totalPages,
                visiblePages: 1, // 显示的条数
                currentPage, //初始首页
                prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                onPageChange: (num, type) => {
                    if (type == 'change') {
                        if (pagetype) {
                            this.virtualpageon = num;
                            this.getVirtual();
                        } else {
                            this.friendpageon = num;
                            this.getAccount();
                        }
                    }
                }
            });
        },
        /**
         * 获取虚拟用户
         */
        getVirtual() {
            $.ajax({
                url: `${resurl}app/chatmsg/selectVuUserChatList.do`,
                method: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    pageon: this.virtualpageon
                },
                crossDomain: true,
                success: res => {
                    let page = res.page;
                    this.virtualpagecout = page.pagecount;
                    this.setPaginator(1);
                    this.virtualchatlist = this.trancechatlist(res.chatlist);
                    this.setVirtuallist();
                },
                error: err => {}
            })
        },
        getAccount() { // 获取消息的列表
            $.ajax({
                url: `${resurl}app/chatmsg/selectChatList.do`,
                method: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    pageon: this.friendpageon,
                    userid: this.userid
                },
                crossDomain: true,
                success: res => {                    
                    if (res.success) {
                        this.friendchatlist = this.trancechatlist(res.chatlist);
                        let page = res.page;
                        this.friendpagecout = page.pagecount;
                        this.setPaginator();
                        this.setMsgChatList();
                    } else {}
                },
                error: err => {}
            })
        },
        /**
         * 获取回复的内容
         */
        getReplyContent() {
            $.ajax({
                url: `${resurl}app/chatmsg/insertChatroom.do`,
                method: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    cuserid: this.cuserid,
                    userid: this.userid
                },
                crossDomain: true,
                success: res => {                    
                    if (res.success) {
                        this.chatid = res.chatid;
                        this.appentReplyContent(res.chatlist);
                    } else {}
                },
                error: err => {}
            })
        },
        sendReplyContent() { // 发送消息
            let content = $msginput.val();
            $.ajax({
                url: `${resurl}app/chatmsg/insertChatMsg.do`,
                method: 'post',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    cuserid: this.cuserid,
                    userid: this.userid,
                    chatid: this.chatid,
                    content,
                    type: 1
                },
                crossDomain: true,
                success: res => {
                    if (res.success) {
                        this.addReply();
                    } else {}
                },
                error: err => {}
            })
        },
        searchUser(type) { // 搜索虚拟账户
            let userid = type == 1 ? $accountsearch.val() : $friendsearch.val();
            $.ajax({
                url: `${resurl}app/chatmsg/selectUser.do`,
                method: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                data: {
                    userid,
                    type
                },
                crossDomain: true,
                success: res => {
                    if (res.success) {
                        let user = res.user,
                            list = this.trancechatlist([user]);
                        var appendhtml = this.appendlist(list);
                        if (type == 1) {
                            this.searchVirtualUser = list;
                            $accountsearchlist.html(appendhtml);
                        } else {
                            this.searchFriendUser = list;
                            $friendsearchlist.html(appendhtml);
                        }
                    }
                },
                error: err => {}
            });
        },
        addReply() {
            let content = $msginput.val();
            let html = `
            <li class="replyitem fr">
                <div class="chatreply">
                    <div class="replycontent">${content}</div>
                </div>
            </li>`;
            $replylist.append(html);
            $msginput.val('');
            this.replylistScrollEnd();
        },
        setVirtuallist() { // 初始化虚拟用户列表
            let virtualchatlist = this.virtualchatlist;
            $accountlist.html(this.appendlist(virtualchatlist));
        },
        /**
         * 初始化数据
         */
        setMsgChatList() {
            let friendchatlist = this.friendchatlist;
            $friendlist.html(this.appendlist(friendchatlist));
        },
        appentReplyContent(list) { // 初次添加回复列表
            let appendhtml = '';
            list.forEach(item => {
                let isMy = item.userid == this.userid ? true : false, // 是不是我
                    listClass = isMy ? 'fr' : 'fl'; // 是我居右对方左
                let content = item.content;
                let type = item.type == 1 ? true : false; //1 是文字 2是图片
                content = type ? content : `<img src="${qinniuimgser}${content}"/>`
                content = item.isdefriend == 1 ? `${content}<p class='defriend'>已被拉黑</p>` : content;
                appendhtml += `  <li class="replyitem ${listClass}">
                    <div class="chatreply">
                        <div class="replycontent">${content}</div>
                    </div>
                </li>`
            });
            $replylist.html(appendhtml);
            this.replylistScrollEnd();
        },

        setNowUser(list) { // 设置当前的虚拟账户
            $nowaccount.html(this.appendlist(list));
        },
        setNowFriend(list) { // 设置当前的聊友
            $nowfriend.html(this.appendlist(list));
        },
        blanking() { // 切换虚拟账户后置空内容
            this.cuserid = null;
            $friendlist.html('');
            $nowfriend.html('');
            $replylist.html('');
            $chatnickname.html('');
            $msginput.val('');
        },
        /**
         * @function  切换虚拟账户
         * @param {*} userid 账户id
         * @param {*} type 1 为搜索列表
         */
        changeVirtual(userid, type) {
            // 1是搜索列表的切换
            userid = parseInt(userid);
            let nowUserlist = [];
            if (type && type == 1) {
                nowUserlist = this.searchVirtualUser;
            } else {
                nowUserlist = this.virtualchatlist.filter(item => {
                    return item.userid == userid;
                });
            }
            this.userid = userid;
            this.getAccount();
            this.setNowUser(nowUserlist);
            this.blanking();
        },
        changeFriend(cuserid, type) {
            cuserid = parseInt(cuserid);
            let nowFriend = [];
            if (type && type == 1) {
                nowFriend = this.searchFriendUser;
            } else {
                nowFriend = this.friendchatlist.filter(item => {
                    return item.cuserid == cuserid;
                });
            }
            var chatNickname = nowFriend[0].nickname;
            $chatnickname.html(chatNickname);
            this.setNowFriend(nowFriend);
            this.cuserid = cuserid;
            this.getReplyContent();
        }
    }

    Chat.init();

    $accountlist.on('click', '.listitme', function() { // 切换账户
        let userid = $(this).attr('data-userid');
        Chat.changeVirtual(userid);
    });

    $accountsearchlist.on('click', '.listitme', function() {
        let userid = $(this).attr('data-userid');
        Chat.changeVirtual(userid, 1);
    });

    $friendlist.on('click', '.listitme', function() {
        let cuserid = $(this).attr('data-cuserid');
        Chat.changeFriend(cuserid);
    });

    $friendsearchlist.on('click', '.listitme', function() {
        let userid = $(this).attr('data-userid');
        Chat.changeFriend(userid, 1);
    })

    $accountsearchbtn.click(function() { // 虚拟用户搜索
        Chat.searchUser(1);
    });
    $friendsearchbtn.click(function() { // 其他用户搜索
        Chat.searchUser();
    });

    $('#sendbtn').click(function() {
        Chat.sendReplyContent();
    })




});