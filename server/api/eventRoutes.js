const { Event, User } = require('../db/models');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
})
router.get('/', (req, res, next) => {
  Event.findAll({})
    .then(data => res.send(data))
});
router.put('/', (req, res, next) => {
  Event.update({
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    stake: req.body.stake
  }, {
      where: {
        id: req.body.id
      }
    })
    .then(() => res.sendStatus(200))
    .catch((ex) => res.status(400).send(ex))
});
router.get('/test', (req, res, next) => {
  Event.findAll({
    include: {
      model: User,
      as: 'organizer'
    }
  })
    .then(events => res.json(events))
    .catch(next)
})
router.get('/:organizerId', (req, res, next) => {
  //get all the events that the user has been invited to
  const { organizerId } = req.params;
  Event.findAll({
    where: {
      organizerId
    }
  })
    .then(events => res.json(events))
    .catch(next);
})

module.exports = router;