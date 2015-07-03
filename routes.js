var chatter = require('chatter');

module.exports = function(app, io) {
    //Seteo de redireccion de sockets
    chatter.set_sockets(io.sockets);

    //Redireccion de sockets en conexion
    io.sockets.on('connection', function(socket) {
        chatter.connect_chatter({
            socket: socket,
            sala: "SRPAO",
            io: io
        });
    });

    var routeHandler = function(req, res) {
        sala = req.params.sala;
        res.send('Esta web está solo disponible para la App SRPAO Chat en Google Play o en la web <a href="http://goncy.github.io/srpaochat/">http://goncy.github.io/srpaochat/</a>');
    };

    app.get('/', routeHandler);

    app.get('*', function(req, res, next){res.redirect('/')});

    app.use(function(err, req, res, next) {
        res.send('Esta web está solo disponible para la App SRPAO Chat en Google Play o en la web <a href="http://goncy.github.io/srpaochat/">http://goncy.github.io/srpaochat/</a>');
    });
}