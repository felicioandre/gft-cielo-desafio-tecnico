var express = require('express');
var app = express();

app.use(express.static('./dist/gft-cielo-desafio-tecnico'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/gft-cielo-desafio-tecnico/' }
    );
});

app.listen(process.env.PORT || 8080); 