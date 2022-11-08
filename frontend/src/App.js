import logo from './logo.svg';
import './App.css';
import AppRoutes from './AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    < >
    <ToastContainer/>
      <AppRoutes />
    </>
  );
}

export default App;
