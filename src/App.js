import { Provider } from "react-redux";
import store from "redux/stores";
import Home from "./pages/home";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Home />
      </div>
    </Provider>
  );
};

export default App;
