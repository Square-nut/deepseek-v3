import axios from 'axios'
import loader from './loader'

// 拦截器
export class Interceptors {
  constructor(instance) {
    this.instance = instance
    // 初始化拦截器
    this.initInterceptors();
  }
  getInterceptors() {
    return this.instance;
  }
  initInterceptors() {
	  let service=this.getInterceptors();
	  let that=this;
    // 请求拦截器
    this.instance.interceptors.request.use(
    	function (config) {
				return config
			},
		function (error) {
				// 对请求错误做些什么
				return Promise.reject(error)
			}
		)
	  // 添加响应拦截器
	  this.instance.interceptors.response.use(
			function (response) {
				// 对响应数据做点什么
				const config = response.config;
				
				return response.data;
			},
			function (error) {
				// 对响应
				if(error&&error.response){
					that.errorHandle(error);
				}
				return Promise.reject(error)
			}
		)
	}
	/**
	 * http握手错误
	 * @param res  响应回调,根据不同响应进行不同操作
	 */
	errorHandle(error) {
		let res=error.response.data;
		///请求状态吗或者业务吗
		let code=error.response.status;
		const msg = res.message;
		return Promise.reject(error.response.data);
	}
}

// 主实例
class HttpService {
  constructor(options = {}) {
    this.axios = axios.create();
    this.options = options;
    // 添加拦截器
    new Interceptors(this.axios);
  }
  /**
   *
   * @param url
   * @param params
   * @returns
   */
  request(url, params,headers) {
    // 得到解析数据
    const { api, config } = loader(url);

    let apiConfig = api(params)

    // 合并策略  全局配置-->模块配置-->单独配置
    let options = Object.assign({}, this.options, config, apiConfig);

    const isGet =
      typeof options.method === "undefined" ||
      "post,put,patch".indexOf(options.method.toLowerCase()) === -1;
    // 加时间戳防止缓存
    if (isGet) {
      let _cache = options.cache === false ? { _t: +new Date() } : {};
      options.params = { ..._cache, ...options.params };
    }
    ///保存传递的header
    options.headers = Object.assign({}, options.headers,headers);
    if (options.data && options.emulateJSON) {
      // 模拟表单提交
      options.headers = Object.assign({}, options.headers, {
        "Content-Type": "application/x-www-form-urlencoded"
      });
      options.data = Qs.stringify(options.data);
    }
    const _axios = this.axios;
    return new Promise((resolve, reject) => {
      _axios
        .request(options)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * 请求
   * @param result     结果
   * @param resolve
   */
  handleResult (result, resolve) {
    resolve(result)
  }
}

const api = new HttpService({
  debug: false,
  baseURL: __lq.baseURL,
  timeout: __lq.timeout,
  cache: false,
  emulateJSON: false, // 将请求数据转换为表单数据格式，并设置请求头的 Content-Type 字段为 application/x-www-form-urlencoded
  showLoading: false
})

export default api