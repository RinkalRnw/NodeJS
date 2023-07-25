const abc = {
    name: 'abc',
    age: 18,
    sayHello:function(){
        return this.name+" "+this.age
    }
}
const xyz = {
    name: 'xyz',
    age: 25,
    sayHello:function(){
        return this.name+" "+this.age
    }
}
const pqr = [10,20,30,40]

module.exports = {
    abc,xyz,pqr
}
// module.exports = {
//     first:abc,
//     second:xyz
// }
// module.exports.first = abc;
// module.exports.second = xyz;
