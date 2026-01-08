import { Routes, Route } from "react-router";
import { publickRoutes } from "./config/routes";

const AppRouter = () => {
  return (
    <div>
      <Routes>
        {publickRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </div>
  );
};

export default AppRouter;
