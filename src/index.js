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
import React, { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// get components from each page
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"
import Contact from "./pages/Contact"
import NoPage from "./pages/NoPage"
import AppDummy from "./pages/Dummy"
import Car from './pages/Car'

import App from './App.tsx'
import './App.css';

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
function FavoriteColor() {
  // initially set to red
  const [color, setColor] = useState("red");

  return (
    <>
      <h1>My favorite color is {color}!</h1>
      <button
        type="button"
        onClick={() => setColor("blue")}
      >Blue</button>
      <button
        type="button"
        onClick={() => setColor("red")}
      >Red</button>
      <button
        type="button"
        onClick={() => setColor("pink")}
      >Pink</button>
      <button
        type="button"
        onClick={() => setColor("green")}
      >Green</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);

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