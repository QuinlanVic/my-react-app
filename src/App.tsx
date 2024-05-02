// import {logo} from './logo.svg';
import './App.css';

import {createContext, useContext, useState, useReducer, useMemo, useCallback} from 'react';

// NEW TYPESCRIPT FILE ************************************************************************************
// types and hooks 
// Useful Types
// DOM Events
// When working with DOM events in React, the type of the event can often be inferred from the event handler. 
// However, when you want to extract a function to be passed to an event handler, 
// you will need to explicitly set the type of the event.
// If you need to use an event that is not included in this list, use the React.SyntheticEvent type, 
// which is the base type for all events.
export default function Form() {
  // initial value
  const [value, setValue] = useState("Change me");
  // have to explicitly set the type of the event
  // event handler passed a function
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }

  return (
    <>
      <input value={value} onChange={handleChange} />
      <p>Value: {value}</p>
    </>
  );
}

// Children
// There are two common paths to describing the children of a component. The first is to use the React.ReactNode type, which is a union of all the possible types that can be passed as children in JSX
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
// This is a very broad definition of children. 
// The second is to use the React.ReactElement type, which is 
// only JSX elements and not JavaScript primitives like strings or numbers
interface ModalRendererProps2 {
  title: string;
  children: React.ReactElement;
}
// Note, that you cannot use TypeScript to describe that the children are a certain type of JSX elements, 
// so you cannot use the type-system to describe a component which only accepts <li> children


// React.ReactNode accepts the most inputs
interface ReactNodeProps {
  children: React.ReactNode;
}
// set type of props
const RNode = (props: ReactNodeProps) => <div>{props.children}</div>

const ReactNodeApp = () => <>
<RNode><p>One element</p></RNode>
<RNode>
  <>
    <p>Fragments for</p>
    <p>More elements</p>
  </>
</RNode>
<RNode>1</RNode>  
<RNode>Hello</RNode>
<RNode>{null}</RNode>
<RNode>{true}</RNode>

{/* Must have children though */}
{/* <RNode /> */}
</>


// React.ReactElement accepts only JSX elements
interface ReactElementProps {
children: React.ReactElement;
}

const RElement = (props: ReactElementProps) => <div>{props.children}</div>

const ReactElementApp = () => <>
<RElement><p>More elements</p></RElement>
<RElement>
  <>
    <p>More elements</p><p>More elements</p>
  </>
</RElement>

{/* // Must be a JSX element */}
{/* <RElement>1</RElement>  
<RElement>Hello</RElement>
<RElement>{null}</RElement>
<RElement>{true}</RElement> */}

{/* // Must have children though
<RElement /> */}
</>


// Style Props
// When using inline styles in React, you can use React.CSSProperties to describe the object passed to the style prop. 
// This type is a union of all the possible CSS properties, and is a good way to ensure 
// you are passing valid CSS properties to the style prop, and to get auto-complete in your editor.
interface MyComponentProps {
  style: React.CSSProperties;
}

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

// export default function App() {
//   // useReducer Hook which takes in a reducer funciton and initial state
//   const [state, dispatch] = useReducer(stateReducer, initialState);
//   // or more explicitly - give type to "useReducer" Hook
//   // const [state, dispatch] = useReducer<State>(stateReducer, initialState);

//   // couple arrow functions to change the value of the state
//   const addFive = () => dispatch({ type: "setCount", value: state.count + 5 });
//   const reset = () => dispatch({ type: "reset" });

//   return (
//     <div>
//       <h1>Welcome to my counter</h1>

//       <p>Count: {state.count}</p>
//       <button onClick={addFive}>Add 5</button>
//       <button onClick={reset}>Reset</button>
//     </div>
//   );
// }

// "useContext" Hook 
// technique for passing data down the component tree without having to pass props through components
// used by creating a provider component and often by creating a Hook to consume the value in a child component
// The type of the value provided by the context is inferred from the value passed to the createContext

type Theme = "light" | "dark" | "system";
// initial value of "system" given to createContext with type "Theme"
const ThemeContext = createContext<Theme>("system")

// useContext 
const useGetTheme = () => useContext(ThemeContext) 

// export default function App() {
//   // initial value of "light" given to "useState" with type "Theme"
//   const [theme, setTheme] = useState<Theme>('light');

//   return (
//     // provider function used to get state from component
//     <ThemeContext.Provider value={theme}>
//       <MyComponent />
//     </ThemeContext.Provider>
//   )
// }

// gets the theme from "useContext" Hook and displays it
// function MyComponent() {
//   const theme = useGetTheme();

//   return (
//     <div>
//       <p>Current theme: {theme}</p>
//     </div>
//   )
// }

// "useMemo" Hook
// null errors can kreep in if you do not have a suitable default value
// you need to explicitly set ContextShape | null on the createContext
// BUT
// you need to eliminate the | null in the type for context consumers
// recommendation: have the Hook do a runtime check for it’s existence and throw an error when not present
// for example

// This is a simpler example, but you can imagine a more complex object here
type ComplexObject = {
  kind: string
};

// you need to explicitly set ContextShape | null on the createContext
// BUT
// you need to eliminate the | null in the type for context consumers
// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
// have to use context.provider with useGetComplexObject or this error pops us
// i.e.:
//   return (
//     <Context.Provider value={object}>
//       <MyComponent />
//     </Context.Provider>
//   )
// }
const useGetComplexObject = () => {
  const object = useContext(Context);
  // not null is true hehe
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}

// export default function App() {
//   // The useMemo Hooks will create/re-access a memorized value from a function call, 
//   // re-running the function only when dependencies passed as the 2nd parameter are changed. 
//   // The result of calling the Hook is inferred from the return value from the function in the 1st parameter
//   const object = useMemo(() => ({ kind: "complex" }), []);

//   // You can be more explicit by providing a type argument to the Hook
//   // The type of visibleTodos is inferred from the return value of filterTodos
//   // const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);


//   return (
//     <Context.Provider value={object}>
//       <MyComponent />
//     </Context.Provider>
//   )
// }

// // use "useContext" to get the object and display it
// function MyComponent() {
//   const object = useGetComplexObject();

//   return (
//     <div>
//       <p>Current object: {object.kind}</p>
//     </div>
//   )
// }

// "useCallback" Hook
// The useCallback provide a stable reference to a function as long as the dependencies 
// passed into the second parameter are the same. Like useMemo, the function’s type is inferred 
// from the return value of the function in the first parameter, 
// and you can be more explicit by providing a type argument to the Hook.

// When working in TypeScript strict mode useCallback requires adding types for the parameters in your callback
// This is because the type of the callback is inferred from the return value of the function, 
// and without parameters the type cannot be fully understood
// Depending on your code-style preferences, you could use the *EventHandler functions from the React types 
// to provide the type for the event handler at the same time as defining the callback

// export default function Form() {
//   const [value, setValue] = useState("Change me");
//   // type for useCallback in <> (only changes state when second parameter is changed)
//   const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
//     setValue(event.currentTarget.value);
//   }, [setValue])
  
//   return (
//     <>
//       <input value={value} onChange={handleChange} />
//       <p>Value: {value}</p>
//     </>
//   );
// }



// **********************************************************************************************************

// type declaration (object type)
// interface MyButtonProps {
//   // text to display inside the button
//   title : string;
//   // whether the button can be interacted with
//   disabled: boolean;
// }

// function MyButton({ title, disabled }: MyButtonProps) {
//   return <button disabled={disabled}>{title}</button>;
// }

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


