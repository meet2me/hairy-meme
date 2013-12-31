var DB = require('./models/db-handle');
module.exports = function(app){
  //Landing page
  app.get('/', function(request, response){
    if(request.session.email !== undefined)
    {
      response.redirect('dashboard');
    }
    else
    {
      response.render('index');
    }
  });

  //Auto-login if Session persists
  app.get('/login', function(request, response){
    console.log('Session:'+ request.cookies.user);
    if(request.session.email === undefined){
      response.redirect('/');
    }
    else
    {
      DB.autoLogin(request.cookies.email, request.cookies.pass, function(){
        response.redirect('/');
      });
    }
  });

  //Manual Login
  app.post('/', function(request, response){
    DB.manualLogin(request.param('email'), request.param('pass'), function(err, data){
      console.log('Inside manual login');
      if (err){
        console.log(err);
        response.send(err, 400);
      }
      else{
        request.session.email = data.email;
        request.session.name = data.name;
        request.session.userId = data._id;
        request.session.data = data;
        console.log(request.param('remember-me'));
        if(request.param('remember-me') == 'true'){
          response.cookie('email', data.email, { maxAge: 900000 });
          response.cookie('pass', data.pass, { maxAge: 900000 });
        }
        response.redirect('/dashboard');
      }
    });
  });

  //Logout
  app.get('/logout', function(request,response){
    request.session.destroy();
    response.redirect('/login');
    response.end();
  });

  //User Registration
  app.get('/register', function(request, response){
    if(request.session.email !== undefined)
    {
      response.redirect('dashboard');
    }
    else
    {
      response.render('register');
    }
  });
  app.post('/register', function(request, response){
    DB.addNewAccount({
      name  : request.param('name'),
      email : request.param('email'),
      pass  : request.param('pass')
    }, function(err,records){
      if (err){
        response.render('register', {msg:"Email already exists."});
      } else{
        response.send('A/c created', 200);
        response.redirect('/');
      }
    });
    // response.redirect('/');
  });

  //User Profile and Account Management
  app.get('/account', function(request, response){
    var msg = request.param('msg');
    if( request.session.email === undefined )
    {
      response.redirect('/login');
    }
    DB.userInfoByEmail(request.session.email, function(err, item){
      if(err)
      {
        console.log('Error : '+err);
      }
      if(msg !== null)
      {
        response.render('user',{item : item, url : '/account', msg:msg});
      }
      else{
        response.render('user',{item : item, url : '/account'});
      }
    });
  });

  //Editing User's name
  app.post('/editName', function(request, response){
    request.session.name = request.param('name');
    DB.editAccountNames(request.session.email,
      {name  : request.param('name')},
      function(err){
        if(err)
          console.log('Error: '+err);
      }
    );
    response.redirect('/account?msg=cnm');
  });

  //Editing User's password
  app.post('/editPass', function(request, response){
    if(request.param('pwd') != request.param('c_pwd'))
    {
      response.send('Password Does not match.');
    }
    else
    {
      DB.editAccountPass(request.session.email,
        {pwd : request.param('pwd'),
         c_pwd : request.param('c_pwd') },
         function(err)
         {
          if(err)
            console.log(err);
         }
        );
      response.redirect('/account?msg=cpwd');
    }
  });

  
  //Simple Contact-us page
  app.get('/contact', function(request, response){
    response.render('contact', { url : '/contact' });
  });
};
