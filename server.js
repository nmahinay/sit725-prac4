const { createProxy } = require('http-proxy');

const MongoClient = require('mongodb').MongoClient;
var express=require("express"),
    app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function (request,response) {
  var user_name = request.query.user_name;
  response.end("Hello" + user_name + "!")
});

app.get('/messages',function(req,res){
  retrieveMessages(res)

})

app.get('/message',function(req,res){
  
  let message=req.query.message
  insertMessage(message)
  res.send('added')
})

app.listen(port);
console.log("Listening to port", port);

require("cf-deployment-tracker-client").track();

const uri = "mongodb+srv://sit725:sit725@assignment1.vpqu2.mongodb.net/messageboard?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


let collectionMessage;



client.connect(err => {
  collectionMessage= client.db("messageboard").collection("messages");
  
 });

const insertMessage=(message)=>{
  collectionMessage.insertOne({message:message});
}



const retrieveMessages=(res)=>{
  collectionMessage.find().toArray(function(err, result){
    if (err) throw err;
    console.log(result);
    res.send(result)
  }) 
}

/*
setTimeout(function(){
   retrieveMessages();
  },20000)
*/
