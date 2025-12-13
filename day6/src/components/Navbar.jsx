import { useApp } from '../context/AppContext';

const Navbar = ({ isLoggedIn }) => {
  const { user } = useApp();

  return (
    <header className="navbar-gradient text-white shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-3">📱 Mobile Recharge Portal</h1>
        <nav className="flex gap-6">
          {isLoggedIn ? (
            <>
              <a href="#dashboard" className="hover:text-purple-300 transition">Dashboard</a>
              <a href="#recharge" className="hover:text-pink-300 transition">Recharge</a>
              <a href="#home" className="hover:text-rose-300 transition" onClick={() => {localStorage.removeItem('currentUser'); window.location.reload();}}>Logout</a>
              {user && <span className="ml-auto">👤 {user.name}</span>}
            </>
          ) : (
            <>
              <a href="#home" className="hover:text-purple-300 transition">Home</a>
              <a href="#login" className="hover:text-pink-300 transition">Login</a>
              <a href="#signup" className="hover:text-rose-300 transition">Signup</a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
