
module.exports = function(app) {

  //Importar modelos a usar por la vista
  var Tarea = require('../models/tarea');

  app.get('/tareas/nueva', function(req, res){
    res.render('tareas/create', { title: 'Nueva Tarea' });
  });

  app.get('/tareas/listado', function(req, res){
    Tarea.find({}, function(err, docs){
      res.render('tareas/index', { 
        title: 'Listado de Tareas', 
        docs: docs 
      });
    });
  });

  app.get('/tareas/:id/editar', function(req, res){
    Tarea.findById(req.params.id, function(err, doc){
      res.render('tareas/edit', {
        error: err,
        title: 'Editar tarea',
        tarea: doc
      });
    });
  });

  app.post('/tareas/nueva', function(req, res){
    var tarea = new Tarea(req.body.tarea);
    tarea.save(function(err){
        if(!err){
          res.redirect('/tareas/listado');
        }else{
          res.redirect('/tareas/nueva');
        }
    });
  });

  app.put('/tareas/:id', function(req, res){
    Tarea.findById(req.params.id, function(err, doc){
      doc.desc = req.body.tarea.desc;
      doc.save(function(err){
        if(!err){
          res.redirect('/tareas/listado');
        }else{
          //TODO handle errors
        }
      });
    });
  });

  app.del('/tareas/:id', function(req, res){
    Tarea.findById(req.params.id, function(err, doc){
      if (!doc) 
        return next(new NotFound('Document not Found'));
      else
        doc.remove(function(err){
          res.redirect('/tareas/listado');
        });
    });
  });
}