const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const {
    localFrontend, prodFrontend
} = require('./config.json');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const errorHandler = require('./helpers/errorHandler');
const jwt = require('./helpers/jwt');
const io = new Server(server);
const PORT = process.env.PORT || 5000;
const userRoutes = require('./users/users.routes');
const todoRoutes = require('./todo/todo.routes')

// socket handler
require('./helpers/socket')(io);

// cors config
const frontend = process.env.NODE_ENV !== 'production' ? localFrontend : prodFrontend;
app.use(cors({
    origin: frontend,
    credentials: true,
    optionsSuccessStatus: 200
}));

// multer config
const multerMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
app.use(multerMiddleware.array('file', 1));

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// authenticating routes via JsonWebToken
app.use(jwt());

// custom api routes
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

// error handler
app.use(errorHandler);

// listening to requests
server.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));