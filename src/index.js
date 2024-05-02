// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

// imports
// You must import Hooks from react.
import React, { memo, StrictMode, useState, useEffect, createContext, useContext, useRef, useReducer, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// get components from each page
import Layout from "./pages/Layout"
// import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import Contact from "./pages/Contact"
import NoPage from "./pages/NoPage"
import AppDummy from "./pages/Dummy"
import Car from './pages/Car'

import App from './App.tsx'
import './App.css';
import Todos2 from './pages/Todos.js'
import useFetch from './pages/useFetch.js'

// NEW TYPESCRIPT **********************
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
// REACT HOOKS - W3 Schools
// Hooks allow function components to have access to state and other React features. 
// Because of this, class components are generally no longer needed.
// Hooks allow us to "hook" into React features such as state and lifecycle methods.

// HOOK RULES
// Hooks can only be called inside React function components.
// Hooks can only be called at the top level of a component.
// Hooks cannot be conditional

// "useState" Hook to keep track of the application state
// "FavoriteColor" component = function to display colours and trigger changes
// function FavoriteColor() {
//   // initially set to red
//   // currentState and function to change the state
//   // destructuring the return values form "useState"
//   // We should never directly update state. Ex: color = "red" is not allowed.
//   const [color, setColor] = useState("red");
  
//   return (
//     <>
//       <h1>My favorite color is {color}!</h1>
//       {/* use button to update state */}
//       <button
//         type="button"
//         onClick={() => setColor("blue")}
//       >Blue</button>
//       <button
//         type="button"
//         onClick={() => setColor("red")}
//       >Red</button>
//       <button
//         type="button"
//         onClick={() => setColor("pink")}
//       >Pink</button>
//       <button
//         type="button"
//         onClick={() => setColor("green")}
//       >Green</button>
//     </>
//   );
// }

// useState continued...
// it can track almost anything and you can have multiple
function Car7() {
  // const [brand, setBrand] = useState("Ford");
  // const [model, setModel] = useState("Mustang");
  // const [year, setYear] = useState("1964");
  // const [color, setColor] = useState("red");
  // Or, we can just use one state and include an object instead!
  const [car, setCar] = useState({
    brand: "Ford",
    model: "Mustang",
    year: "1964",
    color: "red"  
  })

  //   When state is updated, the entire state gets overwritten.
  // What if we only want to update the color of our car?
  // If we only called setCar({color: "blue"}), this would remove the brand, model, and year from our state.
  // We can use the JavaScript spread operator to help us...
  const updateColor = () => {
    // Because we need the current value of state, we pass a function into our setCar function. 
    // This function receives the previous value.
    setCar (previousState => {
      return {...previousState, color:"blue"}
    })
  }

  return (
    <>
      <h1>My {car.brand}</h1>
      <p>
        It is a {car.color} {car.model} from {car.year}.
      </p>
      <button
        type="button"
        onClick={updateColor} 
        >
        Blue
      </button>
    </>
  )
}

// "useEffect" Hook
// The useEffect Hook allows you to perform side effects in your components.
// Some examples of side effects are: fetching data, directly updating the DOM, and timers.
// useEffect accepts two arguments. The second argument is optional.
// useEffect(<function>, <dependency>)
function Timer() {
  // use State Hook to track state of component Timer
  const [count, setCount] = useState(0);

  // Use setTimeout() to count 1 second after initial render
  // takes in a function "setTimeout" which takes in nothing and returns a new count value
  // returned by "setCount" AND "setTimeout" takes in a parameter of 1000
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCount((count) => count+ 1);
  //   }, 1000)
  // })
  // as is, useEffect counts continously but should only count once
  // this is because it runs on every render
  // this means that every time the count changes a render happens which triggers another effect
  // to fix this we have to control when this side effect runs 
  // we should always include the second parameter which accepts an array. We can optionally pass dependencies to "useEffect" in this array
  // useEffect(() => {
  //   //Runs on every render
  // });
  // VS
  // useEffect(() => {
  //   //Runs only on the first render
  // }, []);
  // VS
  // useEffect(() => {
  //   //Runs on the first render
  //   //And any time any dependency value changes
  // }, [prop, state]);
  // NOW TO FIX THE ISSUE - have the effect only run on the first render
  // put empty array as dependency
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count+ 1);
    }, 1000)
  }, []) // <- add empty brackets here

  return (
    <h1> I've reached {count} times!</h1>
  )
}


// Example of a "useEffect" Hook that is dependent on a varuable
// only if the count variable updates, the effect will run again after the first render
function Counter() {
  // keep track of count state and calculation state
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here
  // If there are multiple dependencies, they should be included in the useEffect dependency array

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
    </>
  )
}

// Effect Cleanup
// Some effects require cleanup to reduce memory leaks
// Timeouts, subscriptions, event listeners, and other effects that are no longer needed should be disposed.
// We do this by including a return function at the end of the "useEffect" Hook
function Timer2() {
  // use State Hook to track state of component Timer
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count+ 1);
    }, 1000)
  // }, []) // <- add empty brackets here
  // REPLACE WITH
  // return statement to clean up the timer at the end of the "useEffect" Hook
  // to clear the timer we had to name it
    return () => clearTimeout(timer)
  }, []);

  return (
    <h1> I've reached {count} times!</h1>
  )
}

// "useContext" Hook
// React Context is a way to manage state globally.
// It can be used together with the useState Hook to share state 
// between deeply nested components more easily 
// than with useState alone.

// State should be held by the highest parent component 
// in the stack, that requires access to the state
// The component at the top and bottom of the stack need access to the state

// To do this without Context, we will need to pass the state as 
// "props" through each nested component = "prop drilling".
// Passing "props" through nested components:
// Even though components 2-4 did not need the state, 
// they had to pass the state along so that it could 
// reach component 5.
// function Component1() {
//   const [user, setUser] = useState("Jesse Hall");

//   return (
//     <>
//       <h1>{`Hello ${user}!`}</h1>
//       {/* or */}
//       <h1>Hello {user}!</h1>
//       <Component2 user={user} />
//     </>
//   )
// }
// function Component2({ user }) {
//   return (
//     <>
//       <h1>Component 2</h1>
//       <Component3 user={user}/>
//     </>
//   );
// }
// function Component3({ user }) {
//   return (
//     <>
//       <h1>Component 3</h1>
//       <Component4 user={user}/>
//     </>
//   );
// }
// function Component4({ user }) {
//   return (
//     <>
//       <h1>Component 4</h1>
//       <Component5 user={user} />
//     </>
//   )
// }
// function Component5({ user }) {
//   return (
//     <>
//       <h1>Component 5</h1>
//       <h2>{`Hello ${user} again!`}</h2>
//     </>
//   )
// }

// THE SOLUTION!!!
// Create a context. Import "createContext" to initialise it
const UserContext = createContext()
// Next we'll use the Context Provider to wrap the 
// tree of components that need the state Context
// put it in parent/heighest level component that requires it
// i.e., Component 1
function NewComponent1() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <>
    {/* Wrap child components in the Context Provider 
    and supply the state value */}
      <UserContext.Provider value={user}>
      {/* Now, all components in this tree will have access to the 
      user Context. */}
        <h1>Hello {user}!</h1>
        <Component2 />
      </UserContext.Provider>
    </>
  )
}

function Component2() {
  return (
    <>
      <h1>Component 2</h1>
      <Component3 />
    </>
  );
}

function Component3({ user }) {
  return (
    <>
      <h1>Component 3</h1>
      <Component4 />
    </>
  );
}

function Component4({ user }) {
  return (
    <>
      <h1>Component 4</h1>
      <Component5 />
    </>
  )
}

function Component5() {
  // in order to use the Context in a child component we have to
  // access it using the "useContext" Hook (must import)
  const user = useContext(UserContext);
  return (
    <>
      <h1>Component 5</h1>
      <h2>{`Hello ${user} again!`}</h2>
    </>
  )
}

// "useRef" Hook 
// The useRef Hook allows you to persist values between renders
// It can be used to store a mutable value that 
// does not cause a re-render when updated
// It can be used to access a DOM element directly
// If we tried to count how many times our application renders using the useState Hook, we would be caught in an infinite loop since this Hook itself causes a re-render
// To avoid this, we can use the useRef Hook
// import "useRef" Hook
function App2() { // rack app render
  const [inputValue, setInputValue] = useState("");
  // useRef returns a mutable ref object whose .current property 
  // is initialized to the passed argument (initialValue). 
  // The returned object will persist for the full lifetime 
  // of the component.
  const count = useRef(0) 
  // It's like doing this: const count = {current: 0}. 
  // We can access the count by using count.current

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  )
} 

// Accessing DOM Elements
// In general, we want to let React handle all DOM manipulation
// But there are some instances where useRef can be used without causing issues
// In React, we can add a ref attribute to an element to access it directly in the DOM
// Use "useRef" Hook to focus the input
function App3() {
  const inputElement = useRef();

  const focusInput = () => {
    inputElement.current.focus();
  };

  return (
    <>
      <input type="text" ref={inputElement}/>
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}

// Tracking State Changes 
// The "useRef" Hook can also be used to keep track of previous state values
// persist values between renders
function App4() {
  const [inputValue, setInputValue] = useState("");
  const previousInputValue = useRef("");

  useEffect(() => {
    // update useRef in here each time the "inputValue" changes
    previousInputValue.current = inputValue;
  }, [inputValue]);
  

  return (
    <>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  )
}

// "useReducer" Hook
// The useReducer Hook is similar to the useState Hook
// It allows for custom state logic
// If you find yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful

// useReducer(<reducer>, <initialState>)
// The reducer function contains your custom state logic
// initialState can be a simple value but generally will contain an object
// the useReducer Hook returns the current state and a dispatch method

// This is just the logic to keep track of the todo complete status.
// All of the logic to add, delete, and complete a todo could be contained within a single useReducer Hook by adding more actions.
const initialTodos = [
  {
    id: 1,
    title: 'Todo 1',
    complete: false, 
  },
  {
    id: 2,
    title: 'Todo 2',
    complete: false, 
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "COMPLETE":
      // run through all todos and update the state of the correct one
      return state.map((todo) => {
        if (todo.id === action.id) {
          return {...todo, complete: !todo.complete} 
        } else {
          return todo;
        }
      });
    default:
      return state
  }
}

function Todos() {
  // takes in reducer function and initialState and then,
  // returns the current state and a dispatch method
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    // dispatches the values to the reducer function
    // handled for each todo (state)
    dispatch({type: "COMPLETE", id: todo.id});
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input 
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </>
  )
}


// "useCallback" Hook
// The React useCallback Hook returns a memoized callback function
// Think of memoization as caching a value so that it does not need to be recalculated
// This allows us to isolate resource intensive functions so that they will not automatically run on every render
// The useCallback Hook only runs when one of its dependencies update
// this can improve performance
// The useCallback and useMemo Hooks are similar
// The main difference is that useMemo returns a memoized value
// and useCallback returns a memoized function

// Problem
// One reason to use useCallback is to prevent a component from re-rendering unless its props have changed
// In this example, you may think that the "Todos" component 
// will not change unless the "todos" change

// a Todos made in this file will re-render multiple times
// even with "useCallback" hook
// IF it is not memoized. lemme memoize
// only when its props change does it re-render
// We are using memo, so the Todos component should not re-render 
// since neither the todos state nor the addTodo function 
// are changing when the count is incremented
const Todos3 = memo(({todos, addTodo}) => {
  // everytime there is a rerender this is triggered
  // The Todos2 component still re-renders even when the todos do not change
  // neither the todos state nor the addTodo function are changing when 
  // the count is incremented
  // it re-renders due to "referential equality"
  // every time a component re-renders, its functions get recreated 
  // Because of this, the "addTodo" function has actually changed
  
  // Solution
  // use the Callback hook to prevent the function from being
  // recreated unnecessarily
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  )
})

// Now the Todos component will only re-render when the todos prop changes.
const App5 = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  // before
  // const addTodo = () => {
  //   setTodos((t) => [...t, "New Todo"]);
  // };
  // after with useCallback
  // wrap and now only when todos change does it change
  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  return (
    <>
      <Todos3 todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  )
}

// "useMemo" Hook
// The React "useMemo" Hook returns a memoized value
// The useMemo Hook only runs when one of its dependencies update
// This can improve performance

// Performance
// The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running
// i.e., When changing the count or adding a todo, you will notice a delay in execution
const App6 = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  // before
  // const calculation = expensiveCalculation(count);

  // To fix this performance issue, we can use the useMemo Hook to 
  // memoize the expensiveCalculation function. 
  // This will cause the function to only run when needed
  // We can wrap the expensive function call with useMemo
  // The useMemoHook accepts a second parameter to declare dependencies
  // The expensive function will only run when its dependencies have changed
  // i.e., when count is changed and not when todo's are added
  
  // after 
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount((c) => c + 1);
  };
  const addTodo = () => {
    setTodos((t) => [...t, "New Todo"]);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
}

const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

// CUSTOM HOOKS
// Hooks are reusable functions
// When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook
// Custom Hooks start with "use". Example: useFetch

// Build a Hook
// In the following code, we are fetching data in our Home component and displaying it.
// We will use the JSONPlaceholder service to fetch fake data. 
// This service is great for testing applications when there is no existing data.

const Home = () => {
  const [data] = useFetch("https://jsonplaceholder.typicode.com/todos");

  return (
    <>
    {/* if there is data then the expression after && is executed */}
      {data &&
        data.map((item) => {
          return <p key={item.id}>{item.title}</p>
        })
      }
    </>
  );
};


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<FavoriteColor />);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />)


// ****************************************************************************************************************************************


// REACT ROUTER routing
// export default function App() {
//   return (
//     // wrap content
//     <BrowserRouter>
//     {/* define our routes (an app can have multiple) */}
//       <Routes>
//       {/* A Route can be nested in another like how all route values here are nesteedd in Layout */}
//         <Route path="/" element = {<Layout />}>
//         {/* these nested routes inherit and add to parent route (combined with "/") */}
//           {/* Home has an "index" attribute and means that it is the default route for the parent route */}
//           <Route index element={<Home />}/>
//           <Route path="blogs" element = {<Blogs />}/>
//           <Route path="contact" element = {<Contact />}/>
//           {/* setting the path to "*" will act as a catch-all for any undefined URLs */}
//           <Route path="*" element = {<NoPage />}/>
//           <Route path="dummy" element = {<AppDummy />}/>
//           <Route path="car" element = {<Car />}/>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// const myFirstElement = <h1>Hello React!</h1>

// REACT COMPONENTS *******************************
// function Car(props) {
//   return <h2>I am a {props.brand.model} Car!</h2>;
// }

// function Garage() {
//   const carInfo = { name: "Ford", model: "Mustang" };
//   return (
//     <>
//       <h1>Who lives in my Garage?</h1>
//       <Car brand={ carInfo } />
//     </>
//   )
// }

// class Car extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       brand: "Ford",
//       model: "Mustang",
//       color: "red",
//       year: 1964
//     };
//   }
//   changeColor = () => {
//     this.setState({color: "blue"});
//   }
//   render() {
//     return (
//       <div>
//         <h1>My {this.state.brand}</h1>
//         <p>
//           It is a {this.state.color} {this.state.model} from {this.state.year}
//         </p>
//         <button
//           type="button"
//           onClick={this.changeColor}
//           >
//             Change color
//           </button>
//       </div>
//     )
//   }
// }

// React forms 
// function MyForm3() {
//   const [myCar, setMyCar] = useState("Volvo");

//   const handleChange = (event) => {
//     setMyCar(event.target.value) 
//   }

//   return (
//     <form>
//       <select value={myCar} onChange={handleChange}>
//         <option value="Ford">Ford</option>
//         <option value="Volvo">Volvo</option>
//         <option value="Fiat">Fiat</option>
//       </select>
//     </form>
//   )

// }

// function MyForm2() {
//   const [textarea, setTextarea] = useState("The content of a textarea goes in the value attribute");

//   const handleChange = (event) => {
//     setTextarea(event.target.value) 
//   }

//   return (
//     <form>
//       <textarea value={textarea} onChange={handleChange} />
//     </form>
//   )
// }

// function MyForm() {
  // useState hook to keep track of and update input value
//   const [inputs, setInputs] = useState({});

//   const handleChange = (event) => {
//     const name = event.target.name
//     const value = event.target.value
//     // update notation (put in all previous values and only update the property changed)
//     setInputs(values => ({...values, [name]: value}))
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // backticks, it's giving Lisp
//     // alert(`The name you entered was: ${name}`)
//     alert(inputs) 
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Enter your name:
//         {/* when the value changes, the state is updated */}
//         <input type="text" name="username" value={inputs.username || ""} onChange={handleChange}/>
//       </label>
//       <label>Enter your age:
//         {/* when the value changes, the state is updated */}
//         <input type="number" name="age" value={inputs.age || ""} onChange={handleChange}/>
//       </label>
//       <input type="submit" />
//     </form>
//   )
// }

// // React lists
// function Car3 (props) {
//   return <li key={props.key}>I am a {props.brand} </li>
// }

// function Garage3() {
//   const cars = [
//     { "id": 1, "brand": 'Ford' }
//     , {"id": 2, "brand": 'BMW'}
//     , {"id": 3, "brand": 'Audi'}
//   ]
//   return (
//     <> 
//       <h1>Who lives in my Garage?</h1>
//       <ul>
//         {cars.map((car) => <Car3 key= {car.id} brand={car.brand} />)}
//       </ul>
//     </>
//   )
// }

// // React Events 
// function Goal2(props) {
//   const isGoal = props.isGoal;
//   return (
//     <>
//       {isGoal ? < MadeGoal/> : < MissedGoal/>}
//     </>
//   )
// }

// function Garage2(props) {
//   const cars = props.cars 
//   return (
//     <>
//       <h1>Garage</h1>
//       {cars.length > 0 &&
//         <h2>
//           You have {cars.length} cars in your garage.
//         </h2>
//       }
//     </>
//   );
// }

// const cars = [
//   { "id": 1, "brand": 'Ford'
//   , "id": 2, "brand": 'BMW'
//   , "id": 3, "brand": 'Audi'
//   }
// ]
// // const root = ReactDOM.createRoot(document.getElementById('root'));

// function Football() {
//   const shoot = (a, b) => {
//     alert(b.type);
//   };

//   return (
//     <button onClick={(event) => shoot("Goal", event)}>Take the shot!</button>
//   );
// }

// // React conditionals
// function MadeGoal() {
//   return <h1>GOAL!</h1>;
// }

// function MissedGoal() {
//   return <h1>MISSED!</h1>;
// }

// function Goal(props) {
//   const isGoal = props.isGoal;
//   if (isGoal) {
//     return <MadeGoal />;
//   }
//   return <MissedGoal />;
// }


// where to render React component
// const root = ReactDOM.createRoot(document.getElementById('root'));
// what React component to render
// root.render(myFirstElement);
// root.render(<Garage/>);
// root.render(<Car />);
// root.render(<Football/>);
// root.render(<Goal isGoal={true} />);
// root.render(<Garage2 cars={cars} />)
// root.render(<Goal2 isGoal={true} />);
// root.render(<Garage3 />);
// root.render(<MyForm />);
// root.render(<MyForm3 />);
// root.render(<App />)

// can export components from file
// export default (<Car />);
// to import in another file type: import Car from './App.js'