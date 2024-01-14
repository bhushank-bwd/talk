import { Provider } from "react-redux";
import "./App.css";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Account from "./components/Account";
import Chat from "./components/Chat";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Account />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
export default App;
