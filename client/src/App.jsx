import "./App.css";

import { logout } from "./utils/authService";
import Signup from "./components/SignUp";
import Authenticate from "./components/UserData";
import Login from "./components/login";
function App() {
  return (
    <>
      <Login />
      <Signup />
      <Authenticate />
      <button onClick={() => logout()}>Logout</button>
    </>
  );
}

export default App;
