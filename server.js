let express = require('express');
let app = express();
let port = process.env.port || 3000;

app.use(express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/addTwoNumbers', (req, res) => {
    let num1 = req.query.number1;
    let num2 = req.query.number2;
    let result = parseInt(num1) + parseInt(num2);

    let response = {data:result, code: 200, message: 'successful'};
    res.json(response);
});

app.listen(port, () => {
    console.log('server started');
});