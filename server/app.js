const express = require('express');
const app = express();
const port = 8081;

// parse application/json
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

let managerList = [
    {
        firstName: 'Дмитрий Р.И.',
    },
    {
        firstName: 'Алексей Р.И.',
    },
    {
        firstName: 'Анатолий Р.И.',
    },
    {
        firstName: 'Анатолий Р.И.',
    },
    {
        firstName: 'Геннадий Р.И.',
    }
];

let clientsList = [
    {
        managerId: 1,
        firstName: 'Дмитрий Р.И.',
        description: 'Предложение услуг'
    },
    {
        managerId: 3,
        firstName: 'Алексей Р.И.',
        description: 'Предложение работы'
    },
    {
        managerId: 4,
        firstName: 'Геннадий Р.И.',
        description: 'Предложение праздника'
    }
];

const handleManagerChange = (req, res) => {
    managerList = req.body;
}
const handleClientsChange = (req, res) => {
    clientsList = req.body;
}

app.get('/managers', (req, res) => {
    res.send(managerList);
});

app.get('/clients', (req, res) => {
    res.send(clientsList);
});

app.post('/add/manager', handleManagerChange);
app.delete('/delete/manager', handleManagerChange);

app.post('/add/client', handleClientsChange);
app.put('/change/client', handleClientsChange);
app.delete('/delete/client', handleClientsChange);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
