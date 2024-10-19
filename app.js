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


app.get("/get",function(req,res){
          res.json({"success":true,"message":"<h3>It seems like you can't do this<\/h3>\n        <p>This could be because you don't have permission to do this or you entered some details incorrectly.\n        To check your permissions, please ask your admin team to follow\n        <a href='https:\/\/support.arbor-education.com\/hc\/en-us\/articles\/10891079268253-How-can-I-check-a-staff-member-user-s-access-to-different-pages-'>our guidance<\/a>\n         by sending them this URL: <b>\/academic-year\/list-good-cycles-or-weeks\/default-week\/2024-09-05?_dc=1725482192850<\/b><\/p><div class=\"system-modal-id\">ID:76493c28-6afd-11ef-9fda-0ad06f1b5cad<\/div>","logged_in":true})
})

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
