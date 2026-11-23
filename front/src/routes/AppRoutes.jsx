import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Veiculos from '../pages/Veiculos';
import Locacoes from '../pages/Locacoes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/veiculos"
        element={
          <PrivateRoute>
            <Veiculos />
          </PrivateRoute>
        }
      />
      <Route
        path="/locacoes"
        element={
          <PrivateRoute>
            <Locacoes />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/veiculos" replace />} />
    </Routes>
  );
}
