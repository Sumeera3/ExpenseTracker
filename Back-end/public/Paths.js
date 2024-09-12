var http=require('http')
http.createServer(function(req,res){
    const{url,method}=req;
    if(url==="/signup"){
        res.write("signup page")
    }
    else if(url==="/login"){
        res.write("login page")
    }
    else{
        res.write("Home page")
    }
    res.end();

}).listen(8080)