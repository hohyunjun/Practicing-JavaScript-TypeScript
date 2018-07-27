## TypeScript?
    TypeScript는 '프로그래밍 언어' 이다.
    타입스크립트는 'Compiled Language' 이다.
        전통적인 Compiled Language 와는 다른 점이 많다.
        그래서 Transpile 이라는 용어를 사용하기도 한다.
    자바스크립트는 'Interpreted Language' 이다.

    가장 중요한 것은 Type!!

    정적 타입 언어 VS 동적 타입 언어
     - 정적 타입 언어 : 미리 타입을 지정해 놓고 시작하는 언어
     - 동적 타입 언어 : 타입 자체가 변화하는 언어
    
    TypeScript는 정적 타입 언어의 장점만 가져와 보자!! 라고 해서 만들어진 것.
    Type Checking을 통해 Test Coverage를 줄여보자.

    결과적으로 알아야 할 것
     - TypeScript 문법
     - TypeScript가 JavaScript로 변환되는 과정에서 컴파일러 옵션을 통해 어떻게 제어할 수 있는지.  
     - 컴파일을 도와주는 어떤 역할을 하는 도구에는 어떤 것이 있는지.
      
## TypeScript Setting

    - Compiler Setting
        1. 아래 명령어로 tsconfig.json 파일을 만든다.
            tsc --init
        2. tsconfig.json 파일
            target, module 등을 설정할 수 있는데, rule 이 있다.

    - Visual Studio Code(IDE)
        VS Code에 컴파일러가 내장되어 있다.
        내장된 컴파일러 버전은 VS Code가 업데이트 되면서 올라간다.
        따라서, 컴파일러 버전과 VS Code의 버전은 상관관계가 있다.
        내장된 컴파일러를 선택할 수 있고, 직접 설치한 컴파일러를 선택할 수도 있다.
    
    - tslint?
        coding Convention을 맞춰준다.(문법적 오류 X)
        코딩 규약을 관리하는 것.

    - Compiler Options
        http://json.schemastore.org/tsconfig
        최상위 프로퍼티
        compileOnSave : true/false, 저장 시 자동으로 컴파일 할것인지
        extends
        compileOptions
        아래 3개의 설정이 없으면, tsc 입력했을 때 모든 ts파일 컴파일
        files
        include
        exclude

## TypeScript Basic Types

    - TypeScript에서 프로그램 작성을 위해 기본 제공하는 데이터 타입.
    - 사용자가 만든 타입은 결국은 이 기본 자료형들로 쪼개집니다.
    - JavaScript의 기본 자료형을 포함(SuperSet)
        ECMAScript 표준에 따른 기본 자료형은 6가지
         - Boolean
         - Number
         - String
         - Null
         - Undefined
         - Symbol
         - Array : object형
    - 추가적으로 프로그래밍을 돕는 몇 가지 타입 제공
        - Any : 어떤 타입이어도 상관없는 타입. 이걸 최대한 쓰지 않는게 핵심.
        - Void
        - Never : return에 주로 사용됨. 잘 사용되지 않음.
        - Enum
        - Tuple : object

    - Primitive Type
        오브젝트와 레퍼런스 형태가 아닌 실제 값을 저장하는 자료형
        프리미티브 형의 내장 함수를 사용 가능한 것은 자바스크립트 처리 방식 덕분
    
    - Template String
        행에 걸쳐 있거나, 표현식을 넣을 수 있는 문자열
        이 문자열은 backtick(`) 기호에 둘러싸여 있다.
        포함된 표현식은 `${expr}` 와 같은 형태로 사용한다.

    - Undefined & Null
        undefined와 null 은 실제로 각각 undefined 와 null 이라는 고유한 타입을 가진다. 
        다른 모든 타입의 SubType 이다
        ----> number, string 등에 null 값을 넣을 수 있다.
        null : null 이라는 값으로 할당된 것을 null이라고 한다.
               무언가가 있는데, 사용할 준비가 덜 된 상태.
        undefined : 값을 할당하지 않은 변수.
                    무언가가 아예 준비가 안 된 상태.
    
    - Array
        타입[]
        Array<타입>

    - Tuple
        배열인데 타입이 한가지가 아닌 경우
        tu: [number, string] = [0, "일"];
        위와같은 형태
    
    - Enum
        C에서 보던 것과 같음.

        enum Color {Red, Green, Blue}
        let c: Color = Color.Green;

## var, let, const

    - var
        ES5
        변수의 유효 범위 : 함수 스코프
        재선언 가능(var a 이후 똑같이 var a가 가능)
        호이스팅 가능(변수 선언이 사용 이후에 와도 된다.)
    
    - let, const
        ES6
        변수 유효 범위 : 블록 스코프(친숙)
        호이스팅 불가
        재선언 불가.

    결론적으로, var 말고 let이나 const를 사용하는 것이 코드를 읽기가 편하다.

    Hoisting 예시
    ```
    console.log(hoisted_var);
    var hoisted_var = '변수를 아래에서 선언했는데 사용이 위에서 가능';

    console.log(hoisted_let); // Error!!
    let hoisted_let = '변수를 아래서 선언했는데 사용이 위에서 불가';
    ```

    Redeclare
    ```
    var redeclare_var:string = '한번 선언 했는데';
    var redeclare_var:string = '또 선언이 가능';
    // 하지만 var에서 재선언 시에도 타입이 같아야 함.

    let redeclare_let = '한 번 선언 했기 때문에';
    let redeclare_let = '또 선언이 불가'; // Error!!
    ```

    let과 const의 타입 추론
    ```
    let a:string = '에이'; // 명시적 string
    let b = '비이'; // 타입 추론에 의한 타입인 string

    const c:string = '씨이'; // 명시적 string
    const d = '디이'; // 타입 추론에 의한 리터럴 타입 '디이'
    ```
    let 을 쓰는 경우는 값 자체가 바뀔 수 있다는 여지를 주는 경우에
    const는 값 자체를 바꿀 일이 없을 때 : JavaScript 개발 시 주로 사용된다.

## Type assertion, alias

    형 변환과는 다르다.
    형 변환은 실제 데이터 구조를 바꿔준다.
    '타입이 이것이다'라고 컴파일러에게 알려주는 것을 의미한다.
    문법적으로는 두 가지 방법이 있다.
        변수 as 강제할 타입 : 추천
        <강제할 타입>변수
    주로 넓은 타입에서 좁은 타입으로 강제하는 경우.

    ```
    let someValue: any = 'this is a string';
    
    let strLength: number = (<string>someValue).length;
    let strLength: number = (someValue as string).length;
    ```

    - Type Alias
        타입 별칭
        인터페이스와 유사하다.
        만들어진 타입의 refer로 사용하는 것이지 타입을 만드는 것은 아니다.
    
    Union Type과 연계한 예시
    Union Type은 any보다는 조금 더 특정화된 형태의 타입
    ```
    let a: any;
    type StringOrNumber = string | number; // Type Aliasing

    let b: StringOrNumber // Union Type

    b = '스트링';
    b = 0;

    function test(arg: StringOrNumber): StringOrNumber{
        return arg;
    }
    ```

    Aliasing Tuple
    Tuple은 Array 처럼 생겼는데, 요소들의 타입이 다를 수 있는 Array
    ```
    let person: [string, number] = ['Mark', 35];

    type PersonTuple = [string, number];

    let another: PersonTuple = ['Anna', 24];
    ```

    Type Alias 와 keyof 키워드 사용하기
    https://www.youtube.com/playlist?list=PLV6pYUAZ-ZoE8uRXG51003heNA0EATlxN

    Interface와 Type Alias의 차이점?
    ```
    type Alias = {num:number}

    interface Interface{
        num:number;
    }

    declare function aliased(arg: Alias): Alias;
    declare function interfaced(arg: Interface): Interface;

    // type Alias는 object literal type로
    // interface는 interface로
    ```

    ```
    type PersonAlias = {
        name:string;
        age:number;
    };

    interface IPerson extends PersonAlias{

    }

    let ip:Iperson = {
        name:'Mark',
        age:35
    };

    class PersonImpl implements PersonAlias{
        name: string;
        age: number;
        hello(){
            console.log('안녕하세요');
        }
    }

    let pi: PersonImpl = new PersonImpl();
    pi.hello();

    class PersonChild extends PersonAlias{
    
    // type alias 끼리는 extends, implements 불가
    // interface extends type alias 가능
    // class implements type alias 가능
    // class exends type alias 불가
    // 마치 interface 처럼 동작한다.
    // 다른것을 상속받을 수는 없다.
    }
    ```

    // Type alias 와 interface는 실제 JavaScript 코드에 반영되지 않음.
    // 컴파일 시 확인을 하는 의미에서 쓰인다.

## Interface

    ```
    // interface가 존재하지 않는 상황
    const person: {name:string; age:number} = {
        name: 'Mark',
        age: 35
    };
    // 위에서 Person이라는 object를 설명해주는 타입은 Object literal type
    ```
    매번 {name:string; age:number}를 타입으로 입력하기는 힘들기 때문에 interface 사용
    ```
    interface Person {
        name: string;
        age: number;
    }

    const person:Person ={
        name:'Mark',
        age:35
    };

    function hello(p: Person): void{
        console.log(`안녕하세요 ${p.name} 입니다.`);
    }
    ```
    Interface Optional Property

    ```
    interface Person {
        name: string;
        age?: number; // age는 있어도 되고 없어도 된다.
    }
    ```

    Function in interface
    ```
    interface Person{
        name: string;
        hello(): string;
    }
    const person:Person = {
        name:'Mark'
        hello(): string{
            return 'Hello';
        }
    };
    ```
    class Implements interface
    ```
    interface IPerson{
        name: string;
        hello(): void;
    }

    class Person implements Iperson{
        name: string = null;
        constructor(name: string){
            this.name = name;
        }
        hello(): void{
            console.log(`안녕하세요 ${this.name} 입니다.`);
        }
    }
    const person: Person = new Person('Mark');
    // 아래처럼 하는 것도 가능!! 인터페이스에 있는 것만 구현가능.
    const person: Iperson = new Person('Mark');
    ```

    Interface의 상속도 가능하다.
    ```
    interface Person{
        name:string;
        age?:number;
    }

    interface Korean extends Person{
        city: string;
    }

    const k:Korean = {
        name:'전호현',
        city:'서울'
    };
    ```

    Indexable Type
     - 타입을 인덱스처럽 사용할 수 있다.
     - 배열형태, 딕셔너리 형태 가능.
     - string, number만 가능하다.
     - 옵셔널하다.

    ```
    interface Person{
        name: string;
        [index: string]: string;
    }
    interface Person{
        [index:number]: Person;
    }
    ```

## Class
    Abstract Class
    ```
    abstract class APerson{
        protected _name: string = 'Mark';
        abstract setName(name:string): void;
    }
    class Person extends APerson{
        setName(name: string):void{
            this._name = name;
        }
    }
    const person = new Person();
    ```
    
    Class 와 Private Constructor
     - 생성자 함수 앞에 접근제어자인 private을 붙일 수 있다.
     - 외부에서 생성이 불가능하다.
    ```
    //Singleton Pattern
    class Person{
        private static Instance: Person = null;

        public static getInstance():Person{
            if(Person.Instance === null){
                Person.Instance = new Person();
            }
            return Person.Instance;
        }

        private constructor(){

        }

        hello(){

        }
    }

    const p = Person.getInstance();
    p.hello();
    ```

## Generic
    any 쓰는 것을 지양하고, 대신 Generic을 사용한다.
    ```
    function helloString(message:string):string{
        return message;
    }
    function helloNumber(message:number):number{
        return message;
    }
    //Generic
    function hello<T>(message: T): T{
        return message;
    }
    hello('Mark');
    hello<string>(35); // Error!! 
    ```

    ```
    //Generic Array 도 가능
    function hello<T>(messages: T[]): T{
        return messages[0];
    }
    ```

    ```
    //Generic Class
    class Person<T>{
        private _name: T;
        private _age: number;

        constructor(name:T){
            this._name = name;
        }
    }

    new Person('Mark');
    ```
    ```
    // Multiple Generic
    class Person<T,K>{
        private _name: T;
        private _age: K;
        constructor(name:T, age:K){
            this._name = name;
            this._age = age;
        }
    }
    new Person('Mark', 35);
    ```
    ```
    // Type Lookup System
    interface Person{
        name: string;
        age: number;
    }

    function getProperty<T,K extends keyof T>(obj: T, key: K): T[K]{
        return obj[key];
    }

    const person: Person = {
        name: 'Mark',
        age: 35
    };

    getProperty(person, 'name');
    ```

## Iterator
    ??? Pass

## Decorator
    Class Decorator
    Method Decorator
    Property Decorator
    Parameter Decorator

    모든 Decorator는 Function이다.
    ??? Pass

## Type Inference
    기본적으로 타입을 명시적으로 쓰지 않을 때 추론하는 방법에 대한 규칙  
    let은 기본적으로 우리가 아는 기본 자료형으로 추론  
    const는 리터럴 타입으로 추론  
        오브젝트 타입을 쓰지 않으면, 프로퍼티는 let처럼 추론  
        