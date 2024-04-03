import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import TaskArea from "./components/TaskArea";

function App() {
  return (
    <Provider store={store}>
      <div className="w-full min-h-screen h-auto flex justify-center items-center bg-background">
        <TaskArea />
      </div>
    </Provider>
  ); 
}

export default App;
