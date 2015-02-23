// function Surrogate(){
// };
//
// Surrogate.prototype = SuperClass.prototype;
//
// Subclass.prototype = new Surrogate();

Function.prototype.inherits = function(SuperClass) {
  function Surrogate(){  };
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
}

// function MovingObject () {
//   this.name = "Jack";
// };
//
// function Ship () {
//   this.height = 30;
// };
//
// Ship.inherits(MovingObject);

function Animal (name) {
  this.name = name;
}

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog (name, coatColor) {
  Animal.call(this, name);
  this.coatColor = coatColor;
};

// Set Dog.prototype to a new object whose
// __proto__ points to Animal.prototype.
// Dog.prototype = Object.create(Animal.prototype);
Dog.inherits(Animal);

Dog.prototype.bark = function () {
  console.log("Bark!");
};


var dog = new Dog("spot", "blue");
dog.sayHello();

var cow = new Animal("moo");
cow.bark();



// function Asteroid () {};
// Asteroid.inherits(MovingObject);
