module.exports.procNum = (req,res)=>{
    let number = req.params.num;
    let qNum = 1;
    console.log('from path -> number:', number);
    if(Object.keys(req.query).length > 0) console.log(req.query); qNum = req.query.number;
    res.write(`Multiplication of ${number} and ${qNum} is: ${number*qNum}`);
    res.end(); /*is it neccesary? */
}