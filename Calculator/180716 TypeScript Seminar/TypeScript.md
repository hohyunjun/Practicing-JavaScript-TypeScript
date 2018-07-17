# TypeScript

## 참고 URL
    TypeScript와 JavaScript의 의리있는 만남
    https://channel9.msdn.com/Events/Cloud-OS-Launch-Wave/Cloud-OS-Launch-Wave-2013/Java02

    TypeScript 2.0 - 타입스크립트 2.0 소개 및 퀵스타트 따라하기
    https://www.youtube.com/watch?v=8LmLdpKQlGw

    타입스크립트 코리아 : 2017.05 기초 세미나
    https://www.youtube.com/playlist?list=PLV6pYUAZ-ZoEBNDzOxzToMqv-V1QGlU0T

## A language for large scale JavaScript development
    TypeScript는 JavaScript 보다 좀 더 체계적으로 프로그래밍을 할 수 있게끔  
    Type을 정의한다.  
    JavaScript에는 없는 Type System 구현.

    - Script 언어의 종류
     TypeScript, DART, CoffeeScript
     공통점 : 오픈소스 기반의 스크립트 언어
     TypeScript URL : http://typescript.codeplex.com/
     TypeScript는 브라우저나 플랫폼에 상관없이 다 실행가능하다.

## A typed superset of JavaScript
    TypeScript를 Compile 하면 JavaScript가 나온다.
    JavaScript와 100% 호환  
    TypeScript는 아래와 같은 형태를 가진다.  
    ```
    function f(x:string){
        alert(x);
    }
    f("Hello");
    ```
    - Anders Hejlsberg  
    TypeScript 개발자. C#, Linq, Visual J++ 개발자.  

## Contextual Typing : 맥락이 있는 타이핑
    ```
    function f(s1:string, s2:string){
        var result = s1 + s2; // 맥락에 의해 result의 타입은 String으로 결정된다.  
    }
    ```
    http://www.typescriptlang.org/

## Type System
    구조적으로 타입을 선언할 수 있고 추론할 수 있게 된다.  
    제네릭을 사용할 수 있다.  
    기존의 자바스크립트 라이브러리와 함께 사용 가능하다.  
    툴에서 강력한 지원이 가능하다.  

    자바스크립트의 문제점
    ```
    function f(x){
        x.name = "foo";
        var v = x + x;
        alert(v);
    }
    f("Hello");
    ```
    놀랍게도 위의 코드가 실행이 된다.  
    x의 name에 대한 명시가 없는데도 실행이 되는 이상한 상황.

    TypeScript 를 이용한 예시
     - x를 구조체로 선언할 경우
    ```
    function f(x: {a:number, b:string}){
        x. // . 을 찍는 순간 a,b 를 툴에서 보여준다.
           // 타입이 있기 때문에 가능한 것.
    }
    ```

## Classes, Interfaces, Modules
    규모있는 웹 어플리케이션 개발을 위해서 필수적인 요소들 : Class, Interfaces, Modules 코드를 명확하게 정리하게 해 준다.  
    최근 정의되고 있는 표준의 준수 : Class와 람다식은 ECMAScript 6 에 정의된 내용들이다.  
    모듈 시스템은 최근 스크립트 개발 방식의 정석 : CommonJS, AMD module등 다양한 모듈들이 집단 개발 지성을 이끌고 있다.  

    인터페이스는 왜 사용하는 것일까?  
     - 다중 상속이 불가능해서 부분적으로 구현하고 상속받아서 완성시켜나갈 때 쓴다.  
     - 전체 프로젝트의 표준을 잡을 때 인터페이스를 사용한다.  

    ```
    interface Human{
        name:string;
        eat(food:string):void;
    }
    //Human을 구현하는 클래스
    class Employee implements Human{
        name:string;
        eat(food:string){
            
        }
    }

    //Employee를 상속받는 클래스
    class Programmer extends Employee{
        code(){

        }
    }
    ```
    위 타입스크립트 코드를 컴파일하면 해당코드를 나타내는 JavaScript 코드를 얻을 수 있다.  

## Node.js 를 통한 예시
    Node.js의 장점은, 자바스크립트를 이용해서 코딩을 하면 서버사이드에서 동작하는 서비스를 만들 수 있다는 것.  
    가장 큰 장점이자 단점이 JavaScript.

    ### Node.js
     - Server Side Script로 JavaScript 사용
     - Google V8 Engine + Event Loop 방식으로 빠른 성능
     - JSConf 의 라이언 딘이 개발  

     ** Event Loop : 놀이공원에서 번호표 뽑아놓고 있다가 번호 불리면 가서 놀이기구 타는 원리  

     Azure 사용
     Cordova : TypeScript만으로 iOS, Android app 개발 가능

## TypeScript 2.0 - 타입스크립트 2.0 소개 및 퀵스타트 따라하기
    클래스 기반 객체지향
    강력한 형식
    
    큰 규모의 JavaScript 개발은 어렵다.
     - 유지보수가 어렵다.
     - 자바스크립트는 웹 언어의 어셈블리어이다.
    
    TypeScript는 생상적이고 재미있게 개발하기 위한 큰 규모의 JavaScript 개발을 위한 언어.

    TypeScript는 컴파일시 JavaScript 자체로 변환된다.
     --> TypeScript는 JavaScript의 확대집합(SuperSet)

     타입스크립트 -> TSC로 컴파일 -> 자바스크립트
      : 개발은 TypeScript, 실제 사용은 JavaScript

    타입스크립트의 장점
    1. 강력한 형식으로 도구의 도움 지원 : 컴파일 타임 디버깅, 인텔리센스
    2. 미래에서 온 기능들 사용 가능 : ECMAScript ES6, ES7 ...
    3. 묶어서 관리(Class)

    간단히 말해 TypeScript는 JavaScript를 더 편하게 사용할 수 있도록 도와준다.

    VS code도 TypeScript 기반으로 만들어졌고, AngularJS도 TypeScript 기반으로 만들어졌다. 

## TypeScript 2.0 Quick Start
    .ts 확장자로 파일을 만들고, "tsc 파일이름.ts" 를 명령창에 치면, 컴파일된 .js파일이 나타난다.
    컴파일된 .js파일을 "node 파일명.js" 명령을 통해 실행해 볼 수 있다.

    기존 OOP 언어의 기능들을 TypeScript를 통해 가이드를 받아가면서 편하게 개발 가능하다.

    Compile Time Checking, Debugging이 가능하다.