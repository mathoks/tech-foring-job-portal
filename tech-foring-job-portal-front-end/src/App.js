import logo from './logo.svg';
import './App.css';
import HomPage from './pages/homPage';

function App() {
  window.onload = () => {
  if (window.location.pathname === '/') {
    window.location.href = '/views';
  }
};
  return (
    <HomPage/>
  )
}

export default App;
