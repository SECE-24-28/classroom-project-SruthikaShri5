import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user } = useApp();

  const recentTransactions = [
    { id: 1, mobile: '9876543210', amount: 199, date: '2024-01-15', status: 'Success' },
    { id: 2, mobile: '9876543210', amount: 299, date: '2024-01-10', status: 'Success' },
    { id: 3, mobile: '9876543210', amount: 99, date: '2024-01-05', status: 'Failed' }
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Welcome back, {user?.name || 'User'}! 👋</h2>
        <p className="text-purple-200">Manage your mobile recharges easily</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="card-glass p-6">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="text-xl font-bold text-white mb-2">Wallet Balance</h3>
          <p className="text-2xl font-bold gradient-text">₹2,500</p>
        </div>
        
        <div className="card-glass p-6">
          <div className="text-3xl mb-3">📱</div>
          <h3 className="text-xl font-bold text-white mb-2">Quick Recharge</h3>
          <button className="btn-secondary mt-2" onClick={() => window.location.hash = 'recharge'}>
            Recharge Now
          </button>
        </div>
        
        <div className="card-glass p-6">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-xl font-bold text-white mb-2">Total Recharges</h3>
          <p className="text-2xl font-bold gradient-text">24</p>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-2xl font-bold gradient-text mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-purple-500/30">
                <th className="py-3 text-purple-200">Mobile</th>
                <th className="py-3 text-purple-200">Amount</th>
                <th className="py-3 text-purple-200">Date</th>
                <th className="py-3 text-purple-200">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(transaction => (
                <tr key={transaction.id} className="border-b border-slate-700">
                  <td className="py-3 text-white">{transaction.mobile}</td>
                  <td className="py-3 text-white">₹{transaction.amount}</td>
                  <td className="py-3 text-white">{transaction.date}</td>
                  <td className="py-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.status === 'Success' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;