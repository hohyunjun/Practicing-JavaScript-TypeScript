var Car = /** @class */ (function () {
    function Car(color, name) {
        this.color = color;
        this.name = name;
    }
    Car.prototype.gogo = function () {
        return this.color + " \uC0C9 " + this.name + " \uC790\uB3D9\uCC28\uAC00 \uB2EC\uB9BD\uB2C8\uB2E4.";
    };
    Car.prototype.gogogo = function () {
    };
    return Car;
}());
var car = new Car("Red", "KIA");
console.log(car.gogo());
var myCar = new Car("Blue", "Hyundai");
console.log(myCar.gogo());
