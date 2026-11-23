import { BrowserRouter, Route, Routes } from 'react-router'
import { LoginPage } from './app/auth/page'
import { DashboardPage } from './app/dashboard/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
