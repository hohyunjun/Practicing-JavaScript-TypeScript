// Ex1. 아래 자바스크립트를 TypeScript 형태로 표현하시오.
// function Car(name){
//     this.name = name;
//     this.speed = 0;
var Car = /** @class */ (function () {
    function Car(name) {
        this.name = name;
        this._speed = 0;
    }
    Car.prototype.honk = function () {
        console.log("부우우웅");
    };
    Car.prototype.accelerate = function (speed) {
        this._speed = this._speed + speed;
    };
    Car.prototype.getSpeed = function () {
        return this._speed;
    };
    return Car;
}());
var car = new Car("BENZ");
car.honk();
console.log(car.getSpeed());
car.accelerate(10);
console.log(car.getSpeed());
