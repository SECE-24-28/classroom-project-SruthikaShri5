import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Recharge from './pages/Recharge';
import Plans from './pages/Plans';
import RechargePlans from './pages/RechargePlans';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

function App() {


  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/recharge" element={<Recharge />} />
                  <Route path="/plans" element={<RechargePlans />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;