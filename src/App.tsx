// import {logo} from './logo.svg';
import './App.css';

import {useReducer} from 'react';

// NEW TYPESCRIPT FILE ************************************************************************************
// types and hooks 
// "useState" Hook
// re-use the value passed in as the initial state to determine what the type of the value should be
// Infer the type as "boolean"
// const [enabled, setEnabled] = useState(false);

// Explicitly set the type to "boolean"
// const [enabled, setEnabled] = useState<boolean>(false);

// Explicitly set the type to "Status"
type Status = "idle" | "loading" | "success" | "error";
// const [status, setStatus] = useState<Status>("idle");

// group related state as an object and describe the different possibilities 
// via object types
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };
// const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });

// "useReducer" Hook
// accepts a reducer function and an initial 
// types for the reducer function are inferred from the initial state

// type creation (describes the state of the reducer's state)
interface State {
   count: number 
};

// another type creation with objects
// describes the different actions which can be dispatched to the reducer
type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

// set the initial state with type (and what type will be used by the useReduer Hook by default)
const initialState: State = { count: 0 };

// reducer function which takes in a state and an action 
// (and sets types for them and the return type)
function stateReducer(state: State, action: CounterAction): State {
  // depending on the action, change the state of the component
  // use case switch to do it and unpacking?
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  // useReducer Hook which takes in a reducer funciton and initial state
  const [state, dispatch] = useReducer(stateReducer, initialState);
  // or more explicitly
  // const [state, dispatch] = useReducer<State>(stateReducer, initialState);

  // couple arrow functions to change the value of the state
  const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
  const reset = () => dispatch({ type: "reset" });

  return (
    <div>
      <h1>Welcome to my counter</h1>

      <p>Count: {state.count}</p>
      <button onClick={addFive}>Add 5</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// "useContext" Hook 

// **********************************************************************************************************

// type declaration (object type)
interface MyButtonProps {
  // text to display inside the button
  title : string;
  // whether the button can be interacted with
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return <button disabled={disabled}>{title}</button>;
}

// export default function MyApp() {
//   return (
//     <div>
//       <h1>Welcome to my app</h1>
//       <MyButton title="I'm a disabled button" disabled={true}/>
//     </div>
//   );
// } 

// function App() {
  // Class component
  // class Car extends React.Component {
  //   render() {
  //     return (
  //       <h2>Hi, I am a Car!</h2>
  //     )
  //   }
  // }
  // vs
  // Function components
  // function Car2(props) {
  //   return <h2>Hi, I am a {props.colour} Car!</h2>
  // }
  // if we were to render the Car component
  // const root = ReactDOM.createRoot(document.getElementById('root'));
  // root.render(<Car color="red"/>);
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// // return (
// //   <div className="App">
// //     <h1>Hello World!</h1>
// //   </div>
// // );

// import { useState } from "react";

// export default function MyApp() {
//   const [count, setCount] = useState(0);
//   function handleClick() {
//     setCount(count + 1);
//   }
//   return (
//     <div>
//       <h1>Counter that update separately</h1>
//       {/* these are called props */}
//       <MyButton count={count} onClick={handleClick} />
//       <MyButton count={count} onClick={handleClick} />
//     </div>
//   );
// }

// function MyButton({ count, onClick }) {
//   return <button onClick={onClick}>Clicked {count} times</button>;
// }

/*
// array of movies
const movies = [
  { title: "Spider-Man", isGood: true, id: 1 },
  { title: "Spider-Man 2", isGood: true, id: 2 },
  { title: "Spider-Man 3", isGood: false, id: 3 },
];
export default function ShoppingList() {
  // map function to transform array of movies into array of <li> items
  const listMovies = movies.map((movie) => (
    <li 6
      key={movie.id}
      style={{
        color: movie.isGood ? "magenta" : "darkgreen",
      }}
    >
      {movie.title}
    </li>
  )); 

  return <ul>{listMovies}</ul>;
} */

/*const user = {
  name: "Peter Parker",
  imageUrl:
    "https://i.pinimg.com/736x/5a/cf/59/5acf5975c89304125e2b70f658f771f3.jpg",
  imageSize: 200,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={"Photo of " + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize,
        }}
      />
    </>
  );
}*/


