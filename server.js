// chamada dos pacotes nescessários
const express = require('express');
const mailer = require('express-mailer');
const app = express(); //instanciando objeto express para criar servidor.

const port = process.env.PORT || 8000; //Setando a porta para uso 8000

//set a pasta 'view' para as paginas
app.set('views', __dirname + '/views');

app.set('view engine','pug');

//Configurando express-mail 
mailer.extend(app, {
    from: 'contato@inovacaointeligentes.com.br',
    host: 'smtp.gmail.com',
    secureConnection: true, //uso de SSL
    port: 465,// porta segura do SMTP
    transportMethod: 'SMTP',
    auth:{
       user: 'seu@gmail.com',// email do gmail
       pass: 'senha' //senha
    }
});
//configurando email que receberar o email da aplicação
app.get('/', function(request, response){
    var mailOptions = {
        to: 'email.destino@hotmail.com',
        subject: 'Email do Servidor SMTP',
        user: {// dados do template, voce pode acessar  - user.name
            name: 'Inovação Inteligentes',
            message: 'Bem vindo ao inovacaointeligentes.com.br'
        }
    }

    //enviando email.
    app.mailer.send('email', mailOptions, function(err, message){
        if(err){
            console.log(err);
            response.send('Aqui ocorreu um erro eviando o email');
            return;
        }
        return response.send('Email foi enviado!');
    });
});

app.listen(port, function () {
    console.log(`Examplo aplicação escutando a porta ${port}!`);
});