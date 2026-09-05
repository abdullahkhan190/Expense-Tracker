async function updateTable() {
    document.getElementById("expense-list").innerHTML = "";
    const data = await fetch('https://expense-tracker-9eiw.onrender.com/');
    const expenses = await data.json();
    expenses.forEach(expense => {
        // Create a new row for each expense but use  an unordered list
        let listItem = document.createElement("li");
        // Format the date to a more readable format
        let date = new Date(expense.date);
        expense.date = date.toLocaleDateString();
        listItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)} on ${expense.date}`;        
        document.getElementById("expense-list").appendChild(listItem);
    });
}


document.getElementById("add-expense-btn").addEventListener("click", function() {
    document.getElementById("expense-form").style.display = "block";
});

document.getElementById("expense-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission
    let name = document.getElementById("expense-name").value;
    let amount = parseFloat(document.getElementById("expense-amount").value);
    let date = document.getElementById("expense-date").value;
    document.getElementById("expense-form").style.display = "none";

    await fetch('https://expense-tracker-9eiw.onrender.com/add-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, amount, date })
    });
    updateTable();
});

updateTable();