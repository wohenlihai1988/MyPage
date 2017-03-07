fs = require('fs');
var readline = require('readline');
const path = require('path');
var fm = require('json-front-matter');

function getAllPosts (onFinish) {
	var list = new Array()
	fs.readdir('posts/', 'utf8', function(err, files){
		if(err){
			res.send(404)
		}else{
			for(var i =0; i < files.length; i++){
				var index = files[i].indexOf('.md')
				if(index > 0){
					list.push(files[i])
				}
			}
		}
		if(null != onFinish){
			onFinish(list)
		}
	});
}

function getPost(postName, onFinish){
	console.log('getPost ' + postName)
	var post = {}
	const rl = readline.createInterface({
		input: fs.createReadStream('posts/' + postName)
	});

	// rl.on('line', (line)=>{
	// 	console.log('line form file : ' + line);
	// });

	fs.readFile('posts/' + postName, 'utf8', function(err, data){
		if(err){
			res.send(404)
		}else{
			var out = fm.parse(data)
			post = {
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
			}
		}
		if(null != onFinish){
			onFinish(post)
		}
	});

}

exports.getAllPosts = getAllPosts
exports.getPost = getPost

