// Select DOM Elements
const form = document.querySelector('form');
const inputText = document.querySelector('#text');
const inputAmount = document.querySelector('#amount');
const transactionList = document.querySelector('#transaction-list');
const balanceDisplay = document.querySelector('#balance');

// Transactions Array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Update Balance Display
function updateBalance() {
  const total = transactions.reduce((acc, tx) => acc + tx.amount, 0);
  balanceDisplay.textContent = `Balance: ₹${total.toFixed(2)}`;
}

// Render Transactions
function renderTransactions() {
  transactionList.innerHTML = '';
  transactions.forEach((tx, index) => {
    const li = document.createElement('li');
    li.classList.add('transaction-item');
    li.innerHTML = `
      <span class="${tx.amount >= 0 ? 'income' : 'expense'}">
        ${tx.text}: ₹${Math.abs(tx.amount).toFixed(2)}
      </span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">×</button>
    `;
    transactionList.appendChild(li);
  });
  updateBalance();
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add New Transaction
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const text = inputText.value.trim();
  const amount = +inputAmount.value;

  if (text === '' || isNaN(amount)) return;

  transactions.push({ text, amount });
  inputText.value = '';
  inputAmount.value = '';
  renderTransactions();
});

// Delete Transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
}

// Initial Render
renderTransactions();