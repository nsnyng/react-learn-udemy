
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
<p>setTitle 함수가 호출되면 해당되는 컴포넌트를 재평가하고 화면에 반영한다. setTitle을 사용하지 않고 변수에 값을 재할당할 경우 값은 변경이 되지만 화면에 반영 되지 않는다.</p>

```javascript
const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    const value = event.target.value;
    setEnteredTitle(value);
  };

  const amountChageHandler = (event) => {
    const value = event.target.value;
    setEnteredAmount(value);
  };

  const dateChageHandler = (event) => {
    const value = event.target.value;
    setEnteredDate(value);
  };
```
여러개의 useState를 사용할 수 있다. 모두 따로 동작한다. 하나로 합치고 싶다면 객체를 활용한다.

```javascript
  const [userInput, setUserInput] = useState({
    enteredTitle: "",
    enteredAmount: "",
    enteredDate: "",
  });

  const titleChangeHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredTitle: event.target.value,
    });
  };

  const amountChageHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredAmount: event.target.value,
    });
  };

  const dateChageHandler = (event) => {
    setUserInput({
      ...userInput,
      enteredDate: event.target.value,
    });
  };
```
<p>이때 주의할 점은, setUserInput() 호출 시에 값을 기존의 객체에 병합하는게 아니라 대체하기 때문에 핸들러를 통해 들어온 값 이외의 객체에 들어있던 데이터도 값을 보존할 수 있다.</p>

<p>위 두 방법은 이전 상태를 참고해야 하는 상황에서는 문제가 발생할 수 있다. 이전 데이터를 참고하여 데이터를 변경해야 할 때에는 아래 방법을 사용한다.</p>

```javascript
setUserInput(prevState => {
      return { ...prevState, enteredTitle: event.target.value };
});
```

<p>prevState를 통해 이전 상태를 안전하게 파악할 수 있다.</p>


### 양방향 바인딩
<br>

```javascript
const [enteredTitle, setEnteredTitle] = useState("");

const submitHandler = (event) => {
  event.preventDefault();

  const expenseData = {
    title: enteredTitle,
  };

  setEnteredTitle("");
};

<input
  type="text"
  value={enteredTitle}
  onChange={titleChangeHandler}
/>
```
요소의 value 값에 useState의 첫번째 요소를 값으로 주면 두번째 업데이트 함수로 값을 손쉽게 제어할 수 있다.
폼을 전송했을 때 이벤트를 중지시키기 때문에 데이터가 자동으로 없어지지 않는데, 이럴때도 빈문자열을 할당하여 손쉽게 폼의 값을 비울 수 있다.


### 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달하는 법
<br>

<p>props를 통해 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달해왔다. 자식 컴포넌트에서 부모 컴포넌트로 데이터를 전달할 때에는 어떻게 할까?</p>

<p>부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달할 때 직계에게만 전달할 수 있는 것처럼 자식 컴포넌트에서 부모 컴포넌트로 전달할 때도 직계부모에게만 전달이 가능하다.</p>

<p>우선 부모 컴포넌트에 함수를 선언하고 자식 컴포넌트에 해당 함수의 포인터를 props로 전달한다.</p>

```javascript
const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
  };

return (
  <div className="new-expense">
    <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
  </div>
);
```
<p>그리고 자식 컴포넌트에서 전달받은 함수를 호출하여 부모 컴포넌트와 소통이 가능하다. 호출 시 매개변수로 전달하고 싶은 데이터를 넣어준다.</p>

```javascript
const ExpenseForm = (props) => {
  props.onSaveExpenseData(data);
}
```