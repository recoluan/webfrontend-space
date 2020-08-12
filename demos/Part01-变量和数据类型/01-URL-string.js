// URL地址问号传参解析
var str = 'http://www.zhufengpeixun.cn/stu/?lx=1&name=AA&sex=man#teacher';
// 需要判断有没有'#'号，最终结果：{lx: "1", name: "AA", sex: "man",HASH:"teacher"}


// 方法一：使用字符串方法
// var strAsk = '';
// if (str.indexOf('#') > -1) {
//     strAsk = str.slice(str.indexOf('?') + 1, str.indexOf('#'));
// } else {
//     strAsk = str.slice(str.indexOf('?') + 1);
// }//=>"lx=1&name=AA&sex=man"
//
// // var arySearch = strAsk.split('&'),//["lx=1", "name=AA", "sex=man"]
// //     obj = {};
// // for (let i = 0; i < arySearch.length; i++) {
// //     var key = arySearch[i].split('=')[0],
// //         value = arySearch[i].split('=')[1];
// //     obj[key] = value;
// // }//=>{lx: "1", name: "AA", sex: "man"}
//
// if (str.indexOf('#') > -1) {
//     let strHash = str.slice(str.indexOf('#') + 1);//"teacher"
//     obj['HASH'] = strHash;
// }
// console.log(obj);


// 方法二：使用a标签，操作DOM元素对象的属性
// 步骤：
// 1）创建一个a标签，把需要解析的地址当做a标签的href赋值
//=>a标签无需添加到页面中，我们只是想要利用它的属性而已
// 2）a元素对象的hash / search两个属性分别存储了哈希值和查询参数值
// 3）分别解析出hash和参数即可
function queryURLParameter(str) {
    const link = document.createElement('a');
    
    link.href = str;

    const askStr = link.search.slice(1),//=>"lx=1&name=AA&sex=man"
        askAry = askStr.split('&'),//=>["lx=1", "name=AA", "sex=man"]
        obj = {};

    for (let val of askAry) {
        const key = val.split('=')[0],
            value = val.split('=')[1];
        
            obj[key] = value;
    }
    
    // 没有'#'号时，hash为空字符串，在if语句中会自动转为false
    if (link.hash) {
        const hashStr = link.hash.slice(1);//=>"teacher"
        
        obj.HASH = hashStr;
    }
    return obj;
}

queryURLParameter(str);


//方法三：使用正则
//真实的项目，手动改字符串可能会有很多不确定性，可能=号后面没有值，也可能没有=号。所以一般用正则来处理。
// var str = 'http://www.zhufengpeixun.cn/stu/?lx=1&name=AA&sex=man#teacher';
// 需要判断有没有'#'号，最终结果：{lx: "1", name: "AA", sex: "man",HASH:"teacher"}

// let str = 'http://www.zhufengpeixun.cn/stu/?name=AA&age=25&sex=0#teacher',
//     ary = str.substring(str.indexOf('?') + 1).split(/(?:\?|&|#)/g),//["name=AA", "age=25", "sex=0", "teacher"]
//     obj = {};
// ary.forEach(item => {
//     if (item.indexOf('=') > -1) {
//         let key = item.split('=')[0],
//             value = item.split('=')[1];
//         obj[key] = value;
//     }
// });
// if (str.indexOf('#') > -1) {
//     obj['HASH'] = ary.pop();
// }
// // 代码优化
// // str.indexOf('#') > -1 ? obj['HASH'] = ary.pop() : null;
// console.log(obj);


