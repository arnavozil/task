const init = io => {

    io.on('connection', socket => {
        console.log(`User connected on ${socket.id}`);
    
        socket.on('disconnect', () => {
            console.log(`User disconnected on ${socket.id}`);
        })
    });
};

module.exports = init;
