const { Event } = require('../db/models');
const router = require('express').Router();

router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(next);
})
router.get('/', (req, res, next) => {
  console.log("/api/events was hit!")
  Event.findAll({})
    .then(data => res.send(data))
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

module.exports = router;