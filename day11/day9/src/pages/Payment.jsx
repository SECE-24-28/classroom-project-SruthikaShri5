import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiSmartphone, FiDollarSign, FiShield, FiCheck } from 'react-icons/fi';

const Payment = () => {
  const navigate = useNavigate();
  const [rechargeData, setRechargeData] = useState({});
  const [selectedPlan, setSelectedPlan] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedRecharge = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const storedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    setRechargeData(storedRecharge);
    setSelectedPlan(storedPlan);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (paymentMethod) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      localStorage.setItem('paymentMethod', paymentMethod);
      navigate('/confirmation');
    }
  };

  const paymentOptions = [
    { value: 'card', label: 'Credit/Debit Card', icon: FiCreditCard, color: 'emerald' },
    { value: 'upi', label: 'UPI Payment', icon: FiSmartphone, color: 'orange' },
    { value: 'wallet', label: 'Digital Wallet', icon: FiDollarSign, color: 'cyan' },
    { value: 'netbanking', label: 'Net Banking', icon: FiShield, color: 'rose' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold font-montserrat text-gray-900 mb-2">
            Complete Payment
          </h1>
          <p className="text-lg sm:text-xl font-opensans text-gray-600">
            Secure and fast payment processing
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Order Summary */}
          <div className="card p-6 sm:p-8 animate-scale-in">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl mr-4">
                <FiSmartphone className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-900">
                Order Summary
              </h2>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Mobile Number</span>
                <span className="font-roboto font-semibold text-gray-900">{rechargeData.mobile || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Operator</span>
                <span className="font-roboto font-semibold text-gray-900 capitalize">{rechargeData.operator || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Plan</span>
                <span className="font-roboto font-semibold text-gray-900">₹{selectedPlan.price || 0}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Validity</span>
                <span className="font-roboto font-semibold text-gray-900">{selectedPlan.validity || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="font-opensans text-gray-600">Data</span>
                <span className="font-roboto font-semibold text-gray-900">{selectedPlan.data || 'N/A'}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 sm:p-6 rounded-xl border border-emerald-200">
              <div className="flex justify-between items-center">
                <span className="text-lg sm:text-xl font-montserrat font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl sm:text-3xl font-bold font-montserrat text-emerald-600">₹{selectedPlan.price || 0}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="card p-6 sm:p-8 animate-scale-in" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl mr-4">
                <FiCreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-900">
                Payment Method
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {paymentOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <label 
                    key={option.value}
                    className={`flex items-center p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md ${
                      paymentMethod === option.value 
                        ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="payment" 
                      value={option.value} 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      className="sr-only" 
                    />
                    <div className={`p-3 rounded-xl mr-4 ${
                      paymentMethod === option.value 
                        ? 'bg-emerald-500' 
                        : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        paymentMethod === option.value ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`font-roboto font-semibold flex-1 ${
                      paymentMethod === option.value ? 'text-emerald-700' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                    {paymentMethod === option.value && (
                      <FiCheck className="w-5 h-5 text-emerald-600" />
                    )}
                  </label>
                );
              })}
              
              <button 
                type="submit" 
                disabled={!paymentMethod || isLoading}
                className={`btn-emerald w-full py-4 text-lg font-semibold mt-8 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'animate-pulse' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Processing...
                  </div>
                ) : (
                  `Proceed to Pay ₹${selectedPlan.price || 0}`
                )}
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center text-sm text-gray-600">
                <FiShield className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="font-opensans">Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
