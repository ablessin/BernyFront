import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route exact path={"/"} element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
