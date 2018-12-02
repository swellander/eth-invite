const { Event, User } = require('../db/models');
const router = require('express').Router();

//==========CREATE A NEW EVENT=================
router.post('/', async (req, res, next) => {
  const event = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    date: req.body.date,
    stake: req.body.stake,
    organizerId: req.body.organizerId
  }
  const newEvent = await Event.create(event)
  res.json(newEvent);
});

router.get('/', (req, res, next) => {
  Event.findAll({})
    .then(data => res.send(data))
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
router.get('/specific/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(data => res.send(data))
    .catch(next)
});
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


//===========ADD ETH ADDRESS TO EVENT==========
router.put('/:id', (req, res, next) => {
  Event.findByPk(req.params.id)
    .then(event => {
      return event.update({
        address: req.body.address
      })
    })
    .then(() => res.sendStatus(201))
    .catch(next);
});



module.exports = router;