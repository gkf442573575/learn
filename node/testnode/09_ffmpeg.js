const  NodeMediaServer  = require('node-media-server');

const config = {
    rtmp: {
        port: 11935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
    },
    http: {
        port: 38080,
        allow_origin: '*'
    }
};

const nms = new NodeMediaServer(config);
nms.run();
