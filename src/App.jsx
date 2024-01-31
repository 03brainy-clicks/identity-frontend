import Cards from "./components/Cards";
import Form from "./components/Form";
import UpdateForm from "./components/UpdateForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screenbg-white">
        <div className=" w-10/12 mx-auto flex h-full py-5 gap-5">
          <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/update/:id" element={<UpdateForm />} />
            <Route path="/create" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
