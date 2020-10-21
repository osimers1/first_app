const jsonfile = require("jsonfile");
const file_path = "./DB/user.json";
const bodyParser  = require("body-parser");

module.exports = (app) => {

//---------------------for get any data--------------------------------------------------------------------    
    app.get("/users", (req, res) => {
        console.log("fetching all users");
      
        // jsonfile reading
        jsonfile.readFile("./DB/user.json", function(err, content) {
          // send file contents back to sender
          res.send(content);
        });
    });
//---------------------for post any data--------------------------------------------------------------------
    app.post("/users/new", (req, res) => {
        console.log(res.body);
        
        let {email, username} = req.body;
        console.log({email, username});
    
        jsonfile.readFile(file_path, function(err, content) {
    
          content.push({email, username});
          console.log({email, username}.email + {email, username}.username + " added to DB");
    
          jsonfile.writeFile(file_path, content, function(err) {
            console.log(err);
          });
    
          res.sendStatus(200);
    
        });
    
    });
//---------------------for delete any data--------------------------------------------------------------------
    app.delete("/users/destroy", (req, res) => {

        let email = req.body.email;
    
        jsonfile.readFile(file_path, function(err, content) {
    
          for (var i = content.length - 1; i >= 0; i--) {
    
            if (content[i].email === email) {
              console.log("removing " + content[i].email + "from DB");
              content.pop(i);
            }
    
          }
    
          jsonfile.writeFile(file_path, content, function(err) {
            console.log(err);
          });
    
          res.sendStatus(200);
        });
    });
//---------------------for change any data--------------------------------------------------------------------
      app.put("/user", (req, res) => {
        let user;
        let username = req.body.username;
        let email    = req.query.email;
      
        jsonfile.readFile(file_path, function(err, content) {
          for (var i = content.length - 1; i >= 0; i--) {
            if (content[i].email === req.query.email) {
      
              console.log("updated user " + req.query.email + " has now username : " + username);
      
              user = content[i];
              user.username = username;
      
            }
          }
      
          jsonfile.writeFile(file_path, content, function(err) {
            console.log(err);
          });
      
        });
        res.send(user);
    });

    app.get("/user", (req, res) => {
        let user;
        let email = req.query.email;
      
        jsonfile.readFile(file_path, function(err, content) {
          for (var i = content.length - 1; i >= 0; i--) {
            if (content[i].email === email) {
              console.log("found user" + content[i]);
              console.log(content[i]);
              user = content[i];
            }
          }
      
          res.send(user);
        });
    });
    
}

