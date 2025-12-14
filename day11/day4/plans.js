const plans = [
    {id: 1, price: 199, validity: '28 days', data: '1.5GB/day', description: 'Unlimited calls + 100 SMS/day'},
    {id: 2, price: 299, validity: '28 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day', popular: true},
    {id: 3, price: 399, validity: '56 days', data: '2.5GB/day', description: 'Unlimited calls + 100 SMS/day'},
    {id: 4, price: 599, validity: '84 days', data: '2GB/day', description: 'Unlimited calls + 100 SMS/day'}
];

window.addEventListener('DOMContentLoaded', function() {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    
    if (rechargeData.mobile) {
        document.getElementById('rechargeInfo').innerHTML = `
            <span>Mobile:</span> ${rechargeData.mobile} | 
            <span>Operator:</span> ${rechargeData.operator.toUpperCase()} | 
            <span>Type:</span> ${rechargeData.planType.charAt(0).toUpperCase() + rechargeData.planType.slice(1)}
        `;
    }
    
    const container = document.getElementById('plansContainer');
    plans.forEach(plan => {
        const planCard = `
            <article class="bg-white rounded-xl shadow-lg p-6 plan-card ${plan.popular ? 'border-2 border-pink-400' : ''}">
                ${plan.popular ? '<div class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">POPULAR</div>' : ''}
                <h3 class="text-3xl font-bold text-pink-500 mb-2">₹${plan.price}</h3>
                <p class="text-gray-500 mb-4">${plan.validity}</p>
                <div class="space-y-2 mb-6 text-gray-700">
                    <p>📊 Data: ${plan.data}</p>
                    <p>📞 ${plan.description.split('+')[0].trim()}</p>
                    <p>💬 ${plan.description.split('+')[1].trim()}</p>
                </div>
                <button onclick="selectPlan(${plan.id}, ${plan.price})" class="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                    Select Plan
                </button>
            </article>
        `;
        container.innerHTML += planCard;
    });
});

function selectPlan(planId, price) {
    const selectedPlan = plans.find(p => p.id === planId);
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
    window.location.href = 'payment.html';
}
