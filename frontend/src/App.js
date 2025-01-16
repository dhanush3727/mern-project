import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";

function App() {
  return (
    <>
      <Route>
        <Routes path="/" element={<Home />} />
        <Routes path="/books/create" element={<CreateBook />} />
        <Routes path="/books/detail/:id" element={<ShowBook />} />
        <Routes path="/books/edit/:id" element={<EditBook />} />
        <Routes path="/books/delete/:id" element={<DeleteBook />} />
      </Route>
    </>
  );
}

export default App;
