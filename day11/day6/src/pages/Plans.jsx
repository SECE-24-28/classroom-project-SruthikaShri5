import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlanLocal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { rechargeData, setSelectedPlan } = useApp();

  // Mock plans data (simulating API)
  const mockPlans = [
    { id: 1, type: 'prepaid', price: 199, validity: '28 days', data: '1.5GB/day', description: '100 SMS/day' },
    { id: 2, type: 'prepaid', price: 299, validity: '56 days', data: '2GB/day', description: 'Unlimited calls' },
    { id: 3, type: 'prepaid', price: 399, validity: '84 days', data: '2.5GB/day', description: 'Unlimited calls + SMS' },
    { id: 4, type: 'postpaid', price: 499, validity: '30 days', data: '25GB', description: 'Unlimited calls + SMS' },
    { id: 5, type: 'postpaid', price: 699, validity: '30 days', data: '50GB', description: 'Premium benefits' },
    { id: 6, type: 'prepaid', price: 99, validity: '14 days', data: '1GB/day', description: '50 SMS/day' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredPlans = mockPlans.filter(plan => 
        plan.type === (rechargeData?.planType || 'prepaid')
      );
      setPlans(filteredPlans);
      setLoading(false);
    }, 1000);
  }, [rechargeData]);

  const handlePlanSelect = (plan) => {
    setSelectedPlanLocal(plan);
    setShowModal(true);
  };

  const confirmPlan = () => {
    setSelectedPlan(selectedPlan);
    setShowModal(false);
    window.location.hash = 'payment';
  };

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">⏳</div>
          <h2 className="text-2xl gradient-text">Loading plans...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-bold gradient-text mb-2">Choose Your Plan</h2>
        <p className="text-purple-200">
          {rechargeData?.mobile} • {rechargeData?.operator} • {rechargeData?.planType}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">📱</div>
              <h3 className="text-2xl font-bold gradient-text">₹{plan.price}</h3>
              <p className="text-purple-200">{plan.validity}</p>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-300">Data:</span>
                <span className="text-white font-semibold">{plan.data}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Benefits:</span>
                <span className="text-white font-semibold">{plan.description}</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePlanSelect(plan)}
              className="btn-secondary w-full"
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>

      {showModal && selectedPlan && (
        <div className="modal-overlay">
          <div className="card-glass p-8 max-w-md mx-4">
            <h3 className="text-2xl font-bold gradient-text mb-4">Confirm Plan Selection</h3>
            <div className="space-y-3 mb-6">
              <p className="text-white"><strong>Plan:</strong> ₹{selectedPlan.price}</p>
              <p className="text-white"><strong>Validity:</strong> {selectedPlan.validity}</p>
              <p className="text-white"><strong>Data:</strong> {selectedPlan.data}</p>
              <p className="text-white"><strong>Benefits:</strong> {selectedPlan.description}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={confirmPlan} className="btn-primary flex-1">
                Proceed to Payment
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Plans;