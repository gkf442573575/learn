# -*- coding:utf-8 -*-


import json

from websocket import create_connection


class WsClient:
    def __init__(self, ip, port):
        address = 'ws://' + ip + ':' + port
        print(address)
        self.ws = create_connection(address)

    def send_msg(self, msg):
        self.ws.send(json.dumps(msg))


if __name__ == '__main__':
    ws_clinet = WsClient('10.68.137.194', '12140')

    result = ws_clinet.ws.recv()

    print(result)
