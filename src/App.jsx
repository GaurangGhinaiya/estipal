import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoute from "./routes";

function App() {

  return (
    <div className="bg-white dark:bg-[#283641]">
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoute />
    </div>
  );
}

export default App;
