// STEP 1 : création du serveur HTTP

const express = require('express');
const router = require('./router.js');


const app = express();

// VIEWS
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');

// FICHIERS STATIQUES

app.use(express.static(__dirname + '/public'));

app.locals.websiteTitle = "Worldtime";
console.log(app.locals);



app.use(router);


const port = 3000;
// on lance notre serveur en mode écoute
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});