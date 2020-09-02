;(function anonymous(window) {
    //=>基于PROMISE设计模式管理AJAX请求
    let ajaxPromise = function ajaxPromise(options) {
        //=>OPTIONS中融合了:默认配置信息、用户基于DEFAULTS修改的信息、用户执行GET/POST方法时候传递的配置信息，越靠后的优先级越高
        let {url, baseURL, method, data, dataType, headers, cache, params} = options;
        //=>把传递的参数进一步进行处理
        if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(method)) {
            //=>GET系列
            if (params) {
                url += `${ajaxPromise.checkAsk(url)}${ajaxPromise.formatData(params)}`;
            }
            if (cache === false) {
                url += `${ajaxPromise.checkAsk(url)}_=${+(new Date())}`;
            }
            data = null;//=>GET系列请求主体就是什么都不放
        } else {
            //=>POST系列
            if (data) {
               data = ajaxPromise.formatData(data);
            }
        }

        //=>基于PROMISE发送AJAX
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open(method, `${baseURL}${url}`);
            //=>如果HEADERS存在,我们需要设置请求头
            if (headers !== null && typeof headers === 'object') {
                for (let key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        let val = headers[key];
                        if (/[\u4e00-\u9fa5]/.test(val)) {
                            //=>VAL中包含中文：我们把它进行编码 / 解码
                            //encodeURIComponent/decodeURIComponent
                            val = encodeURIComponent(val);
                        }
                        xhr.setRequestHeader(key, val);
                    }
                }
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (/^(2|3)\d{2}$/.test(xhr.status)) {
                        let result = xhr.responseText;
                        dataType = dataType.toUpperCase();
                        dataType === 'JSON' ? result = JSON.parse(result) : (dataType === 'XML' ? result = xhr.responseXML : null);
                        resolve(result);
                        return;
                    }
                    reject(xhr.statusText);
                }
            };
            xhr.send(data);
        });
    };
    //=>把对象转换为URLENCODED格式的字符串
    ajaxPromise.formatData = function formatData(obj) {
        let str = ``;
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                str += `${attr}=${obj[attr]}&`;
            }
        }
        return str.substring(0, str.length - 1);
    };
    ajaxPromise.checkAsk = function checkAsk(url) {
        return url.indexOf('?') > -1 ? '&' : '?';
    };
    //=>设置默认的参数配置项
    let _default = {
        baseURL: '',
        headers: {},
        dataType: 'JSON',
        data: null,//=>POST系列请求基于请求主体传递给服务器的内容
        params: null,//=>GET系列请求基于问号传参传递给服务器的内容
        cache: true
    };
    //=>把默认配置暴露出去,后期用户在使用的时候可以自己设置一些基础的默认值(发送AJAX请求的时候按照用户配置的信息进行处理)
    ajaxPromise.defaults = _default;

    //=>GET
    ['get', 'delete', 'head', 'options'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, options = {}) {
            options = {
                ..._default,//=>默认值或者基于defaults修改的值
                ...options,//=>用户调取方法传递的配置项
                url: url,//=>请求的URL地址(第一个参数:默认配置项和传递的配置项中都不会出现URL，只能这样获取)
                method: item.toUpperCase()//=>以后执行肯定是ajaxPromise.head执行，不会设置METHODS这个配置项，我们自己需要配置才可以
            };
            return ajaxPromise(options);
        };
    });

    //=>POST
    ['post', 'put', 'patch'].forEach(item => {
        ajaxPromise[item] = function anonymous(url, data = {}, options = {}) {
            options = {
                ..._default,
                ...options,
                url: url,
                method: item.toUpperCase(),
                data: data
            };
            return ajaxPromise(options);
        };
    });
    window.ajaxPromise = ajaxPromise;
})(window);
//=>加all
//=>拦截器   在返回的Promise中加一个then
// axios.interceptors.response.use(result => result.data);
/* ajaxPromise.defaults.transformRequest = data => {
       let str = ``;
       for (let key in data) {
           if (data.hasOwnProperty(key)) {
               str += `${key}=${data[key]}&`
           }
       }
       return str.substring(0, str.length - 1);
   };*/

/*ajaxPromise.defaults.baseURL = 'https://www.easy-mock.com/mock/5b0412beda8a195fb0978627/temp';
ajaxPromise.get('/list', {
    params: {
        name: 'chen',
        age: 18
    },
    headers: {xxx: '111'}
}).then(result => {
    console.log(result);
});
ajaxPromise.post('/add', {
    name: 'chen',
    age: 18
}, {
    headers: {xxx: 'post'},
    dataType: 'JSON'
});*/
