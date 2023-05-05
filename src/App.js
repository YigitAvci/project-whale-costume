import { useState } from "react";
import { Container, Input, Row, Col, Label, Button, ListGroup, ListGroupItem } from "reactstrap";
import { Route, Routes} from "react-router-dom"
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import SignupPage from "./components/SignupPage";
import NavigationBar from "./components/NavigationBar";

function App() {

  return (
    <div className="App">
      <Container>
        <NavigationBar></NavigationBar>
        <br></br>
        <Routes>
          <Route path="/" exact element={<MainPage/>}/>
          <Route path="/login" exact element={<LoginPage/>}/>
          <Route path="/signup" exact element={<SignupPage/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
