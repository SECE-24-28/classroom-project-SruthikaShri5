window.addEventListener('DOMContentLoaded', function() {
    const rechargeData = JSON.parse(localStorage.getItem('rechargeData') || '{}');
    const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan') || '{}');
    
    const transactionId = 'TXN' + Math.floor(Math.random() * 1000000000);
    const currentDate = new Date().toLocaleDateString('en-IN');
    
    document.getElementById('transactionDetails').innerHTML = `
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${currentDate}</p>
        <p><strong>Mobile Number:</strong> ${rechargeData.mobile}</p>
        <p><strong>Operator:</strong> ${rechargeData.operator.toUpperCase()}</p>
        <p><strong>Plan:</strong> ₹${selectedPlan.price} - ${selectedPlan.validity}</p>
        <p><strong>Amount Paid:</strong> ₹${selectedPlan.price}</p>
        <p><strong>Status:</strong> <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Success</span></p>
    `;
    
    
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    history.unshift({
        date: currentDate,
        mobile: rechargeData.mobile,
        operator: rechargeData.operator,
        amount: selectedPlan.price,
        status: 'Success'
    });
    localStorage.setItem('rechargeHistory', JSON.stringify(history.slice(0, 10)));
});
