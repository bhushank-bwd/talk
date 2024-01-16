import { Provider } from "react-redux";
import "./App.css";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Account from "./components/Account";
import Chat from "./components/Chat";
import Body from "./components/Body";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}>
        <Body />
      </RouterProvider>
    </Provider>
  );
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <Account /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);
export default App;
