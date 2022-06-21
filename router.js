const express = require('express');
const listeDeCapitales = require('./my_modules/capitalCities.js');
const dayjs = require('dayjs');
// dans la doc : i18n
require('dayjs/locale/fr'); // on charge la locale française
dayjs.locale('fr'); 
// pour les timezones :
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);

// sur express on a besoin de la méthode : Router, qui nous renvoie un objet qui contient des méthodes qui nous permettent d'écrire nos routes
const router = express.Router();


router.get('/', (request, response) => {



    // II) VERSION AVEC RENDER (fichier ejs) :
    response.render('index', { list: listeDeCapitales});
});


router.get('/city/:ville', (request, response) => {
    // fonction apelle à chaque fois que quelqu'un fais une rquête sur une route du type "/city/quelquechose"

    const villeDemandee = request.params.ville;
    // response.send(`Ville: ${villeDemandee}`);


    console.log(`Je veux retrouver ${villeDemandee}`);
    console.log(`dans le tableau`, listeDeCapitales);

    // j'initialise une variable qui contiendra le résultat : la capitale recherchée dans le tableau
    let villeTrouvee;

    // on boucle sur les élémets d'un tableau : for...of
    for (const testCapitale of listeDeCapitales) {
        console.log('Je ragarde si :', testCapitale);
        console.log('correspond à ce que je cherche : ' + villeDemandee);

        if (testCapitale.name.toLowerCase() === villeDemandee.toLowerCase()) {
            // on mets tout en minuscule pour pouvoir comparer les deux string
            console.log(">>> TROUVE !!!")
            villeTrouvee = testCapitale;
        }
    }


    if (villeTrouvee !== undefined) {
        console.log("Les infos de la ville demandée dans l'url sont:", villeTrouvee);

        let jour = dayjs().tz(villeTrouvee.tz).format('dddd DD/MM/YYYY');
        let heure = dayjs().tz(villeTrouvee.tz).format('H:mm:ss');

        response.render('city', { 
            ville: villeTrouvee,
            toto: 12,
            jour: jour,
            heure: heure
        });




    } else {

        response.status(404).send(`
            <p>Ville non trouvée.</p>
            <p><a href="/">Retour à la liste des capitales</a></p>
        `);
    }    
});

module.exports = router;