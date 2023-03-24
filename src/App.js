import { Provider, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Pointer from "./components/Pointer";
import useMouse from "./helpers/useMouse";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import rootReducer from "./reducers";
import { Toaster } from "react-hot-toast";
import Routing from "./routing";


function App() {
  const store = createStore(rootReducer);

  return (
    <div className="App">
      <Toaster/>

      <Provider store={store}>
      <Pointer />
        <Header />
          <Routing />
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
