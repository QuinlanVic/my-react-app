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
  export default memo(Todos);