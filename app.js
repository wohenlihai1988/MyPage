var express = require('express');
var bodyParser = require('body-parser')
var http = require('http');
var app = express();
fs = require('fs');
var fm = require('json-front-matter');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/index', function(req, res){
	res.render('index', {
		mainTitle: "海阔天空", 
		subTitle: "海阔凭鱼跃，天高任鸟飞",
		post1_title: "写给朋友的Unity入门教程1",
		post1_subtitle: "实用至上",
		post1_author: "刘欢",
		post1_date: "2017.2.17",
		post1_content: "Unity 和其他的游戏引擎比如cocos，有个很大的区别，就是代码的组织方式，如果之前没有接触过类似的方式，会觉得很奇怪。运行游戏之后连入口都找不到在哪",
	});

});

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
		fs.writeFile('posts/test.md', req.body.message, function  (err) {
			if(err){
				console.log(err)
			}
		});
	}

	var body = req.body
	res.set('Content-Type', "text/plain")
	res.send('you send : ${body} to express')
});

app.get('/about', function(req, res){
	fs.readFile('posts/about.md', 'utf8', function(err, data){
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
	fs.readFile('posts/test.md', 'utf8', function(err, data){
		if(err){
			res.send(404)
		}else{
			var out = fm.parse(data)
			res.render('post', {
				title: out.attributes.title,
				subTitle: out.attributes.subTitle,
				author: out.attributes.author,
				date: out.attributes.date,
				content: out.body,
				p1: out.attributes.p1,
				p2: out.attributes.p2,
				p3: out.attributes.p3,
				p4: out.attributes.p4,
				p5: out.attributes.p5,
			})
		}
	});
});

app.get('/post', function(req, res){
	fs.readFile('posts/post.md', 'utf8', function(err, data){
		if(err){
			res.send(404)
		}else{
			var out = fm.parse(data)
			res.render('post', {
				title: out.attributes.title,
				subTitle: out.attributes.subTitle,
				author: out.attributes.author,
				date: out.attributes.date,
				content: out.body,
				p1: out.attributes.p1,
				p2: out.attributes.p2,
				p3: out.attributes.p3,
				p4: out.attributes.p4,
				p5: out.attributes.p5,
			})
		}
	});
})

app.locals.title = "custom title";

var server = http.createServer(app);
server.listen(80);
console.log('server started on 3000 port')
