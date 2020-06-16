const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

require('dotenv').config();

const transport = nodemailer.createTransport({
    host: 'mail.resolvame.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

app.use('/', express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {

    res.send("<a href='/contato.html'> Contato </a>")
})



app.post('/contato', (req, res) => {

    let email = req.body.emailaddress;
    let subject = req.body.subject;
    let message = req.body.message;

    transport.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: subject,
        text: message

    }).then(info => {
        console.log(info)
        res.send(`O e-mail foi enviado com sucesso`)
    }).catch(err => {
        console.log(err)
        res.send("Ocorreu um erro")
    })

})

.listen(3000, ()=> {
    console.log("Server rodando na porta 3000")
})