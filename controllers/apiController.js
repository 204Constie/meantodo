var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/todos/:uname', function(req, res) {

        Todos.find({ username: req.params.uname }, function(err, todos) {
            if (err) throw err;

            res.send(todos);
        });

    });

    app.get('/api/todo/:id', function(req, res) {

       Todos.findById({ _id: req.params.id }, function(err, todo) {
           if (err) throw err;

           res.send(todo);
       });

    });

    app.post('/api/todo', function(req, res) {
      console.log('req.body._id: ', req.body.data._id);

        if (req.body.data._id) {
          console.log('req.body._id: ', req.body.data._id);
            Todos.findByIdAndUpdate(req.body.data._id, { todo: req.body.data.todo, isDone: req.body.data.isDone, hasAttachment: req.body.data.hasAttachment }, function(err, todo) {
                if (err) throw err;

                res.send('Success');
            });
        }

        else {

           var newTodo = Todos({
               username: 'test',
               todo: req.body.data.todo,
               isDone: req.body.data.isDone,
               hasAttachment: req.body.data.hasAttachment
           });
           newTodo.save(function(err) {
               if (err) throw err;
               res.send('Success');
           });

        }

    });

    app.delete('/api/todo', function(req, res) {
      console.log('req.body._id: ', req.body._id);

        Todos.findByIdAndRemove(req.body._id, function(err) {
            if (err) throw err;
            res.send('Success of delete');
        })

    });

}
