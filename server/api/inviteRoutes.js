const { Event, Invite, User } = require('../db/models');
const router = require('express').Router();
const nodemailer = require('nodemailer')

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
  Invite.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true,
    plain: true
  }
  )
    .then((one, invite) => {
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
    await attendeeUser.addEvents(req.body.eventId, { through: { paid: false, attending: 'NO', arrived: 'NO' } })
    
    //node mailer stuff starts here
    let event = await Event.findAll({
      where: {
        id: req.body.eventId
      }
    })

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
        auth: {
          user: 'flakeInvite', 
          pass: 'abcd123456789!' 
        }
    })

    const mailOptions = {
      from: 'Flake Invites', 
      to: attendeeUser.email, 
      subject: `You are invited to ${event[0].title}!`, 
      //text: `Title: ${event[0].title} Description: ${event[0].description} Location: ${event[0].location} Date: ${event[0].date} Stake: ${event[0].stake}`,
      html: `<html><p>Hello ${attendeeUser.name}!</p>
      <p>You have been invited to <strong>${event[0].title}</strong> via Flake!</p>
      
      <p><strong>Title:</strong> ${event[0].title}</p> 
      <p><strong>Description:</strong> ${event[0].description}</p> 
      <p><strong>Location:</strong> ${event[0].location}</p> 
      <p><strong>Date:</strong> ${event[0].date}</p> 
      <p><strong>Stake:</strong> ${event[0].stake}</p>
      
      <p>To respond to this invite, please click <a href="http://localhost:3000">here</a> to log in to the Flake app.
      </html>`  
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log('Message sent! - You are invited!');
        }
    })
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