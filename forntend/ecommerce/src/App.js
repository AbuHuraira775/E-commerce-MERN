import logo from './logo.svg';
import './App.css';
import MainRouting from './config/Router/route';
import { Provider } from "react-redux";
import store from "./config/store/index";

function App() {
  return (
    <Provider store={store}>
<MainRouting />
    </Provider>
  );
}

export default App;
