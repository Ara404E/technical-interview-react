import { BrowserRouter, Route, Routes } from "react-router";
import { LoginPage } from "./app/auth/page";
import { DashboardPage } from "./app/dashboard/page";
import { ProductsPage } from "./app/products/page";
import { ProductDetailsPage } from "./app/products/[id]";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
