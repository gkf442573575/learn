
!(function(golbal) {

    var Public = function() {

    };
    Public.prototype = {
        /**
         * 根据url获取页面的参数
         */
        getQuerry: function(url) {
            var urlReg = /\?(.*)/,
                query = {};
            if (urlReg.test(url)) {
                var str = urlReg.exec(url)[1],
                    urlArr = str.split("&"),
                    queryReg = /(.*)\=(.*)/;
                urlArr.forEach(function(item, index) {
                    var execArr = queryReg.exec(item),
                        key = execArr[1],
                        val = execArr[2];
                    query[key] = val;
                });
            }
            return query;
        }

    }

    golbal.Public = golbal.$public = new Public();
})(window);