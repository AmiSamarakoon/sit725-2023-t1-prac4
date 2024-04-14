var express = require("express")
var app = express()
app.use(express.static(__dirname + '/'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =  'mongodb+srv://samarakoonamila98:trSz7m46TqxrHT3c@cluster0.et63378.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run() {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
}


app.post('/api/cat', async (req, res) => {
    let cat = req.body;
    let result = await postCat(cat);
    client.close();
    res.json({statusCode: 201, message: 'success', data: result});
});

async function postCat(cat) {
    await client.connect();
    let collection = await client.db().collection('Cats');
    return collection.insertOne(cat);
}

app.get('/api/cats', async (req, res) => {
    let result = await getAllCats();
    client.close();
    res.json({statusCode: 201, message: 'success', data: result});
});

async function getAllCats() {
    await client.connect();
    let collection = await client.db().collection('Cats');
    return collection.find().toArray();
}



app.get('/', (req, res) => {
    res.render('index.html');
});


var port = process.env.port || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port)
})
