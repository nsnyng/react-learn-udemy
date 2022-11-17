
### 이벤트 추가하기
<hr>
onClick, onInput 등 'on' + 'event' 로 등록할 수 있다.

```javascript
const clickHandler = () => {
  //action
}
```
```html
<button onClick={clickHandler}>click</button> 

<button onClick={clickHandler()}>click</button>
```
<p>이벤트를 추가할 때는 함수를 호출하지 않고 함수의 포인터를 전달한다. 함수를 호출하면 jsx -> js로 변환할 때 함수가 호출되기 때문에 정상적으로 이벤트가 등록되지 않는다.</p>

### useState()
<hr>
<p>React는 처음에 1회 실행된 뒤 다시 실행되지 않는다. 때문에 어떤 상황에서는 업데이트를 하라는 트리거를 설정해야하는데 그 때 사용하는 것이 useState라는 hook이다.</p>
<p>useState()를 사용하기 위해 import 한다.</p>

```javascript
import { useState } from "react";
```

<p>useState 함수는 하나의 매개변수를 받고 길이가 2인 배열을 반환한다. 매개변수로는 내가 사용할 값을 준다. 그러면 첫번째 요소로 해당 값을 이용할 수 있는 변수를, 두번째 요소로는 값을 업데이트 할 수 있는 함수를 반환한다.</p>

```javascript
//props.title = "아침햇살";
const [title, setTitle] = useState(props.title);

setTitle("저녁노을");
```
<p>setTitle 함수가 호출되면 해당되는 컴포넌트를 재평가하고 화면에 반영한다. setTitle을 사용하지 않고 변수에 값을 재할당할 경우 값은 변경이 되지만 화면에 반영은 되지 않는다.</p>