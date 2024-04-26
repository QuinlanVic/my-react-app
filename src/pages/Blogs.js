const Blogs = () => {
    // JS Style Object
    const myStyle = {
        color:"white",
        backgroundColor: "DodgerBlue",
        padding: "10px",
        fontFamily: "Sans-Serif",
    }

    // inline CSS
    // JS object inside JS escape {}
    // properties with hypen separators must be written in camelCase syntax 
    return (
        <>
            <h1 style={{color: "red", backgroundColor: "skyblue"}}>Blog Articles</h1>
            <h2 style={myStyle}>Add a likkle style</h2>
        </>
    );
  };
  
  export default Blogs;