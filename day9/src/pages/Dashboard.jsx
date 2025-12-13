import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSmartphone, FiCreditCard, FiTrendingUp, FiDollarSign, FiClock, FiStar, FiZap, FiGift, FiAward, FiUsers } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalRecharges: 0,
    totalSpent: 0,
    successRate: 0,
    rewardsEarned: 0
  });

  useEffect(() => {
    // Load data from localStorage
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setRecentTransactions(transactions.slice(0, 5));
    
    // Calculate stats
    const totalRecharges = transactions.length;
    const totalSpent = transactions.reduce((sum, t) => sum + (t.amount || 0), 0);
    const successRate = totalRecharges > 0 ? ((transactions.filter(t => t.status === 'success').length / totalRecharges) * 100).toFixed(1) : 0;
    const rewardsEarned = Math.floor(totalSpent * 0.02); // 2% cashback
    
    setStats({ totalRecharges, totalSpent, successRate, rewardsEarned });
  }, []);

  const quickActions = [
    {
      title: "Mobile Recharge",
      description: "Instant recharge for all operators",
      icon: <FiSmartphone className="w-8 h-8" />,
      link: "/recharge",
      color: "btn-emerald",
      bgColor: "stat-card-emerald"
    },
    {
      title: "Browse Plans",
      description: "Discover best value plans",
      icon: <FiStar className="w-8 h-8" />,
      link: "/plans",
      color: "btn-orange",
      bgColor: "stat-card-orange"
    },
    {
      title: "Payment Methods",
      description: "Manage your payment options",
      icon: <FiCreditCard className="w-8 h-8" />,
      link: "/payment",
      color: "btn-cyan",
      bgColor: "stat-card-cyan"
    },
    {
      title: "Rewards Center",
      description: "Check your cashback & offers",
      icon: <FiGift className="w-8 h-8" />,
      link: "/rewards",
      color: "btn-rose",
      bgColor: "stat-card-rose"
    }
  ];

  const statCards = [
    {
      title: "Total Recharges",
      value: stats.totalRecharges,
      icon: <FiSmartphone className="w-8 h-8 text-emerald-600" />,
      color: "stat-card-emerald",
      change: "+12%",
      font: "font-montserrat"
    },
    {
      title: "Amount Spent",
      value: `₹${stats.totalSpent.toLocaleString()}`,
      icon: <FiDollarSign className="w-8 h-8 text-orange-600" />,
      color: "stat-card-orange",
      change: "+8%",
      font: "font-roboto"
    },
    {
      title: "Success Rate",
      value: `${stats.successRate}%`,
      icon: <FiTrendingUp className="w-8 h-8 text-cyan-600" />,
      color: "stat-card-cyan",
      change: "+2%",
      font: "font-opensans"
    },
    {
      title: "Rewards Earned",
      value: `₹${stats.rewardsEarned}`,
      icon: <FiAward className="w-8 h-8 text-rose-600" />,
      color: "stat-card-rose",
      change: "+15%",
      font: "font-lato"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold font-montserrat text-gray-900 mb-2">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-xl font-opensans text-gray-600">
                Manage your mobile recharges and track your activity
              </p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=150&fit=crop&auto=format" 
                alt="Dashboard" 
                className="w-32 h-24 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className={`card p-6 ${stat.color} animate-scale-in hover:shadow-2xl transform hover:-translate-y-2`}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-md">
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className={`text-3xl font-bold text-gray-900 mb-2 ${stat.font}`}>
                {stat.value}
              </h3>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-montserrat text-gray-900 mb-8 animate-fade-in">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className={`card p-8 text-center ${action.bgColor} animate-slide-in hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 group`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {action.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-roboto text-gray-900 mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-600 font-opensans leading-relaxed mb-6">
                  {action.description}
                </p>
                <button className={`${action.color} px-6 py-3 rounded-xl font-medium transition-all duration-300`}>
                  Get Started
                </button>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Transaction History */}
          <div className="lg:col-span-2">
            <div className="card p-8 animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-montserrat text-gray-900">
                  Recent Transactions
                </h2>
                <Link 
                  to="/history" 
                  className="text-emerald-600 hover:text-emerald-700 font-medium font-roboto transition-colors"
                >
                  View All →
                </Link>
              </div>
              
              {recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                          <FiSmartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold font-roboto text-gray-900">
                            {transaction.operator || 'Mobile Recharge'}
                          </p>
                          <p className="text-sm font-opensans text-gray-600">
                            {transaction.mobile || 'N/A'} • {transaction.date || new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold font-montserrat text-gray-900">
                          ₹{transaction.amount || 0}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          transaction.status === 'success' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {transaction.status || 'Success'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiClock className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold font-roboto text-gray-900 mb-2">
                    No transactions yet
                  </h3>
                  <p className="text-gray-600 font-opensans mb-6">
                    Start your first recharge to see your transaction history
                  </p>
                  <Link 
                    to="/recharge" 
                    className="btn-emerald px-6 py-3 rounded-xl font-medium"
                  >
                    Start Recharging
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Offers Card */}
            <div className="card p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 animate-scale-in">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg mr-3">
                  <FiGift className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold font-roboto text-gray-900">
                  Special Offers
                </h3>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=150&fit=crop&auto=format" 
                alt="Special Offers" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-sm font-opensans text-gray-600 mb-4">
                Get 20% extra data on recharges above ₹299. Limited time offer!
              </p>
              <button className="btn-orange w-full py-2 rounded-lg font-medium text-sm">
                Claim Offer
              </button>
            </div>

            {/* Support Card */}
            <div className="card p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-3">
                  <FiUsers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold font-roboto text-gray-900">
                  Need Help?
                </h3>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?w=300&h=150&fit=crop&auto=format" 
                alt="Customer Support" 
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="text-sm font-opensans text-gray-600 mb-4">
                Our 24/7 support team is here to help you with any questions.
              </p>
              <button className="btn-cyan w-full py-2 rounded-lg font-medium text-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;