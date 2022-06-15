module.exports = function(req,res){
    let offset = parseInt(process.env.DEFAULT_OFFSET);
    let count = parseInt(process.env.DEFAULT_COUNT);
    const maxCount = process.env.DEFAULT_MAX_FIND;

    if(Object.keys(req.query).length>0 && req.query.offset) offset = parseInt(req.query.offset); 
    if(Object.keys(req.query).length>0 && req.query.count) count = parseInt(req.query.count); 
    if(isNaN(offset)||isNaN(count)) {
        res.status(400).json({"message": "QueryString Offset and Count should be numbers"});
        return {offset:0,count:0};
    }
    if(count > maxCount){//ERROR MAXCOUNT NOT DEFINED
        res.status(400).json({"message": "Can not exceed count of "+maxCount});
        return {offset:0,count:0};
    }
    return {offset,count};
} 

