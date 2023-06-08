import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Containers from "../pages/Containers";
import ContainerDetails from "../pages/ContainerDetails";

const Router = ({ children }) => {
  console.log(children);
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/containers"} element={<Containers />} />
          <Route
            exact
            path={"/containers/:id"}
            element={<ContainerDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
