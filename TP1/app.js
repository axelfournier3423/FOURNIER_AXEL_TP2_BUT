const express = require('express');
const app = express();
const port = 3000;

const requestsCount = {
    "/": 0,
    "/welcome": 0,
    "/secret": 0,
    "/error": 0,
    "/img": 0,
    "/redirectMe": 0,
    "/users/:name": 0,
    "/somme": 0,
    "/metrics": 0
}

app.use((req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}]: ${req.path}`);
    if (requestsCount[req.path] !== undefined) {
        requestsCount[req.path]++;
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route GET /welcome
app.get('/welcome', (req, res) => {
    res.send('Bienvenue sur le TP 1 du cours d\'architecture logicielle');

});

// Route GET /secret
app.get('/secret', (req, res) => {
    res.status(401).send('Vous ne possédez pas les droits pour accéder à ma page secrète');
});

// Route GET /error
app.get('/error', (req, res) => {
    res.status(500).json({ message: 'Erreur interne du serveur' });
});

// Route GET /img
app.get('/img', (req, res) => {
    res.download('./djum.jpg');
});

// Route GET /redirectMe
app.get('/redirectMe', (req, res) => {
    res.redirect('https://www.iut-littoral.fr/');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// route GET /users/:name
app.get('/users/:name', (req, res) => {
    res.send('Bienvenue sur la page de ' + req.params.name);
});

// route GET /somme 
app.get('/somme', (req, res) => {
    res.send('Le résultat de la somme est : ' + (parseInt(req.query.a) + parseInt(req.query.b)));
});


app.get('/metrics', (req, res) => {
    const uptime = process.uptime();
    res.json({
        status: "healthy",
        requestsCount: requestsCount,
        uptime: uptime
    });
});



app.use((req, res, next) => {
    res.status(404).send("Cette page n'existe pas!");
});

