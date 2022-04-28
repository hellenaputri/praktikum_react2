import React from "react";
import Navbar from "./Components/Navbar";
import Main from "./Main";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <br></br>
        <Main />
        <br></br>
      </div>
    )
  }
}

export default App