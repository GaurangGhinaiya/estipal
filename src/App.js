import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoute from "./routes";

function App() {
  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoute />
    </div>
  );
}

export default App;
