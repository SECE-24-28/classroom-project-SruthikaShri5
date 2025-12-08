document.getElementById('rechargeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const mobile = document.getElementById('mobile-number').value;
    const operator = document.getElementById('operator').value;
    const planType = document.getElementById('plan-type').value;
    
    let isValid = true;
    
    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
        document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit mobile number';
        isValid = false;
    } else {
        document.getElementById('mobileError').textContent = '';
    }
    
    // Operator validation
    if (!operator) {
        document.getElementById('operatorError').textContent = 'Please select an operator';
        isValid = false;
    } else {
        document.getElementById('operatorError').textContent = '';
    }
    
    // Plan type validation
    if (!planType) {
        document.getElementById('planTypeError').textContent = 'Please select a plan type';
        isValid = false;
    } else {
        document.getElementById('planTypeError').textContent = '';
    }
    
    if (isValid) {
        localStorage.setItem('rechargeData', JSON.stringify({mobile, operator, planType}));
        window.location.href = 'plans.html';
    }
});
