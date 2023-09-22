var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id: 1,
        title: "Avatar",
        duration: 120,
        budget: 250000000,
        link: 'https://www.rottentomatoes.com/m/avatar_the_way_of_water',
    },

    {
        id: 1,
        title: "Avatar",
        duration: 120,
        budget: 250000000,
        link: 'https://www.rottentomatoes.com/m/avatar_the_way_of_water',
    },

    {
        id: 1,
        title: "Avatar",
        duration: 120,
        budget: 250000000,
        link: 'https://www.rottentomatoes.com/m/avatar_the_way_of_water'
    }
];

router.get('/', (req, res, next) => {
    res.json(FILMS);
});

module.exports = router;
