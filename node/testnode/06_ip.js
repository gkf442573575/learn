
const os = require('os')
const defaultGateway = require('default-gateway')
const address = require('address')
const result = defaultGateway.v4.sync()
console.log('result', result)
const ip = address.ip(result && result.interface)
console.log('ip', ip)

const getNetworkIp = () => {
	let needHost = ''; // 打开的host
	try {
		// 获得网络接口列表
		let network = os.networkInterfaces();
		for (let dev in network) {
			let iface = network[dev];
			for (let i = 0; i < iface.length; i++) {
				let alias = iface[i];
				if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
					needHost = alias.address;
				}
			}
		}
	} catch (e) {
		needHost = 'localhost';
	}
	return needHost;
}
 
console.log('ip>>>>', getNetworkIp())