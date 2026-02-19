import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Providers } from "@/providers/Providers";

const Portfolio = lazy(() => import("./pages/Portfolio"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <Providers>
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Providers>
);

export default App;
