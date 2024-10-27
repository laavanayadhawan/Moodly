import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout isHistory={false}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<Layout isHistory={true}/>} />
          <Route path="/*" element={<Layout isHistory={false}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
