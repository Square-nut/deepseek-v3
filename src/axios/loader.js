const parseKey = (key) => {
	try {
		const keyArr = key.split('.')
		return {
			name: keyArr.pop(),
			path: keyArr.join('/'),
		}
	} catch (e) {
    new Error('key格式不正确，请使用 aaaa.ccc')
	}
}
export default (key) => {
	try {
    const protocolReg = /^(http|https):\/\//i
    if(protocolReg.test(key)) {
      return {
        key,
        isUrl: true
      }
    }
		const { name, path } = parseKey(key)
		const module = require('@api/' + path)
		return {
			key,
			api: module[name],
			module,
      config: module.$CONFIG
		}
	} catch (e) {
		throw new Error(e)
	}
}
