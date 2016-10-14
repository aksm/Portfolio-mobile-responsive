var express = require("express");
var app = express();
var nodemailer = require("nodemailer");
var smptpTrans = require("nodemailer-smtp-transport");
var port = Number(process.env.PORT || 3000);

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/assets'));

app.post("/contact", function (request, response) {
  var transporter = nodemailer.createTransport(smtpTrans({
    host: "smtp.mail.com",
    port: 587,
    auth: {
      user: "rbootcamp@mail.com",
      pass: process.env.mailpass
    }
  }));
  var mailOptions = {
    from: "rbootcamp@mail.com",
    to: "albert.min@gmail.com",
    subject: "portfolio contact",
    text: request.query.email+"\n"+request.query.message
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error) {
      console.log(error);
    } else {
    response.json({yo: info.response});
    }
  });
  response.sendStatus(200);
});
app.listen(port);

