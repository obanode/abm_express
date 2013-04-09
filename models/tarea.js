
var validaciones = {
	notEmpty : function(value){return value && value.length}
};


var mongoose = require('mongoose');

var TareaSchema = mongoose.Schema({ 
	desc: {type: String, validate: [validaciones.notEmpty, "El campo es obligatorio"]}
});

module.exports = mongoose.model('Tarea', TareaSchema);