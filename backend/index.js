const http = require('http');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
// Define a simple schema for expenses
const expenseSchema = new mongoose.Schema({
    id: Number,
    name: String,
    amount: Number,
    date: Date
});

const Expense = mongoose.model('Expense', expenseSchema);

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // Fetch expenses from the database
            //MongooseError: Model.find() no longer accepts a callback              


            Expense.find().then(expenses => {
                res.end(JSON.stringify(expenses));
            });
        }
        if (req.method === 'POST' && req.url === '/add-expense') {
            let newExpense = JSON.parse(body);
            // Create a new expense document
            const expense = new Expense(newExpense);
            // Save the expense to the database
            expense.save((err, savedExpense) => {
                if (err) {
                    console.error('Error adding expense:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Expense added successfully', expense: savedExpense }));
            });
        }
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Server running at https://expense-tracker-9eiw.onrender.com');
});