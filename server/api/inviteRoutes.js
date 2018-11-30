const { Event, Invite, User } = require('../db/models');
const router = require('express').Router();

router.get('/', (req, res, next) => {
  Invite.findAll({ include: [Event, User] })
    .then(data => res.send(data))
    .catch(next);
});

router.get('/events/:id', (req, res, next) => {
  Invite.findAll({
    include: [Event, User],
    where: {
      eventId: req.params.id
    }
  })
    .then(stuff => res.json(stuff))
    .catch(next);
})

router.get('/users/:id', (req, res, next) => {
  Invite.findAll({
    include: [Event, User],
    where: {
      userId: req.params.id
    }
  })
    .then(stuff => res.json(stuff))
    .catch(next);
})

//update an invite's status, (attending, arrived)
router.put('/:id', (req, res, next) => {
  console.log("req.body", req.body)
  Invite.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  }
  )
    .then((one, invite) => {
      console.log(one, invite)
      res.sendStatus(200)
    })
    .catch(next)
})
router.post('/', async (req, res, next) => {
  //TODO: refactor to use findOrCreate
  try {
    let attendeeUser
    attendeeUser = await User.findAll({
      where: {
        email: req.body.email
      }
    })
    if (!attendeeUser.length) {
      attendeeUser = await User.create({
        email: req.body.email,
        name: req.body.name
      })
    } else {
      attendeeUser = attendeeUser[0]
    }
    await attendeeUser.addEvents(req.body.eventId, { through: { paid: false, attending: 'No', arrived: 'No' } })
    res.sendStatus(200)
  } catch (ex) {
    next(ex)
  }
})
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id)
  Invite.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(200))
    .catch((ex) => res.status(400).send(ex))
});

module.exports = router;