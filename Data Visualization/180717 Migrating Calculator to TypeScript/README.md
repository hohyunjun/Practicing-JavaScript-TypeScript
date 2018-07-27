# <과제>
오늘은 타입스크립트를 좀 더 살펴봐주시고, 기존 계산기 프로젝트를 타입스크립트 코드로 재작성(?)하기 시작해주세요.  
오늘 안에 다 못끝내도 괜찮아요. 차트 3종중에 여러분이 직접 만든 SVG생성 부분이 가장 중요해요  

# <과제 수행사항>

## 1. Calculator 프로젝트 폴더에 작업환경 설정

   ### 1.1 참고한 URL
https://engineering.huiseoul.com/migrating-from-javascript-to-typescript-5f32a81099e4

   ### 1.2 tsconfig 설정
   ```
    {
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "outDir": "src",
        "sourceMap": true,
        "target": "es2015",
        "jsx": "react"
    },
    "include": [
        "ts/**/*"
    ]
    }
   ```
   include를 통해 컴파일의 대상이 될 경로를 지정했다.  
   앞으로 만들 타입스크립트 파일은 모두 ts 디렉토리 하위에 두도록 하고, *.ts 또는 *.tsx를 대상으로 한다.  
   outDir에는 컴파일된 결과물을 저장하는 디렉토리를 지정했다.  
   결과물은 src 디렉토리 내부에 생성된다.

   ### 1.3 .vscode 설정
   VSCode에서 기본설정 외에 User 혹은 Workspace 범위로 설정을 특정하는 기능을 사용해보았다.
   Calculator Project 최상위에 .vscode 디렉토리를 만들고 그 안에 tasks.json을 아래와 같이 채워넣고 저장했다.
   ```
    {
    "version": "0.1.0",
    "command": "tsc",
    "isShellCommand": true,
    "args": [
        "-w",
        "-p",
        "."
    ],
    "showOutput": "silent",
    "isBackground": true,
    "problemMatcher": "$tsc-watch"
    }
   ```
   윈도우에서 ctrl+shift+b 버튼을 누르면 태스크가 실행되고 결과를 출력한다.

## 2. ts 파일의 오류 수정
- error TS2531: Object is possibly 'null'  
    Non-null assertion operator를 사용하여 수정하였다.  
    자세한 내용은  
     https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator  
    참조.

- TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.  
    해당 함수에 this의 타입을 지정해주었음.
    ```
    document.getElementById(displayId)!.addEventListener('DOMSubtreeModified', function (this:HTMLElement) { // 중간값 계산
        changeMidValue(this);
    });
    ```

- TS2345: Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'.  
    Non-null assertion operator를 사용하여 수정하였다.

- TS7006: Parameter 'attrs' implicitly has an 'any' type.
    ```
    function setAttributes(element: Element, attrs)
    ```
    위의 코드에서 attrs의 타입을 정해줘야 하는데, attrs는 내가 자체적으로 정의한 객체이다.  
    attr이 가지는 key 값들은 아래와 같다.  
    width, height, rx, ry, style, id, font-size, x, y, class, onclick, pointer-events, d,
    stroke, fill, x1, y1, x2, y2, stroke, stroke-dasharray, cx, cy, r  
    위의 key 값들을 가지고 Interface를 만들어, 상속시키는 방식으로 타입을 지정해 주었다.
    
    SVG
        - rect, text, path, line, circle
    ```
    interface SVG {
        width?: string,
        height?: string,
        x?: string,
        y?: string,
        d?: string,
        stroke? : string,
        fill? : string,
        cx? : string,
        cy? : string
    }

    interface Rect extends SVG{
        rx?: string,
        ry?: string,
        style?: string,
        class?: string,
        onclick? : string,
        stroke? : string
    }
    ```
    하지만, 진행도중, font-size 등의 가운데 - 가 들어가는 key에 대한 타입 지정이 불가능해서,  
    해당 부분들을 제외한 attribute 들을 SVG Interface 내부로 넣었다.

- object[key] Error(index signature error)  
    인터페이스의 가장 아래에 [key:string] : string | undefined; 로 타입을 지정해서 해결했다.
    ```
    interface SVG {
        width?: string,
        height?: string,
        x?: string,
        y?: string,
        d?: string,
        stroke? : string,
        fill? : string,
        cx? : string,
        cy? : string,
        [key: string]: string | undefined;
    }
    ```

- 그 외  
    이외에 setAttribute()등에 들어가는 매개변수 등은 Javascript 방식으로  
    Type Casting을 통해 맞는 타입으로 바꿔주었다.  
    ex) String(defaultX), Number(defaultX)

## 3. 과제 수행 후 느낀점
    일단은 TypeScript 에서 Error로 잡아주는 부분들의 타입을 명시해주는 방식으로 오류를 하나하나 수정했다.

    TypeScript 강의를 그냥 듣기만 했을 때보다는 그래도 뭔가 감이 잡히는 느낌이다. 

    JavaScript 변수나 함수의 리턴 타입을 명시해서 tsc 컴파일을 통해 오류를 잡아내는 방식이 대규모의 프로젝트에서는 충분히 도움이 될 것 같다는 생각은 든다.

    하지만 아직은 경험해보지 못해서 크게 체감되지 않고, ts 파일로 변환하는 과정이 버겁게만 느껴진다..;

    그리고 이해되지 않는 타입스크립트 문법도 많다.. 갈 길이 먼 것 같다.
