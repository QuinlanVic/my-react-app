import { memo } from "react";

const Todos = ({ todos }) => {
    // bro re-renders when it shouldn't
    console.log("child render");
    return (
      <>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
      </>
    );
  };
  
// Lets you skip re-rendering a component when its props are unchanged.
// Now the Todos component only re-renders when the todos that are passed to it through props are updated.
  // export default memo(Todos);

  const Todos2 = ({todos, addTodo}) => {
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
  }

  export default memo(Todos2);