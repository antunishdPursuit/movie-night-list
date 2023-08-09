// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import Show from "./Pages/Show";
import Index from "./Pages/Index";
import Edit from "./Pages/Edit";
import New from "./Pages/New";

// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Index />} />
            <Route path="/movies/new" element={<New />} />
            <Route path="/movies/:index" element={<Show />} />
            <Route path="/movies/:index/edit" element={<Edit />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

