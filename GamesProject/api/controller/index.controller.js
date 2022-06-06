module.exports.test = function(req,res){
    console.log('from test');
    res.end('end');
}
module.exports.testJson = (req,res)=>{
    res.status(200).send({"name":"test"});
}

module.exports.index = (req,res)=>{
    console.log('route /');
    res.render('index.html');
}