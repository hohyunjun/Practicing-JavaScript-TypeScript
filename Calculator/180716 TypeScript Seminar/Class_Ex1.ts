// Ex1. 아래 자바스크립트를 TypeScript 형태로 표현하시오.
// function Car(name){
//     this.name = name;
//     this.speed = 0;

//     this.honk = function(){
//         console.log("부우우웅");
//     };

//     this.accelerate = function(speed){
//         this.speed = this.speed + speed;
//     }
// }

//public 인 부분을 InterFace로 빼서 구현

interface ICar{
    honk(): void;
    accelerate(speed: number): void;
    getSpeed(): number;
}

class Car implements ICar {
    private _speed: number = 0;
    constructor(private name: string) {

    }
    public honk(): void {
        console.log("부우우웅");
    }
    public accelerate(speed: number): void {
        this._speed = this._speed + speed;
    }

    public getSpeed(): number {
        return this._speed;
    }
}

const car: ICar = new Car("BENZ");
car.honk();
console.log(car.getSpeed());
car.accelerate(10);
console.log(car.getSpeed());