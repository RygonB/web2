var express = require('express');
var router = express.Router();

const films = [
    {
        id: 1,
        title: "Avatar 2",
        duration: 312,
        budget: 684100000,
        link: 'https://www.rottentomatoes.com/m/avatar_the_way_of_water',
    },

    {
        id: 2,
        title: "mission impossible dead reckoning",
        duration: 250,
        budget: 291000000,
        link: 'https://www.rottentomatoes.com/m/mission_impossible_dead_reckoning_part_one',
    },

    {
        id: 3,
        title: "Oppenheimer",
        duration: 300,
        budget: 321000000,
        link: 'https://www.rottentomatoes.com/m/oppenheimer_2023'
    },

    {
        id: 4,
        title: "the batman",
        duration: 256,
        budget: 369300000,
        link: 'https://www.rottentomatoes.com/m/the_batman'
    }
];

//affichage via un req.query
router.get('/', (req, res) => {
    const minDurationValue = req?.query?.['minimum-duration']
        ? Number(req.query['minimum-duration']) : undefined;

    console.log(`minDuration ${minDurationValue ?? 'not requested'}`);


    if (typeof minDurationValue !== 'number' || minDurationValue <= 0)
        return res.sendStatus(400);
    if (minDurationValue === undefined) return res.json(films);

    let filterfilms = [...films].filter((film) =>
        film.duration >= minDurationValue
    );
    res.json(filterfilms ?? films);

});

//affichage via req.params
router.get('/:id', (req, res) => {

    const filmIndex = films.findIndex((film) =>
        film.id == Number(req.params.id));

    if (filmIndex < 0) {
        return res.sendStatus(404);
    }
    res.json(films[filmIndex]);
});

// Creer un film
router.post('/', (req, res) => {
    /**
     * Pour créer un film, utiliser la méthode push où en param on retrouve un objet contenant
     * id, titre, duree, budget, lien
     */

    //trim() --> permet de retirer des espaces vides

    const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const duration = typeof req?.body?.duration == 'number' && req.body.duration > 0 ? req.body.duration : undefined;
    const budget = typeof req?.body?.budget == 'number' && req.body.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

    if (!title || !duration || !budget || !link) res.sendStatus(404);

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex].id : 0;
    const nextId = lastId + 1;


    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };
    const existingFilm = films.find((film) =>
        film.title.toLowerCase() == title.toLowerCase());
    if (existingFilm) {
        return res.sendStatus(409);
    }
    films.push(newFilm);
    res.json(newFilm);
});

//supprimer un film
router.delete('/:id', (req, res) => {

    const indexFilms = films.findIndex((film) =>
        film.id === Number(req.params.id));

    if (indexFilms < 0) {
        res.status(404);
    }
    const deleteFilms = films.splice(indexFilms, 1);
    console.log(films);
    res.json(deleteFilms);
});

//mettre à jour les propriétés 
router.patch('/:id', (req, res) => {
    const title = req?.body?.title;
    const duration = typeof req?.body?.duration === 'number' && req.body.duration > 0 ? req.body.duration : undefined;
    const budget = typeof req?.body?.budget === 'number' && req.body.budget > 0 ? req.body.budget : undefined;
    const link = req?.body?.link;

    if (!req.body && !title && !duration && !budget && !link && title.length === 0 && link.length === 0) {
        res.sendStatus(400 + " C'est pas bon ");
    }
    const indexFilms = films.findIndex((film) =>
        film.id === Number(req.params.id));


    const updatedFilm = { ...films[indexFilms], ...req.body };
    films[indexFilms] = updatedFilm;
    console.log(films);
    res.json(updatedFilm);

});

router.put('/:id', (req, res) => {
    const title = req?.body?.title;
    const link = req?.body?.link;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;

    if (
        !req.body ||
        !title ||
        !title.trim() ||
        !link ||
        !link.trim() ||
        duration === undefined ||
        typeof req?.body?.duration !== 'number' ||
        duration < 0 ||
        budget === undefined ||
        typeof req?.body?.budget !== 'number' ||
        budget < 0
    )
        return res.sendStatus(400);

    const id = req.params.id;
    const indexOfFilmFound = films.findIndex((film) => film.id == id);

    if (indexOfFilmFound < 0) {
        const newFilm = { id, title, link, duration, budget };
        films.push(newFilm);
        return res.json(newFilm);
    }
    const filmPriorToChange = films[indexOfFilmFound];
    const objectContainingPropertiesToBeUpdated = req.body;

    const updatedFilm = {
        ...filmPriorToChange,
        ...objectContainingPropertiesToBeUpdated,
    };

    films[indexOfFilmFound] = updatedFilm;
    console.log("index film found : "+indexOfFilmFound);
    return res.json(updatedFilm);
})
module.exports = router;
