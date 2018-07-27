// 표준
interface IEarth{
    gogogo();
}
// 다중상속
interface IKorea{
    gogo();
}

class Car implements IEarth, IKorea{
    name: string;
    constructor(public color: string, name:string){
        this.name = name;
    }
    gogo(): string{
        return `${this.color} 색 ${this.name} 자동차가 달립니다.`;
    }
    gogogo(): void{

    }
}

var car = new Car("Red", "KIA");

console.log(car.gogo());

var myCar = new Car("Blue", "Hyundai");

console.log(myCar.gogo());