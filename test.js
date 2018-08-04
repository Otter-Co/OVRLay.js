let t = class {};

Object.defineProperty(t, 'name', {value: 'Test'});

let r = new t;
console.log(r)