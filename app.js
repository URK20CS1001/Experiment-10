var http = require('http');
var fs = require('fs');
const { builtinModules } = require('module');

const server = http.createServer(function (req, res) {
    if(req.url==='/'){
        res.writeHead(200,{"Content-Type": "text/html"});
        fs.createReadStream('exp10.html').pipe(res);
    }
    else if(req.url ==='/server' && req.method == 'POST'){
        var rData = '';
        req.on('data',function(value){
            rData += value;
    })
        req.on('end',function(){
            var iData = new URLSearchParams(rData);
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write("<h1 style='text-align:center;color:blue;'><u>User Submitted Details</u></h1>");
            res.write("<table style='color:blue;margin-left:auto;margin-right:auto;text-align:center' border=1 cellspacing=0><tr><td>Name</td><td>"+iData.get('username')+"</td></tr>");
            res.write("<tr><td>Password</td><td>"+iData.get('password')+"</td></tr>");
            res.write("<tr><td>Age</td><td>"+iData.get('age')+"</td></tr>");
            res.write("<tr><td>Mobile Number</td><td>"+iData.get('number')+"</td></tr>");
            res.write("<tr><td>Email</td><td>"+iData.get('email')+"</td></tr>");
            res.write("<tr><td>Gender</td><td>"+iData.get('gender')+"</td></tr>");
            res.write("<tr><td>State</td><td>"+iData.get('state')+"</td></tr>");
            res.write("<tr><td>Skills</td><td>"+iData.get('skill[]')+"</td></tr>");
            res.end();
        });
    }
});

server.listen(8000,function(){
    console.log('listening at 8000')
});