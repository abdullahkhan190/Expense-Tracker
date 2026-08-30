const http = require('http');

let dummyData = [
    { id: 1, name: "Groceries", amount: 50.00, date: "2023-10-01" },
    { id: 2, name: "Gas", amount: 30.00, date: "2023-10-02" },
    { id: 3, name: "Dinner", amount: 40.00, date: "2023-10-03" }
];

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(dummyData));
        }
        if (req.method === 'POST' && req.url === '/add-expense') {
            let newExpense = JSON.parse(body);
            newExpense.id = dummyData.length + 1;
            dummyData.push(newExpense);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Expense added successfully', expense: newExpense }));
        }
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Server running at https://expense-tracker-9eiw.onrender.com');
});