import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import ThankYouPage from './pages/ThankYouPage';

function App() {
  return (
    <div className='text-center'>
      <Navbar />
      <AllRoutes />
    </div>
  );
}

export default App;
