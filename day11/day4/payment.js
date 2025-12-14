window.addEventListener('DOMContentLoaded', function() {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    
    if (selectedPlan.price) {
        document.getElementById('orderSummary').innerHTML = `
            <p><strong>Mobile Number:</strong> ${rechargeData.mobile}</p>
            <p><strong>Operator:</strong> ${rechargeData.operator.toUpperCase()}</p>
            <p><strong>Plan:</strong> ₹${selectedPlan.price} - ${selectedPlan.validity}</p>
            <p><strong>Data:</strong> ${selectedPlan.data}</p>
            <hr class="my-4">
            <p class="text-2xl font-bold text-pink-500">Total Amount: ₹${selectedPlan.price}</p>
        `;
        
        document.getElementById('payButton').textContent = `Proceed to Pay ₹${selectedPlan.price}`;
    }
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (paymentMethod) {
        localStorage.setItem('paymentMethod', paymentMethod.value);
        window.location.href = 'confirmation.html';
    }
});
