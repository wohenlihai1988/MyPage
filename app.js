var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
fs = require('fs');
var fm = require('json-front-matter');
var readline = require('readline');
const path = require('path');
const postMgr = require('./postMgr.js');

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

var postList = new Array();
var titleList = new Array()
var subTitleList = new Array()
var dateList = new Array()
var authorList = new Array()
var contentList = new Array()

app.get('/index', function(req, res){
	if(postList.length < 1){
		getAllPosts(function(){
			res.render('index', {
				postTitle : titleList,
				postSubTitle : subTitleList,
				postDate : dateList,
				postAuthor : authorList,
				postContent : contentList,
			});
		})
	}else{
		res.render('index', {
			postTitle : titleList,
			postSubTitle : subTitleList,
			postDate : dateList,
			postAuthor : authorList,
			postContent : contentList,
		});
	}

});

function getAllPosts(onfinish){
	var list = postMgr.getAllPosts(function(list){
		for(var i = 0; i < list.length; i++){
			postMgr.getPost(list[i], function(post){
				postList.push(post)
				if(postList.length == list.length){
					initPosts();
					if(null != onfinish){
						onfinish()
					}
				}
			})
		}
	})
}

function initPosts(){
	for(var i = 0; i < postList.length; i++){
		var post = postList[i]
		titleList.push(post.title)
		console.log(post.title)
		subTitleList.push(post.subTitle)
		console.log(post.subTitle)
		authorList.push(post.author)
		console.log(post.author)
		dateList.push(post.date)
		console.log(post.date)
		contentList.push(post.content)
		console.log(post.content)
	}
}

app.use(bodyParser.urlencoded({extended : false}))

app.get('/', function(req, res){
	res.redirect('/index');
});

app.post('/sms', function(req, res){
	var body = req.body.Body
	console.log("get sms post")
	console.log(req.body.message)
	console.log(req.body.name)
	if(req.body.name == 'newpost'){
		fs.writeFile('text/test.md', req.body.message, function  (err) {
			if(err){
				console.log(err)
			}
		});
	}

	var body = req.body
	res.set('Content-Type', "text/plain")
	res.send('you send : ${body} to express')
});

app.get('/aboutme', function(req, res){
	fs.readFile('text/about.md', 'utf8', function(err, data){
		if(err){
			res.send(404)
		}else{
			var out = fm.parse(data)
			res.render('about', {
				title: out.attributes.title,
				subTitle: out.attributes.subTitle,
				p1: out.attributes.p1,
				p2: out.attributes.p2,
				p3: out.attributes.p3,
			})
		}
	});
});

app.get('/test', function(req, res){
	postMgr.getAllPosts(function(list){
		var str = ""
		for(var i = 0; i < list.length; i++){
			console.log(list[i])
			str += list[i]
		}
		res.send(str)
	})
});

app.get('/post', function(req, res){
	postMgr.getPost("post.md", function(post){
		res.render('post', post)
	})
})



app.get('/post1', function(req, res){
	postMgr.getPost("post1.md", function(post){
		res.render('post', post)
	})
})



app.locals.title = "custom title";

var server = http.createServer(app);
server.listen(80);
console.log('server started on 3000 port')
