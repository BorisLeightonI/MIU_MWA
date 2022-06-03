let a = 4;
let b = 2;

const named = function(){

}

const promise = new Promise((resolve,reject)=>{
    if(a>2){
        resolve('static message');
    }else{
        reject('reject static message');
    }
});

const thenCallback = function(arg){
    console.log('In the callback then, arg:', arg, ' a: ',a);
}

const catchCallback = function(arg){
    console.log('In the callback catch, arg:', arg);
}

promise.then(thenCallback).catch(catchCallback);