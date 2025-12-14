import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = useState({});
  const { rechargeData, selectedPlan } = useApp();

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI Payment', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'wallet', name: 'Digital Wallet', icon: '💰' }
  ];

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (paymentMethod === 'card') {
      if (!/^[0-9]{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Enter valid 16-digit card number';
      }
      if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = 'Enter valid expiry date (MM/YY)';
      }
      if (!/^[0-9]{3}$/.test(cardDetails.cvv)) {
        newErrors.cvv = 'Enter valid 3-digit CVV';
      }
      if (cardDetails.cardholderName.length < 3) {
        newErrors.cardholderName = 'Enter cardholder name';
      }
    }

    if (Object.keys(newErrors).length === 0) {
      // Store payment data and redirect to confirmation
      const paymentData = {
        method: paymentMethod,
        ...(paymentMethod === 'card' && { cardDetails })
      };
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      window.location.hash = 'confirmation';
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold gradient-text mb-2">Payment</h2>
          <p className="text-purple-200">Complete your recharge payment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="card-glass p-6">
            <h3 className="text-2xl font-bold gradient-text mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300">Mobile Number:</span>
                <span className="text-white">{rechargeData?.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Operator:</span>
                <span className="text-white">{rechargeData?.operator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Plan Type:</span>
                <span className="text-white capitalize">{rechargeData?.planType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Validity:</span>
                <span className="text-white">{selectedPlan?.validity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Data:</span>
                <span className="text-white">{selectedPlan?.data}</span>
              </div>
              <hr className="border-purple-500/30" />
              <div className="flex justify-between text-xl font-bold">
                <span className="gradient-text">Total Amount:</span>
                <span className="gradient-text">₹{selectedPlan?.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="card-glass p-6">
            <h3 className="text-2xl font-bold gradient-text mb-4">Payment Method</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {paymentMethods.map(method => (
                    <label key={method.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`p-3 rounded-lg border-2 text-center transition ${
                        paymentMethod === method.id 
                          ? 'border-purple-500 bg-purple-500/20' 
                          : 'border-slate-600 hover:border-purple-400'
                      }`}>
                        <div className="text-2xl mb-1">{method.icon}</div>
                        <div className="text-sm text-white">{method.name}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <span className="text-red-500 text-sm">{errors.paymentMethod}</span>}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      className="input-field"
                    />
                    {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber}</span>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">Expiry Date:</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="input-field"
                      />
                      {errors.expiryDate && <span className="text-red-500 text-sm">{errors.expiryDate}</span>}
                    </div>
                    
                    <div>
                      <label className="block text-purple-200 font-semibold mb-2">CVV:</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        placeholder="123"
                        className="input-field"
                      />
                      {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-purple-200 font-semibold mb-2">Cardholder Name:</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={handleCardChange}
                      placeholder="John Doe"
                      className="input-field"
                    />
                    {errors.cardholderName && <span className="text-red-500 text-sm">{errors.cardholderName}</span>}
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                Pay ₹{selectedPlan?.price}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;