const express = require("express");


const app = express();


app.use(express.static(__dirname+ "/client/"))

app.get("/wave",function(req,res){
          res.sendFile(__dirname + "/client/html/game.html")
});

/*
This get request needs to be put above because of how how the code is run
it would check if the url is wave then execute code and drop the rest of the .get
however if it wasn't it would execute the /* which means all of them
*/




app.get("/", function(req, res) {
          res.sendFile(__dirname + "/client/html/home.html");
});

/*ServerSocket.on('connection',(socket) =>{
          console.log("This user connected")
          socket.on("disconnect",() =>{
                    console.log("This user disconnected")
          })

          socket.on("data",(data,callback) =>{
                    callback(data)
          })

})*/


const listener = app.listen(3000, function() { //make it listen to the http server we created on port 3000
  console.log("Your app is listening on port " + listener.address().port);
});
