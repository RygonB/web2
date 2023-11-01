const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/film.json');

/* const defaultFilms = [
    {
      id: 1,
      title: 'Avatar 2',
      duration: 312,
      budget: 684100000,
      link: 'https://www.rottentomatoes.com/m/avatar_the_way_of_water',
    },
  
    {
      id: 2,
      title: 'mission impossible dead reckoning',
      duration: 250,
      budget: 291000000,
      link: 'https://www.rottentomatoes.com/m/mission_impossible_dead_reckoning_part_one',
    },
  
    {
      id: 3,
      title: 'Oppenheimer',
      duration: 300,
      budget: 321000000,
      link: 'https://www.rottentomatoes.com/m/oppenheimer_2023',
    },
  
    {
      id: 4,
      title: 'the batman',
      duration: 256,
      budget: 369300000,
      link: 'https://www.rottentomatoes.com/m/the_batman',
    },
  ]; */

function readAllFilms(minDurationValue) {
  const films = parse(jsonDbPath);

  if (minDurationValue === undefined) {
    return films;
  }
  const minimumDurationAsNumber = Number(minDurationValue);
  if (Number.isNaN(minimumDurationAsNumber) || minimumDurationAsNumber <= 0) return undefined;

  const filterMinimumDurationFilms = [...films].filter((film) => film.duration >= minDurationValue);
  return filterMinimumDurationFilms;
}

function readFilmId(id) {
  const films = parse(jsonDbPath);
  const filmIndex = films.findIndex((film) => film.id === Number(id));
  // eslint-disable-next-line no-console
  console.log(id);
  if (filmIndex < 0) return undefined;
  return films[filmIndex];
}

function createFilm(title, duration, budget, link) {
  const films = parse(jsonDbPath);
  const newFilm = {
    id: getNextId(),
    title,
    duration,
    budget,
    link,
  };
  const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase());
  if (existingFilm) {
    return null;
  }
  films.push(newFilm);
  serialize(jsonDbPath, films);
  return newFilm;
}

function getNextId() {
  const films = parse(jsonDbPath);
  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = films[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteFilm(id) {
  const films = parse(jsonDbPath);
  const indexdefaultFilms = films.findIndex((film) => film.id === Number(id));

  if (indexdefaultFilms < 0) {
    return undefined;
  }
  const deletedefaultFilms = films.splice(indexdefaultFilms, 1);
  serialize(jsonDbPath, films);
  return deletedefaultFilms;
}

function updateFilm(id,propertiesToUpdate) {
  const films = parse(jsonDbPath);
  
  const indexdefaultFilms = films.findIndex((film) => film.id === Number(id));
  const updatedFilm = { ...films[indexdefaultFilms], ...propertiesToUpdate };
  
  films[indexdefaultFilms] = updatedFilm;
  serialize(jsonDbPath,films);
  return updatedFilm;
}

module.exports = {
  readAllFilms,
  readFilmId,
  createFilm,
  deleteFilm,
  updateFilm
};
