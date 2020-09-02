let Promise = require('./backup/01.js');
let p1 = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        //Math.random() < 0.5 ? resolve(100) : reject(-100);
        resolve(100);
    }, 1000);
});
let p2 = p1.then((result) => {
    return result + 100;
}, (reason) => {
    console.log('no', reason);
});
let p3 = p2.then((result) => {
    console.log(result);
}, (reason) => {
    console.log('reason');
});
console.log(3);





