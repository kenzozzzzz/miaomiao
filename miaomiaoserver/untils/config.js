// config.js
var mongoose = require('mongoose');
var nodemailer =require('nodemailer');

var Mongoose = {
	url : 'mongodb://localhost:27017/miaomiao',
	connect(){
		mongoose.connect(this.url,{ useNewUrlParser:true ,  useUnifiedTopology: true },(err)=>{
			if(err){
				console.log('bad');
				return;
			}
			console.log('shujukuOK');
		})
	}
};

var Email ={
	config: {
		host: 'smtp.163.com',
		port: 25,
		auth: {
			user: 'gdpu_zhaohaoyuan@163.com',//发件人
			pass: 'BLUAULPNRDRFGKSJ'//密钥
		}
	},
	get transporter(){
		return nodemailer.createTransport(this.config);
	},
	get verify(){
		return Math.random().toString().substring(2,6);
	},
	get time(){
		return Date.now();
	}
};

var Head = {
	baseUrl : 'http://localhost:3000/uploads/'
}

module.exports={
	Mongoose,
	Email,
	Head
};