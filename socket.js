const SocketIO = require('socket.io');

module.exports = (server, app) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    room.on('connection', (socket) => {
        console.log('room 네임스페이스 접속');
        socket.on('disconnect', () => {
            console.log('room 네임스페이스 접속 해제');
        });
    });
    chat.on('connection', (socket) => {
        console.log('chat 네임스페이스에 접속');
        socket.on('join', (data) => {
            socket.join(data);
        });
        socket.on('disconnect', () => {
            console.log('chat 네임스페이스 접속 해제');
        });
    });
};
