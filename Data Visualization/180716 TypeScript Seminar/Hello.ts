class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

let user = new Student("Jane", "M.", "User");

console.log(user.fullName);

let myName = 'mark';
