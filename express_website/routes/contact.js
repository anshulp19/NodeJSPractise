var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', {title : 'Contact'});
});

router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
		    user: "johngalt",
		    pass: "atlasshrugged"
		}
	});
	var mailOptions = {
		from: "John Doe <johndoe@something.xyz>",
		to: "johngalt@gmail.com",
		text: "New submission with following details.. Name: " + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
		html: "<p>New submission with following details..</p><ul><li>Name: " + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
	};

	transporter.sendMail(mailOptions, function(err, info){
		console.log("..........");
		if(err){
			console.log("Error: " + err);
			res.redirect('/');
		}
		else{
			console.log('Message sent: ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;
