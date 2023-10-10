const path = require('node:path');

const {parse} = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/film.json');

function readAllFilms(minDurationValue){
    const films = parse(jsonDbPath);
    
    if(minDurationValue === undefined){
        return films;
    }
    const filterMinimumDurationFilms = [...films].filter((film) => film.duration >= minDurationValue);
    return filterMinimumDurationFilms;
}
module.exports = {
    readAllFilms
};