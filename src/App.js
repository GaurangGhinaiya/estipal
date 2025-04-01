import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AppRoute from "./routes";

function App() {
  const userRole = localStorage.getItem("userRole");

  const [theme, setTheme] = useState("");
  
  useEffect(() => {
    setTheme(userRole === "admin" ? "dark" : "light");
  }, [userRole]);

  useEffect(() => {
    // Update theme class dynamically if the roleValue changes
    if (theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    }
  }, [theme]);


  return (
    <div className="bg-white dark:bg-[#283641]">
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoute />
    </div>
  );
}

export default App;
