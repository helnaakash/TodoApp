import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import'./App.css';
import Login from "./pages/login";
import Todo from "./pages/todo";
import Todos from "./pages/todoapp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/todo" element={<Todo />}></Route>
          <Route exact path="/Todos" element={<Todos />}></Route>
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
