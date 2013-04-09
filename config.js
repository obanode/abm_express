// ********** config main ********** (DEFAULT)
var Default = {};
// Puerto default
Default.port = 3000;
// Path views default
Default.views = __dirname + '/views';
Default.engine = 'jade';
Default.logger_mode = 'dev';

// ********** otro config **********
var Example = {};
Example.a = 'a';

// Distintas configuraciones
var config = {};
config.Default = Default;
config.Example = Example;

module.exports = config;