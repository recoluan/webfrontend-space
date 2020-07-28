//实现数组去重
//方案一：使用双for循环
// 步骤：
// 1. 分别拿出数组中的每一项（排除最后一项：最后一项后面没有需要比较的内容）
// 2. 当前拿出的项和后面的每一项依次比较
// 3. 后面如果有重复的，在原数组中删掉（splice）
//
// 缺点：双for循环非常浪费性能

// var ary = [1, 2, 4, 3, 3, 2, 5, 3, 1];
// for (var i = 0; i < ary.length - 1; i++) {
//     for (var k = i + 1; k < ary.length; k++) {
//         if (ary[i] === ary[k]) {
//             ary.splice(k, 1);//=>删除后不能让k累加了
//             k--;
//         }
//     }
// }
// console.log(ary);

//这样写会导致`数组塌陷问题`：当我们把当前项删除后，后面的每一项都要向前进一位，原数组的索引发生了改变。
// 删除后，我们的k继续累加，下一次再操作的话就会跳过一位。



//方案二：基于对象的属性名不能重复，我们实现高性能的数组去重
//1、创建一个空对象
//2、依次遍历数组中的每一项，把每一项存储的值，当做对象的属性名和属性值存储起来
//第一次循环 1  {1:1}
//第二次循环 2  {1:1,2:2}
//第三次循环 3  {1:1,2:2,3:3}
//第四次循环 2  我们在存储之前做一个判断，判断当前对象中是否已经存在这个属性名了，如果存在，说明之前有这一项存储的操作，进一步说明之前数组中出现过这个数值了（也就是重复了，此时我们把当前项在数组中移除即可）

var ary = [1, 2, 3, 2, 2, 3, 4, 3, 4, 5];
var obj = {};
for (var i = 0; i < ary.length; i++) {
	var item = ary[i];
	if (obj[item] !== undefined) {
		//条件也可以写成typeof obj[item]!=='undefined'，对象中已经存在这个shum
		// ary.splice(i,1);
		// i--;
		//这种删除方式不好，如果数组很长，删除某一项，后边的索引都需要重新计算一遍
		// 更好的办法：拿到数组中的最后一项，替换当前项，然后删除最后一项，相当于只动最后一项的索引
		ary[i] = ary[ary.length - 1];
		ary.length--;
		i--;
		continue;
	}
	obj[item] = item;
}


// 方案三：基于面向对象实现
// Array.prototype.myUnique = function() {
// 	//=>方法中的this一般都是当前类的实例，也就是我们操作的数组
// 	let obj = {};
// 	for (let i = 0; i < this.length; i++) {
// 		let item = this[i];
// 		//条件：obj[item]
// 		obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.pop(), i--) : obj[item] = item;
// 	}
// 	obj = null;
// 	return this;
// };
// var ary = [1, 3, 2, 3, 2, 7, 9, 21, 2, 3];
// //去除数组中的最大项
// ary.myUnique();

//如果加一个条件呢：不修改原数组
//1.将原数组复制一份，以后的操作都基于这个副本，然后返回这个副本



const arr = [1, 1, 2, 3, 5, 4, 5, 3, 4, 'a', 'b', 'a'];
//方法一：使用[…new Set(arr)] 或 Array.from(new Set(arr))

//方法二：使用 forEach() 和 includes()
const newArr = []
arr.forEach(item => {
	if (!newArr.includes(item)) {
		newArr.push(item);
	}
});
console.log(newArr);

//方法三：使用 reduce() 和 includes()
let newArr = arr.reduce((pre, cur) => {
	if (!pre.includes(cur)) {
		pre.push(cur);
	}
	return pre;
}, []);
console.log(newArr);

//方法四：使用 filter() 和 indexOf()
const newArr = arr.filter((item, index, array) =>
	array.indexOf(item) === index);
console.log(newArr);

