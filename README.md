Bodewell Resource Node
======================

```js
const Node = require("bodewell-node");

var foo, fruit;

function MyFoo() {
    Node.init(this);
}

Node.mix(MyFoo);

foo = new MyFoo();

foo.attach("apple", new Fruit());
foo.attach("orange", new Fruit());

Object.keys(foo.attachments()).forEach(key => {
    console.log(foo.attached(key).name);
    foo.detach(key);
});
```
