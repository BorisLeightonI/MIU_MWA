const http = require('http');
const fs = require('fs');

const procData = (res,err,data)=>{
    if(err){
        res.writeHead(400, {'Content-Type':'text/html'});
        res.write(err.message);
    }else{
        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
    }
    res.end();
}

const serveIndex = (req,res)=>{
    fs.readFile('index.html', (err,data)=>{
        procData(res,err,data);
    });
 
};

const servePage = (req,res)=>{
    let url = req.url;
    fs.readFile(url.slice(1,url.length)+'.html', (err,data)=>{
        procData(res,err,data);
    });
}

const serveJSON = (res,req)=>{
    res.setHeader('Content-Type', 'Application/json')
    res.writeHead(200);
    res.write("{'message':'Hello World!'}");
    res.end()
}

const toServer = function(req,res){
    if(req.method === 'GET'){

        switch (req.url) {
            case '/':
                serveIndex(req,res);
                break;
            case '/page1':
            case '/page2':
                console.log(req.url);
                servePage(req,res);
            break;
                
            default:
                console.log('default case: url', req.url);
                res.end('Page not found');
        }

    }else if(req.method === 'POST'){
        serveJSON(req,res);
    }
}



const server = http.createServer(toServer);


server.listen(4343, ()=>console.log('Server running on port 4343'));
