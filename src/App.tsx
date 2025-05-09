import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import WorkOrderDetail from "./pages/WorkOrderDetail";
import NotFound from "./pages/NotFound";

// Theme configuration
import { theme } from "./theme";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App: React.FC = () => {
  return (
    /*<ConfigProvider 
      locale={esES} 
      theme={theme}
    >
      <Router>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/orders" replace />} />
          <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="/orders" replace />} />
            <Route path="orders" element={<Dashboard />} />
            <Route path="orders/:id" element={<WorkOrderDetail />} />
            <Route path="groups" element={<Groups />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>*/
    <BrowserRouter>
      <Routes>
        {/* Ruta de login accesible para todos */}
        <Route path="/login" element={<Login />} />
        {/* Redirección de la ruta raíz a login si no autenticado */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<Dashboard />} />
          <Route path="orders/:id" element={<WorkOrderDetail />} />
          <Route path="groups" element={<Groups />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
