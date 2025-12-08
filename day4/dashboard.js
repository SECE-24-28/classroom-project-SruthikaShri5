window.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userMobile = localStorage.getItem('userMobile');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    }
    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (userMobile) {
        document.getElementById('userMobile').textContent = userMobile;
    }
    
    // Display history
    const history = JSON.parse(localStorage.getItem('rechargeHistory') || '[]');
    const tbody = document.getElementById('historyBody');
    if (history.length > 0) {
        tbody.innerHTML = history.map(item => `
            <tr class="border-b hover:bg-pink-50">
                <td class="px-4 py-3">${item.date}</td>
                <td class="px-4 py-3">${item.mobile}</td>
                <td class="px-4 py-3">${item.operator.toUpperCase()}</td>
                <td class="px-4 py-3">₹${item.amount}</td>
                <td class="px-4 py-3"><span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">${item.status}</span></td>
            </tr>
        `).join('');
    }
});
