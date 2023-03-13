"use strict";
const express       = require('express');
const bodyParser    = require('body-parser');
const app           = express();
const app2          = express();
const mysql         = require('mysql');
const crypto        = require('crypto');
var moment          = require('moment');
var uniqid          = require('uniqid');
var helmet          = require('helmet');
var sanitizer       = require('sanitizer');
const requestIp     = require('request-ip');
var http            = require("http");
var querystring     = require('querystring');
app.use(requestIp.mw())

/*app.use(function(req, res) {
    const ip = req.clientIp;
    res.end(ip);
});*/

const conn = mysql.createConnection({
    host        : 'localhost',
    user        : 'root',
    password    : '',
    database    : 'db_movie'
});

conn.on('error', function(err) {
    console.log("[mysql error]",err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json({limit: '10kb'})); /* prevent ddos */
app.use(helmet())
const https = require('https');

//if request is blank
app.post('/', (req, res) => {
    res.send(JSON.stringify({"status": 500, "error": "Rizal is awewsome"}));
});

app.get('/godeg', (req, res) => {
    res.send(JSON.stringify({"status": 500, "error": "Godeg is awewsome"}));
});

/* parameters yang nanti bakal dipakai di banyak function */
let created_at  = moment.utc().format('YYYY-MM-DD HH:mm:ss');
let waktu       = moment.utc().format('HH:mm:ss');
/* end */

/* buat check token */
let tanggal         = moment().format('DDMMYYYY');
let secret          = 's1n4rm4s';
let gabungan        = tanggal+secret;
const token         = crypto.createHash('sha256').update(gabungan).digest('hex');
/* end */

/* function buat add log setiap query */
function addLog(log_action,notes) {
  let logDate         = moment.utc().format('YYYY-MM-DD HH:mm:ss');
  var postlog         = {log_action: log_action, created_at : logDate, notes: notes};
  let sqllog          = "INSERT INTO tbl_log SET ?";
  conn.query(sqllog, postlog)
}
/* end */



//=========== CREATE MOVIE ===========//
app.post('/api/createMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - title                     : Movie title
    - description               : Movie description
    - duration                  : Movie description
    - artists                   : Movie description
    - genres                    : Movie description
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const title         = sanitizer.sanitize(req.body.title);
    const description   = sanitizer.sanitize(req.body.description);
    const duration      = sanitizer.sanitize(req.body.duration);
    const artists       = sanitizer.sanitize(req.body.artists);
    const genres        = sanitizer.sanitize(req.body.genres);

    //check if parameter is empty?
    if(title == '' || description == '' || duration == '' || artists == '' || genres == '' || input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //success, insert
    var post        = {title: title, description: description, duration: duration, artists: artists,  genres: genres, created_at: created_at};
    let sql         = "INSERT INTO tbl_movie SET ?";
    conn.query(sql, post);

    //insert log
    addLog('CREATE MOVIE', 'create new movie with title: ' + title);

    conn.escape(sql);
    mysql.escape(sql);
    res.status(200).end(JSON.stringify({"message" : "SUCCESS"}));
});



//=========== UPDATE ===========//
app.post('/api/updateMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - movie ID                  : ID of movie to update
    - title                     : Movie title
    - description               : Movie description
    - duration                  : Movie description
    - artists                   : Movie description
    - genres                    : Movie description
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const movie_id      = sanitizer.sanitize(req.body.movie_id);
    const title         = sanitizer.sanitize(req.body.title);
    const description   = sanitizer.sanitize(req.body.description);
    const duration      = sanitizer.sanitize(req.body.duration);
    const artists       = sanitizer.sanitize(req.body.artists);
    const genres        = sanitizer.sanitize(req.body.genres);

    //check if parameter is empty?
    if(movie_id == null || movie_id == '' || title == '' || description == '' || duration == '' || artists == '' || genres == '' || input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //if movie ID exist?
    conn.query("SELECT movie_id FROM tbl_movie WHERE movie_id = ? LIMIT 1", [movie_id], function (error, results, fields) {
    if(results.length==0) {
        res.status(400).end(JSON.stringify({"message": 'invalid movie ID'}));
        return
      }else{
        //success
        let sql         = "UPDATE tbl_movie SET title =?, description =?, duration =?, artists =?, genres =? WHERE movie_id =?";
        conn.query(sql, [title, description, duration, artists, genres, movie_id])
        res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

        addLog('UPDATE MOVIE', 'update movie with movie ID: ' + movie_id);

        conn.escape(sql);
        mysql.escape(sql);
      return
      }
    });

});


//=========== MOST VIEWED MOVIE ===========//
app.post('/api/mostViewedMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT count(vote_id) as total, movie_id, title, description, genres, artists FROM tbl_movie a INNER join tbl_vote b USING (movie_id) GROUP BY movie_id ORDER BY total DESC LIMIT 1", function (error, results, fields) {
    if(results[0].total ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        //success
        res.status(200).end(JSON.stringify({"message": 'SUCCESS', "movie_id": results[0].movie_id, "title": results[0].title, "description": results[0].description}));

      return
      }
    });

});


//=========== MOST VIEWED GENRE ===========//
app.post('/api/mostViewedGenre', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT count(vote_id) as total, movie_id, title, description, genres, artists FROM tbl_movie a INNER join tbl_vote b USING (movie_id) GROUP BY movie_id ORDER BY total DESC LIMIT 1", function (error, results, fields) {
    if(results.length ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        //success
        res.status(200).end(JSON.stringify({"message": 'SUCCESS', "movie_id": results[0].movie_id, "genres": results[0].genres}));
      return
      }
    });

});


//=========== LIST MOVIE ===========//
app.get('/api/listMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }


    const limit = 2
    const page = req.query.page
    const offset = (page - 1) * limit
    conn.query("SELECT movie_id, title, description, genres, duration FROM tbl_movie ORDER BY movie_id LIMIT "+limit+" OFFSET "+offset, function (error, results, fields) {
      if(results.length ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        var jsonResult = {
          'page_count':results.length,
          'page_number':page,
          'data':results
        }
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Data for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      }
    })

});


//=========== SEARCH MOVIE ===========//
app.post('/api/searchMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const txt_search    = sanitizer.sanitize(req.body.txt_search);
    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '' || txt_search== '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }


    const limit = 2
    const page = req.query.page
    const offset = (page - 1) * limit
    // OR description LIKE '%?%' OR artists LIKE '%?%' OR genres LIKE '%?%'
    const sql = "SELECT movie_id, title, description, genres, duration FROM tbl_movie WHERE title LIKE '%"+txt_search+"%' OR description LIKE '%"+txt_search+"%' OR artists LIKE '%"+txt_search+"%' OR genres LIKE '%"+txt_search+"%' ORDER BY movie_id LIMIT "+limit+" OFFSET "+offset

    conn.query(sql, [txt_search, txt_search, txt_search, txt_search], function (error, results, fields) {
      if(results.length ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        var jsonResult = {
          'page_count':results.length,
          'page_number':page,
          'data':results
        }
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Data for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      }
    })

});



//=========== REGISTER USER ===========//
app.post('/api/userRegister', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - username                  : username
    - password                  : password
    - full_name                  : full_name
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const username      = sanitizer.sanitize(req.body.username);
    const password      = sanitizer.sanitize(req.body.password);
    const full_name     = sanitizer.sanitize(req.body.full_name);

    //check if parameter is empty?
    if(input_token == '' || username == '' || username == null || password == '' || password == null || full_name == '' || full_name == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT username FROM tbl_user WHERE username = ? LIMIT 1", [username], function (error, results, fields) {
    if(results.length > 0) {
        res.status(400).end(JSON.stringify({"message": 'duplicate username'}));
        return
      }else{
        //success
        let password2   = crypto.createHash('sha256').update(password).digest('hex');
        var post        = {username: username, password: password2, full_name: full_name, created_at: created_at};
        let sql         = "INSERT INTO tbl_user SET ?";
        conn.query(sql, post);
        res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

        addLog('USER REGISTER', 'user registration with username: ' + username);

        conn.escape(sql);
        mysql.escape(sql);
      return
      }
    })

})


//=========== LOGIN USER ===========//
app.post('/api/userLogin', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - username                  : username
    - password                  : password
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const username      = sanitizer.sanitize(req.body.username);
    const password      = sanitizer.sanitize(req.body.password);

    //check if parameter is empty?
    if(input_token == '' || username == '' || username == null || password == '' || password == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT user_id, username, password FROM tbl_user WHERE username = ? LIMIT 1", [username], function (error, results, fields) {
    if(results.length == 0) {
        res.status(400).end(JSON.stringify({"message": 'invalid username'}));
        return
      }else{
        //is the user already login?
        conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? LIMIT 1", [results[0].user_id], function (error, results2, fields) {
          if(results2.length > 0) {
            res.status(400).end(JSON.stringify({"message": 'this user already login'}));
            return
          }else{
            //password correct?
            let password2   = crypto.createHash('sha256').update(password).digest('hex');
            if(password2 != results[0].password) {
              res.status(400).end(JSON.stringify({"message": 'wrong password'}));
              return
            }else{
              //SUCCESS
              let session_id = crypto.createHash('sha256').update(username).digest('hex');

              var post        = {user_id: results[0].user_id,  session_id: session_id, created_at: created_at};
              let sql         = "INSERT INTO tbl_user_session SET ?";
              conn.query(sql, post);

              res.status(200).end(JSON.stringify({"message": 'SUCCESS', 'user_id': results[0].user_id, 'session_id': session_id}));

              addLog('USER LOGIN', 'user login with user_id: ' + results[0].user_id);
              return
            }
          }
        })
      }
    })

})


//=========== LOGOUT USER ===========//
app.post('/api/userLogout', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - username                  : username
    - password                  : password
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const user_id       = sanitizer.sanitize(req.body.user_id);
    const session_id    = sanitizer.sanitize(req.body.session_id);

    //check if parameter is empty?
    if(input_token == '' || user_id == '' || user_id == null || session_id == '' || session_id == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT user_id FROM tbl_user WHERE user_id = ? LIMIT 1", [user_id], function (error, results, fields) {
    if(results.length == 0) {
        res.status(400).end(JSON.stringify({"message": 'invalid user_id'}));
        return
      }else{
        //is the user already login?
        conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? AND session_id = ? LIMIT 1", [user_id, session_id], function (error, results2, fields) {
          if(results2.length == 0) {
            res.status(400).end(JSON.stringify({"message": 'this user is not login or invalid session_id'}));
            return
          }else{
            //SUCCESS
            let sql_delete     = "DELETE FROM tbl_user_session WHERE user_id = ? AND session_id = ? LIMIT 1";
            conn.query(sql_delete, [user_id, session_id]);

            res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

            addLog('USER LOGOUT', 'user logout with user_id: ' + user_id);
            return
          }
        })
      }
    })

})


//=========== VOTE MOVIE ===========//
app.post('/api/voteMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - user_id                  : user_id
    - movie_id                  : movie_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const user_id       = sanitizer.sanitize(req.body.user_id);
    const movie_id      = sanitizer.sanitize(req.body.movie_id);

    //check if parameter is empty?
    if(input_token == '' || user_id == '' || user_id == null || movie_id == '' || movie_id == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT user_id FROM tbl_vote WHERE user_id = ? AND movie_id = ? LIMIT 1", [user_id, movie_id], function (error, results, fields) {
    if(results.length > 0) {
        res.status(400).end(JSON.stringify({"message": 'user cannot vote for same movie_id'}));
        return
      }else{
        //is the user already login?
        conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? LIMIT 1", [user_id], function (error, results2, fields) {
          if(results2.length == 0) {
            res.status(400).end(JSON.stringify({"message": 'this user is not login'}));
            return
          }else{
            //SUCCESS
            var post        = {user_id: user_id,  movie_id: movie_id, created_at: created_at};
            let sql         = "INSERT INTO tbl_vote SET ?";
            conn.query(sql, post);

            res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

            addLog('VOTE MOVIE', 'user vote with user_id: ' + user_id);
            return
          }
        })
      }
    })

})


//=========== UNVOTE MOVIE ===========//
app.post('/api/unvoteMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - user_id                   : user_id
    - movie_id                  : movie_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const user_id       = sanitizer.sanitize(req.body.user_id);
    const movie_id      = sanitizer.sanitize(req.body.movie_id);

    //check if parameter is empty?
    if(input_token == '' || user_id == '' || user_id == null || movie_id == '' || movie_id == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT user_id FROM tbl_vote WHERE user_id = ? AND movie_id = ? LIMIT 1", [user_id, movie_id], function (error, results, fields) {
    if(results.length == 0) {
        res.status(400).end(JSON.stringify({"message": 'no data to unvote'}));
        return
      }else{
        //is the user already login?
        conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? LIMIT 1", [user_id], function (error, results2, fields) {
          if(results2.length == 0) {
            res.status(400).end(JSON.stringify({"message": 'this user is not login'}));
            return
          }else{
            //SUCCESS
            let sql_delete     = "DELETE FROM tbl_vote WHERE user_id = ? AND movie_id = ? LIMIT 1";
            conn.query(sql_delete, [user_id, movie_id]);

            res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

            addLog('UNVOTE MOVIE', 'user unvote with user_id: ' + user_id);
            return
          }
        })
      }
    })

})


//=========== LIST USER VOTED ===========//
app.get('/api/listUserVoted', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }


    const limit = 10
    const page = req.query.page
    const offset = (page - 1) * limit
    conn.query("SELECT full_name, movie_id FROM tbl_vote a INNER JOIN tbl_user b USING (user_id) INNER JOIN tbl_movie c USING (movie_id) LIMIT "+limit+" OFFSET "+offset, function (error, results, fields) {
      if(results.length ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        var jsonResult = {
          'page_count':results.length,
          'page_number':page,
          'data':results
        }
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Data for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      }
    })

});


//=========== START MOVIE (HIT THIS WHEN USER START WATCHING) ===========//
app.post('/api/startMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - user_id                   : user_id
    - movie_id                  : movie_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);
    const user_id       = sanitizer.sanitize(req.body.user_id);
    const movie_id      = sanitizer.sanitize(req.body.movie_id);

    //check if parameter is empty?
    if(input_token == '' || user_id == '' || user_id == null || movie_id == '' || movie_id == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    let movie_session_id = crypto.createHash('sha256').update(movie_id+user_id).digest('hex');
    conn.query("SELECT user_id FROM tbl_watchtime WHERE user_id = ? AND movie_id = ? AND movie_session_id = ? LIMIT 1", [user_id, movie_id, movie_session_id], function (error, results, fields) {
    if(results.length > 0) {
        res.status(400).end(JSON.stringify({"message": 'same user is watching'}));
        return
      }else{
        //is the user already login?
        conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? LIMIT 1", [user_id], function (error, results2, fields) {
          if(results2.length == 0) {
            res.status(400).end(JSON.stringify({"message": 'this user is not login'}));
            return
          }else{
            //SUCCESS
            var post        = {user_id: user_id,  movie_id: movie_id, movie_session_id: movie_session_id, start: waktu, created_at: created_at};
            let sql         = "INSERT INTO tbl_watchtime SET ?";
            conn.query(sql, post);

            res.status(200).end(JSON.stringify({"message": 'SUCCESS', "movie_session_id": movie_session_id}));

            addLog('START MOVIE', 'user start watch movie with user_id: ' + user_id + ' and movie_id: ' + movie_id);
            return
          }
        })
      }
    })

})


//=========== END MOVIE (HIT THIS WHEN USER END WATCHING OR CLICK END) ===========//
app.post('/api/endMovie', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    - user_id                   : user_id
    - movie_id                  : movie_id
    */

    const input_token       = sanitizer.sanitize(req.body.token);
    const user_id           = sanitizer.sanitize(req.body.user_id);
    const movie_id          = sanitizer.sanitize(req.body.movie_id);
    const movie_session_id  = sanitizer.sanitize(req.body.movie_session_id);

    //check if parameter is empty?
    if(input_token == '' || user_id == '' || user_id == null || movie_id == '' || movie_id == null || movie_session_id == '' || movie_session_id == null) {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }

    //data exist?
    conn.query("SELECT user_id, start, end FROM tbl_watchtime WHERE user_id = ? AND movie_id = ? AND movie_session_id = ? LIMIT 1", [user_id, movie_id, movie_session_id], function (error, results, fields) {
    if(results.length == 0) {
        res.status(400).end(JSON.stringify({"message": 'this user not watching this movie'}));
        return
      }else{
        if(results[0].end != null) {
          res.status(400).end(JSON.stringify({"message": 'this user already end watching'}));
          return
        }else{
          //is the user already login?
          conn.query("SELECT user_id FROM tbl_user_session WHERE user_id = ? LIMIT 1", [user_id], function (error, results2, fields) {
            if(results2.length == 0) {
              res.status(400).end(JSON.stringify({"message": 'this user is not login'}));
              return
            }else{
              //SUCCESS
              let sql         = "UPDATE tbl_watchtime SET end =? WHERE user_id = ? AND movie_id =? AND movie_session_id = ?";
              conn.query(sql, [waktu, user_id, movie_id, movie_session_id])

              res.status(200).end(JSON.stringify({"message": 'SUCCESS'}));

              addLog('END MOVIE', 'user end watch movie with user_id: ' + user_id + ' and movie_id: ' + movie_id);
              return
            }
          })
         }
        }
      })

})



//=========== TRACE VIEWERSHIP ===========//
app.get('/api/traceViewership', (req, res) => {
    /*
    parameter need:
    - token                     : Combination of hash(256) -> DDMMYYYY + secret_key + app_id
    */

    const input_token   = sanitizer.sanitize(req.body.token);

    //check if parameter is empty?
    if(input_token == '') {
        res.status(400).end(JSON.stringify({"message": "Parameter kosong"}));
        return;
    }

    //check is token matched?
    if(token != input_token) {
        res.status(400).end(JSON.stringify({"message": "invalid token",  'tokennya: ': token}));
        return;
    }


    const limit = 10
    const page = req.query.page
    const offset = (page - 1) * limit
    conn.query("SELECT movie_id, title, sum(TIMESTAMPDIFF(MINUTE, start,end)) AS total_watchtime_in_minutes FROM tbl_movie a INNER JOIN tbl_watchtime b USING (movie_id) GROUP BY a.movie_id LIMIT "+limit+" OFFSET "+offset, function (error, results, fields) {
      if(results.length ==0) {
        res.status(400).end(JSON.stringify({"message": 'data is empty'}));
        return
      }else{
        var jsonResult = {
          'page_count':results.length,
          'page_number':page,
          'data':results
        }
        var myJsonString = JSON.parse(JSON.stringify(jsonResult));
        res.statusMessage = "Data for page "+page;
        res.statusCode = 200;
        res.json(myJsonString);
        res.end();
      }
    })

});


app.listen(3008, () => console.log('Thanks God Metallica is still exist'));
