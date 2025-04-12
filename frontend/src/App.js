import './css/App.css';
import {useRoutes} from 'react-router-dom';
import Layout from './pages/layout';
import Home from './pages/Home';
import Journal from './components/Journal';
import Login from './pages/Login';




function App() {
  const elements = useRoutes([
    {
      path: '/',
      element: <Layout />, 
      children: [
        { path: '/', element: <Home /> }, 
        { path: '/api/diary/:paramData', element: <Journal /> },
        { path: '/api/Login', element: <Login /> }
      ],
    },
  ]);
  return elements;;
}

export default App;
