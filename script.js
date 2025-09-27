// =======================
// === GLOBAL STORAGE ===
// =======================

// Initialize default balance if not set
if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", "1000000.40"); // default ₦1,000,000.40
}

// Initialize notifications if not set
if (!localStorage.getItem("notifications")) {
  localStorage.setItem("notifications", JSON.stringify([]));
}

function getBalance() {
  return parseFloat(localStorage.getItem("balance"));
}

function setBalance(newBalance) {
  localStorage.setItem("balance", newBalance.toFixed(2));
}

function addNotification(message) {
  let notes = JSON.parse(localStorage.getItem("notifications")) || [];
  notes.unshift(message); // add newest on top
  localStorage.setItem("notifications", JSON.stringify(notes));
}

// ============================
// === DASHBOARD FUNCTIONS ====
// ============================
function updateDashboard() {
  const balanceDisplay = document.getElementById("balance-amount");
  const notificationList = document.getElementById("notification-list");
  
  // Update balance
  if (balanceDisplay) {
    balanceDisplay.textContent = `₦${getBalance().toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
  }
  
  // Update notifications
  if (notificationList) {
    notificationList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notifications")) || [];
    
    if (notes.length === 0) {
      notificationList.innerHTML = `<li class="list-group-item bg-dark text-light small">No recent activity</li>`;
    } else {
      notes.forEach(note => {
        const li = document.createElement("li");
        li.className = "list-group-item bg-dark text-light small";
        li.textContent = note;
        notificationList.appendChild(li);
      });
    }
  }
}

// ========================
// === ACTION FUNCTIONS ===
// ========================

// Fund account
function fundAccount() {
  let amount = prompt("Enter amount to fund:");
  amount = parseFloat(amount);
  
  if (!amount || amount <= 0) {
    alert("Invalid amount.");
    return;
  }
  
  let balance = getBalance();
  setBalance(balance + amount);
  addNotification(`+₦${amount.toLocaleString()} funded into your account.`);
  alert("Account Funded ✅");
  updateDashboard();
}

// Transfer money
function transferMoney(amount = null) {
  if (!amount) {
    amount = prompt("Enter amount to transfer:");
  }
  amount = parseFloat(amount);
  
  let balance = getBalance();
  if (!amount || amount <= 0 || amount > balance) {
    alert("Invalid or insufficient funds.");
    return;
  }
  
  setBalance(balance - amount);
  addNotification(`-₦${amount.toLocaleString()} transferred successfully.`);
  alert("Transfer Successful ✅");
  window.location.href = "index.html"; // back to dashboard
}

// Withdraw money
function withdrawMoney(amount = null) {
  if (!amount) {
    amount = prompt("Enter amount to withdraw:");
  }
  amount = parseFloat(amount);
  
  let balance = getBalance();
  if (!amount || amount <= 0 || amount > balance) {
    alert("Invalid or insufficient funds.");
    return;
  }
  
  setBalance(balance - amount);
  addNotification(`-₦${amount.toLocaleString()} withdrawn successfully.`);
  alert("Withdrawal Successful ✅");
  window.location.href = "index.html";
}

// Buy Airtime
function buyAirtime(amount, network) {
  let balance = getBalance();
  if (amount > balance) {
    alert("Insufficient funds.");
    return;
  }
  setBalance(balance - amount);
  addNotification(`-₦${amount.toLocaleString()} airtime purchased on ${network}.`);
  alert("Airtime Purchase Successful ✅");
  window.location.href = "index.html";
}

// Buy Data
function buyData(amount, network, plan) {
  let balance = getBalance();
  if (amount > balance) {
    alert("Insufficient funds.");
    return;
  }
  setBalance(balance - amount);
  addNotification(`-₦${amount.toLocaleString()} data (${plan}) purchased on ${network}.`);
  alert("Data Purchase Successful ✅");
  window.location.href = "index.html";
}

// Pay Bills
function payBill(amount, billType) {
  let balance = getBalance();
  if (amount > balance) {
    alert("Insufficient funds.");
    return;
  }
  setBalance(balance - amount);
  addNotification(`-₦${amount.toLocaleString()} paid for ${billType}.`);
  alert("Bill Payment Successful ✅");
  window.location.href = "index.html";
}

// ========================
// === INIT ON LOAD =======
// ========================
document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});