const  express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const client = require('./connection');
/* app.use(express.static(path.join(__dirname, 'public')))

app.engine('html', require('ejs').renderFile);

app.get('/', (req,res) =>{
    res.send('Hello from Express');
});

app.get('/home', (req,res) =>{
    res.sendFile(`${__dirname}/public/home.html`);
});

app.post('/register', (req,res) =>{
    console.log(req.body.email);
   // res.sendFile(`${__dirname}/public/reg.html`, {name:req.body.email});
    res.render(__dirname + "/public/reg.html", {name:req.body.email});
}); */

client.connect();
app.get('/products', (req,res) =>{
    client.query(`select * from product`, (err, result) =>{
        if(!err){
            res.send(result.rows)
        }
        else{
            throw err;
        }
    });
    client.end;
})

app.get('/product/:id', (req, res) =>{
    client.query('select * from product where prod_id = ${req.params.id}',
    (err, result) =>{
        if(!err){
            res.send(result.rows)
        }
    });
    client.end;
})

app.post('/product', (req,res) =>{
    const product = req.body;
    let insertQuery = `insert into product values(${product.prod_id}, 
        '${product.prod_name}', '${product.prod_desc}', ${product.price})`

    client.query(insertQuery, (err, result) =>{
        if(!err){
            res.send('Insertion is Successful');
        }
        else{
            console.log(err);
        }
    });
    client.end;    
})

app.put('/product/:id', (req,res)=>{
    let product = req.body;
    let updateQuery = `update product
                       set prod_name = '${product.prod_name}',
                           prod_desc = '${product.prod_desc}',
                           price = ${product.price}
                       where prod_id = ${product.prod_id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('update was successful');
        }
        else{
            console.log(err);
        }
    });
    client.end;                  
})


app.listen(3333, () =>{
    console.log('Application running on port 3333');
});