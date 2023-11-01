/* eslint-disable no-console */
const express = require('express');

const { readAllFilms, readFilmId, createFilm, deleteFilm, updateFilm} = require('../models/films');

const router = express.Router();

// affichage via un req.query
router.get('/', (req, res) => {
  const filmFiltered = readAllFilms(req?.query?.['minimum-duration']);
  if (filmFiltered === undefined) return res.sendStatus(400);
  return res.json(filmFiltered);
});

// affichage via req.params
router.get('/:id', (req, res) => {
  const filmFound = readFilmId(req.params.id);
  if (filmFound < 0) req.sendStatus(404);
  return res.json(filmFound);
});

// Creer un film
router.post('/', (req, res) => {
  // Pour créer un film, utiliser la méthode push où en param on retrouve un objet contenant id, titre, duree, budget, lien
  // trim() --> permet de retirer des espaces vides

  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const duration =
    typeof req?.body?.duration === 'number' && req.body.duration > 0
      ? req.body.duration
      : undefined;
  const budget =
    typeof req?.body?.budget === 'number' && req.body.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;

  if (!title || !duration || !budget || !link) res.sendStatus(404);

  const aNewFilm = createFilm(title, duration, budget, link);
  return res.json(aNewFilm);
});

// supprimer un film
router.delete('/:id', (req, res) => {
  const deleteAFilm = deleteFilm(req.params.id);
  res.json(deleteAFilm);
});

 // mettre à jour les propriétés
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const duration =
    typeof req?.body?.duration === 'number' && req.body.duration > 0
      ? req.body.duration
      : undefined;
  const budget =
    typeof req?.body?.budget === 'number' && req.body.budget > 0 ? req.body.budget : undefined;
  const link = req?.body?.link;

  if (
    !req.body &&
    !title &&
    !duration &&
    !budget &&
    !link &&
    title.length === 0 &&
    link.length === 0
  ) {
    res.sendStatus(400);
  }
  const updateAFilm = updateFilm(req?.body?.id,req?.body);
  if(!updateAFilm){
    return res.sendStatus(404);
  }
  return res.json(updateAFilm);
}); 

/* router.put('/:id', (req, res) => {
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

  const id = Number(req.params.id);
  const films = parse(jsonDbPath, defaultFilms);
  const indexOfFilmFound = films.findIndex((film) => film.id === id);

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
  serialize(jsonDbPath, films);
  return res.json(updatedFilm);
});  */
module.exports = router;
