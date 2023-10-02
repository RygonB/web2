var express = require('express');
var router = express.Router();

const FILMS = [
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

/* //affichage classic sur la page
router.get('/', (req, res, next) => {
    res.json(FILMS);
}) */

//affichage via un req.query
router.get('/', (req, res) => {
    const minDurationValue = req?.query?.['minimum-duration']
        ? Number(req.query['minimum-duration']) : undefined;

    console.log(`minDuration ${minDurationValue ?? 'not requested'}`);


    if (typeof minDurationValue !== 'number' || minDurationValue <= 0)
        return res.json('Wrong minimum duration');
    if (minDurationValue === undefined) return res.json(FILMS);

    let filterFilms = [...FILMS].filter((film) =>
        film.duration >= minDurationValue
    );
    res.json(filterFilms);

}); 

//affichage via req.params
router.get('/:id', (req, res) => {

    const filmIndex = FILMS.findIndex((film) =>
        film.id == Number(req.params.id));

    if (filmIndex < 0) {
        return res.sendStatus(404);
    }
    res.json(FILMS[filmIndex]);
});

router.post('/films', (req, res) => {
    res.json();
})

module.exports = router;
