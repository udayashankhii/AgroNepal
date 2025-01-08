import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/user/home/navigation";
import Home from "./components/user/home/home";
import Login from "./components/user/login";
import Register from "./components/user/register";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<NavigationBar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
