import { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser);
    
    // Simple routing based on URL hash
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const menuItems = [
    { label: 'Home', link: '#home', icon: '🏠' },
    { label: 'Dashboard', link: '#dashboard', icon: '📊' },
    { label: 'Recharge', link: '#recharge', icon: '📱' },
    { label: 'History', link: '#history', icon: '📜' },
  ];

  const renderPage = () => {
    switch(currentPage) {
      case 'login': return <Login />;
      case 'signup': return <Signup />;
      case 'dashboard': return <Dashboard />;
      case 'recharge': return <Recharge />;
      case 'plans': return <Plans />;
      case 'payment': return <Payment />;
      case 'confirmation': return <Confirmation />;
      default: return <Home />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-dark-gradient flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="flex flex-1">
          <Sidebar menuItems={menuItems} />
          <div className="flex-1">
            {renderPage()}
          </div>
        </div>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
