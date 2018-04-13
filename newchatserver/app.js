var express = require('express');
var bodyParser = require('body-parser');
var fetchJson = require('node-fetch-json');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db;
var app = express();
// var cors = require('cors');

// app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// pratar med databasen
MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) {
    console.error('Failed to connect to the database!');
    console.log(error);
  } else {
    console.log('Successfully connected to the database!');
    db = client.db('chattdb');
  }
});

// express visar vad som finns inuti frontend mappen (så att localhost:3000/ får content som ligger i frontend)
// app.use('/', express.static(path.join(__dirname, '..', 'frontend')));
// app.use('/gruppchatt', express.static(path.join(__dirname, '..', 'frontend')));
// app.use('/privatchatt', express.static(path.join(__dirname, '..', 'frontend')));


// OBS! tar bort all data i databasen
// app.post('/', function (request, response) {
//   db.collection('messages').remove({}, function (error, result) {
//     if (error) {
//       response.status(500).send(error);
//       return;
//     } else {
//       response.send(result);
//     }
//   })
// })
 /*-------------------------------register---------------------------------*/

 app.post('/api/register', function(request, response) {
  db.collection('users').find({
    "userName": request.body.userName
  }).toArray(function(error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else if (result.length == 0) {
      db.collection('users').insert(request.body,
        function(error, result) {
          if (error) {
            response.status(500).send(error);
            return;
          } else {
            response.send(result);
          }
        });
    } else if (result.length >= 1) {
      response.status(409).send();
    }
  })
});

app.get('/api/register', function(request, response) {
  db.collection('users').find({}).toArray(function(error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  })
});
/*-------------------------------inlogg---------------------------------*/

app.post('/api/inlogg', function (request, response) {
  const { userName, passWord } = request.body;

  db.collection('users').findOne({ userName, passWord }).then(data => {
    if (data) {
      response.json(data);
    } else {
      response.json({ error: 'Wrong password' });
    }
  })

  // response.sendStatus(200);

  // db.collection('users').insert(request.body,
  //   function (error, result) {
  //     if (error) {
  //       response.status(500).send(error);
  //       return;
  //     } else {
  //       response.send(result);
  //     }
  //   }
  // )

  // db.collection('users').insert(request.body,
  //   function (error, result) {
  //     if (error) {
  //       response.status(500).send(error);
  //       return;
  //     } else {
  //       response.send(result);
  //     }
  //   }
  // )
});



app.get('/api/inlogg', function (request, response) {
  db.collection('users').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
        response.send(result);
      }
    });
  });


/*---------------------gruppchatten----------------------------------*/
// lägger till data i databasen för gruppchatten
app.post('/api/gruppchatt', function (request, response) {
  db.collection('messages').insert(request.body,
  function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
      response.send(result);
    }
  });
});


// skickar datan från chattdb till react gruppchatten
app.get('/api/gruppchatt', function (request, response) {
  db.collection('messages').find({}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
        response.send(result);
      }
    });
  });


/*--------------------------privatchatten---------------------------------*/
app.post('/privmsg', function (request, response) {
  db.collection('privmessages').insert(request.body,
    function (error, result) {
      if (error) {
        response.status(500).send(error);
        return;
      } else {
        response.send(result);
      }
    }
  )
});



app.get('/privmsg/:user2/:user1', function (request, response) {
  db.collection('privmessages').find({ $and: [ { "privateSender": request.params.user1 }, { "receiver": request.params.user2 } ]}).toArray(function (error, result) {
    if (error) {
      response.status(500).send(error);
      return;
    } else {
        response.send(result);
      }
    });
  });

// Ny
app.listen(3003, function () {
  console.log('The server is running.')
});
