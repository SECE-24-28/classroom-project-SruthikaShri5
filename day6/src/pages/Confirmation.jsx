import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

const Confirmation = () => {
  const [transactionId] = useState(() => 
    'TXN' + Date.now().toString().slice(-8)
  );
  const [paymentData, setPaymentData] = useState(null);
  const { rechargeData, selectedPlan, user } = useApp();

  useEffect(() => {
    const storedPaymentData = localStorage.getItem('paymentData');
    if (storedPaymentData) {
      setPaymentData(JSON.parse(storedPaymentData));
    }

    // Save transaction to history
    const transaction = {
      id: transactionId,
      mobile: rechargeData?.mobile,
      operator: rechargeData?.operator,
      planType: rechargeData?.planType,
      amount: selectedPlan?.price,
      validity: selectedPlan?.validity,
      data: selectedPlan?.data,
      paymentMethod: JSON.parse(storedPaymentData || '{}').method,
      date: new Date().toLocaleDateString(),
      status: 'Success'
    };

    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    transactions.unshift(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactionId, rechargeData, selectedPlan]);

  const getPaymentMethodName = (method) => {
    const methods = {
      'card': 'Credit/Debit Card',
      'upi': 'UPI Payment',
      'netbanking': 'Net Banking',
      'wallet': 'Digital Wallet'
    };
    return methods[method] || method;
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-8xl mb-6 animate-float">✅</div>
        <h2 className="text-4xl font-bold gradient-text mb-4">Payment Successful!</h2>
        <p className="text-xl text-purple-200 mb-8">Your mobile recharge has been completed successfully</p>

        <div className="card-glass p-8 text-left">
          <h3 className="text-2xl font-bold gradient-text mb-6 text-center">Transaction Details</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-slate-300 block">Transaction ID:</span>
                <span className="text-white font-bold text-lg">{transactionId}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Mobile Number:</span>
                <span className="text-white font-semibold">{rechargeData?.mobile}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Operator:</span>
                <span className="text-white font-semibold">{rechargeData?.operator}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Plan Type:</span>
                <span className="text-white font-semibold capitalize">{rechargeData?.planType}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-slate-300 block">Amount Paid:</span>
                <span className="text-white font-bold text-xl">₹{selectedPlan?.price}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Validity:</span>
                <span className="text-white font-semibold">{selectedPlan?.validity}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Data:</span>
                <span className="text-white font-semibold">{selectedPlan?.data}</span>
              </div>
              
              <div>
                <span className="text-slate-300 block">Payment Method:</span>
                <span className="text-white font-semibold">
                  {getPaymentMethodName(paymentData?.method)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">📱</span>
              <div>
                <p className="text-green-400 font-semibold">Recharge Activated</p>
                <p className="text-green-300 text-sm">Your plan is now active and ready to use</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.hash = 'dashboard'}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
          
          <button 
            onClick={() => window.location.hash = 'recharge'}
            className="btn-secondary"
          >
            Recharge Again
          </button>
          
          <button 
            onClick={() => window.print()}
            className="btn-secondary"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </main>
  );
};

export default Confirmation;