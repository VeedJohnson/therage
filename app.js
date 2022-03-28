const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');

const {Player} = require('./models/player')
const {initializePayment, verifyPayment} = require('./config/paystack')(request);

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public/')));
app.set('view engine', pug);

app.get('/',(req, res) => {
    res.render('index.pug');
});

app.get('/about',(req, res) => {
    res.render('about.pug');
});
app.get('/howtoplay',(req, res) => {
    res.render('howto.pug');
});
app.get('/leaderboard',(req, res) => {
    res.render('index.pug');
});

app.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body,['amount','email','full_name', 'password', 'phone_number']);
    form.metadata = {
        full_name : form.full_name,
        password : form.password,
        phone_number : form.phone_number
    }
    form.amount *= 100;
    
    initializePayment(form, (error, body)=>{
        if(error){
            //handle errors
            console.log(error);
            return res.redirect('/error')
            return;
        }
        response = JSON.parse(body);
        res.redirect(response.data.authorization_url)
    });
});

app.get('/paystack/callback', (req,res) => {
    const ref = req.query.reference;
    verifyPayment(ref, (error,body)=>{
        if(error){
            //handle errors appropriately
            console.log(error)
            return res.redirect('/error');
        }
        response = JSON.parse(body);        

        const data = _.at(response.data, ['reference', 'amount','customer.email', 'metadata.full_name', 'metadata.password', 'metadata.phone_number']);

        [reference, amount, email, full_name, password, phone_number] =  data;
        
        newPlayer = {reference, amount, email, full_name, password, phone_number}

        const player = new Player(newPlayer)

        player.save().then((player)=>{
            if(!player){
                console.log("na me", error);
                return res.redirect('/error');
            }
            res.redirect('/receipt/'+player._id);
        }).catch((e)=>{
            console.log("na me too", error);
            res.redirect('/error');
        })
    })
});

app.get('/receipt/:id', (req, res)=>{
    const id = req.params.id;
    Player.findById(id).then((player)=>{
        if(!player){
            //handle error when the player is not found
            res.redirect('/error')
        }
        res.render('success.pug',{player});
    }).catch((e)=>{
        res.redirect('/error')
    })
})

app.get('/error', (req, res)=>{
    res.render('error.pug');
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});
