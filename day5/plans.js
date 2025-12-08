const API_URL = 'https://675e4e0363b05ed0797a1a3f.mockapi.io/plans';
let selectedPlanData = null;

async function fetchPlans() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API failed');
        const plans = await response.json();
        if (plans.length === 0) throw new Error('No plans');
        displayPlans(plans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        const fallbackPlans = [
            {id: '1', price: 199, validity: '28 days', data: '1.5GB/day', description: '100 SMS/day', type: 'prepaid'},
            {id: '2', price: 299, validity: '28 days', data: '2GB/day', description: '100 SMS/day', type: 'popular'},
            {id: '3', price: 399, validity: '56 days', data: '2.5GB/day', description: '100 SMS/day', type: 'prepaid'},
            {id: '4', price: 599, validity: '84 days', data: '2GB/day', description: '100 SMS/day', type: 'prepaid'}
        ];
        displayPlans(fallbackPlans);
    }
}

function displayPlans(plans) {
    document.getElementById('loadingMessage').style.display = 'none';
    const container = document.getElementById('plansContainer');
    
    plans.forEach(plan => {
        const planCard = document.createElement('article');
        planCard.className = `bg-white rounded-xl shadow-lg p-6 plan-card ${plan.type === 'popular' ? 'border-2 border-pink-400' : ''}`;
        
        planCard.innerHTML = `
            ${plan.type === 'popular' ? '<div class="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">POPULAR</div>' : ''}
            <h3 class="text-3xl font-bold text-pink-500 mb-2">₹${plan.price}</h3>
            <p class="text-gray-500 mb-4">${plan.validity}</p>
            <div class="space-y-2 mb-6 text-gray-700">
                <p>📊 Data: ${plan.data}</p>
                <p>📞 Unlimited calls</p>
                <p>💬 ${plan.description}</p>
            </div>
            <button onclick="selectPlan('${plan.id}')" class="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition">
                Select Plan
            </button>
        `;
        
        container.appendChild(planCard);
    });
}

function selectPlan(planId) {
    fetch(`${API_URL}/${planId}`)
        .then(response => {
            if (!response.ok) throw new Error('API failed');
            return response.json();
        })
        .then(plan => {
            selectedPlanData = plan;
            showModal(plan);
        })
        .catch(error => {
            console.error('Error fetching plan details:', error);
            const fallbackPlans = [
                {id: '1', price: 199, validity: '28 days', data: '1.5GB/day', description: '100 SMS/day'},
                {id: '2', price: 299, validity: '28 days', data: '2GB/day', description: '100 SMS/day'},
                {id: '3', price: 399, validity: '56 days', data: '2.5GB/day', description: '100 SMS/day'},
                {id: '4', price: 599, validity: '84 days', data: '2GB/day', description: '100 SMS/day'}
            ];
            const plan = fallbackPlans.find(p => p.id === planId);
            if (plan) {
                selectedPlanData = plan;
                showModal(plan);
            }
        });
}

function showModal(plan) {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    
    document.getElementById('modalContent').innerHTML = `
        <p><strong>Selected Plan:</strong> ₹${plan.price}</p>
        <p><strong>Validity:</strong> ${plan.validity}</p>
        <p><strong>Data:</strong> ${plan.data}</p>
        <p><strong>Description:</strong> ${plan.description}</p>
        <p><strong>Mobile:</strong> ${rechargeData.mobile}</p>
        <p><strong>Operator:</strong> ${rechargeData.operator.toUpperCase()}</p>
        <hr class="my-3">
        <p class="text-2xl font-bold text-pink-500">Total: ₹${plan.price}</p>
    `;
    
    document.getElementById('planModal').classList.add('active');
}

function closeModal() {
    document.getElementById('planModal').classList.remove('active');
}

function proceedToPayment() {
    if (selectedPlanData) {
        localStorage.setItem('selectedPlan', JSON.stringify(selectedPlanData));
        window.location.href = 'payment.html';
    }
}

window.addEventListener('DOMContentLoaded', function() {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    
    if (rechargeData.mobile) {
        document.getElementById('rechargeInfo').innerHTML = `
            <span>Mobile:</span> ${rechargeData.mobile} | 
            <span>Operator:</span> ${rechargeData.operator.toUpperCase()} | 
            <span>Type:</span> ${rechargeData.planType.charAt(0).toUpperCase() + rechargeData.planType.slice(1)}
        `;
    }
    
    fetchPlans();
});
