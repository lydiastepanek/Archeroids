sum = function () {
  var args = [].slice.call(arguments);
  var sum = 0;
  args.forEach(function(el) {
    sum += el;
  });
  return sum;
}

//console.log(sum(1,2,3,4));

Function.prototype.myBind = function(context) {
  var fn = this;
  var args = [].slice.call(arguments, 1);
  return function() {
    fn.apply(context, args);
  }
}

function Cat(name, age) {
this.name = name;
this.age = age;
}

Cat.prototype.meow = function(name) {

  console.log(this.name);

  console.log(arguments)
}

sennacy = new Cat("sennacy", 12);

// console.log(sennacy.meow());
//
// setTimeout(sennacy.meow.myBind(sennacy),1000);

// console.log(sennacy.meow(1,2,3,5,7));

setTimeout(sennacy.meow.myBind(sennacy, 1,2,3,4,5),1000);
