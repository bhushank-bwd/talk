import { Provider } from "react-redux";
import "./App.css";
import store from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <div className="text-3xl font-bold underline">Talk</div>
    </Provider>
  );
}

export default App;
