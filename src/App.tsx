import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Main from "./pages/Main";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                theme={theme}
                onToggleTheme={() =>
                  setTheme((currentTheme) =>
                    currentTheme === "light" ? "dark" : "light",
                  )
                }
              />
            }
          />
          <Route
            path="/main"
            element={
              <Main
                theme={theme}
                onToggleTheme={() =>
                  setTheme((currentTheme) =>
                    currentTheme === "light" ? "dark" : "light",
                  )
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
