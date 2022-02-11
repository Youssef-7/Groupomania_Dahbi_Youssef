const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const cookieSession = require ('cookie-session');

// import routes
const loginRoutes = require('./routes/login.js');
const usersRoutes = require('./routes/users.js');
const topicMessageRoutes = require('./routes/topic_messages.js');
 
const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // header ou on renvoie le token
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const port = 3000;
// app.use(cookieSession({
//     name: "session",
//     secret: "SeCuRe",
//     cookie: {
//         secure: true,
//         httpOnly: true,
//         domain: "http://localhost:" + port + "/",
//     },
// }));

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// use routers
app.use('/api', loginRoutes);
app.use('/api', usersRoutes);
app.use('/api', topicMessageRoutes); 

app.listen(port, () => console.log('Server running at http://localhost:' + port));

module.exports = app;