import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Recharge = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    operator: '',
    planType: 'prepaid'
  });
  const [errors, setErrors] = useState({});
  const { setRechargeData } = useApp();

  const operators = [
    'Airtel', 'Jio', 'Vi (Vodafone Idea)', 'BSNL', 'Aircel'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    if (!formData.operator) {
      newErrors.operator = 'Please select an operator';
    }

    if (Object.keys(newErrors).length === 0) {
      setRechargeData(formData);
      window.location.hash = 'plans';
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-lg mx-auto card-glass p-8">
        <div className="text-5xl text-center mb-4 animate-float">📱💳</div>
        <h2 className="text-3xl font-bold gradient-text mb-6 text-center">Mobile Recharge</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-200 font-semibold mb-2">Mobile Number:</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              className="input-field"
            />
            {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
          </div>

          <div>
            <label className="block text-purple-200 font-semibold mb-2">Select Operator:</label>
            <select
              name="operator"
              value={formData.operator}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Choose Operator</option>
              {operators.map(operator => (
                <option key={operator} value={operator}>{operator}</option>
              ))}
            </select>
            {errors.operator && <span className="text-red-500 text-sm">{errors.operator}</span>}
          </div>

          <div>
            <label className="block text-purple-200 font-semibold mb-2">Plan Type:</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="planType"
                  value="prepaid"
                  checked={formData.planType === 'prepaid'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-white">Prepaid</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="planType"
                  value="postpaid"
                  checked={formData.planType === 'postpaid'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-white">Postpaid</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Browse Plans
          </button>
        </form>
      </section>
    </main>
  );
};

export default Recharge;