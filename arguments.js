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

// setTimeout(sennacy.meow.myBind(sennacy, 1,2,3,4,5),1000);

// var curriedSum = function(num) {
//   var times = arguments[0];
//   var args = [].slice.call(arguments, 1);
//   var allArgs = arguments;
//   // if args === num + 1 retrun function with args already set
//   if (args.length === num) {
//     var sum = 0;
//     args.forEach(function(el) {
//       sum += el;
//     });
//     return sum;
//   } else {
//     return (function (num) {
//       this.arguments = allArgs;
//       console.log(this.arguments);
//       arguments[arguments.length] = num;
//       // return curriedSum;
//     })
//   };
// }


var curriedSum = function(numArgs){
  var numbers = [];

  var _curriedSum = function(num){
    numbers.push(num);
    if (numbers.length === numArgs){
      var sum = 0;
      numbers.forEach(function(el) {
        sum += el;
      });
      console.log(sum)
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}



var f1 = curriedSum(3);
console.log(f1);
var f2 = f1(4);
console.log(f2);
var f3 = f2(20);
console.log(f1);
var result = f3(6); // = 30
console.log(result);

















































//
