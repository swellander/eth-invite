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
});

//===========UPDATE CONFIRMATION STATUS============
router.put('/events', async (req, res, next) => {
  console.log("api/invites/events was hit")
  const { faceId, eventId } = req.body;
  console.log('faceId', faceId)
  console.log('eventId', eventId)

  // get user by faceId
  const user = await User.findOne({
    where: {
      faceId
    }
  });

  //if faceId does not belong to any user
  if (!user) res.sendStatus(403);
  else {
    //update invite
    Invite.update({ arrived: true }, {
      where: {
        userId: user.id,
        eventId
      }
    })
      .then(([numRowsAffected]) => {
        if (numRowsAffected !== 1) {
          console.log('numRowsAffected', numRowsAffected);
          console.log('User Not invited to event')
          res.sendStatus(403);
        }
      })
    //else, users invite successfully updated to show that theyve arrived
    res.sendStatus(200);
  }


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




//=============INVITE GUESTS=========================================
router.post('/', async (req, res, next) => {
  //TODO: refactor to use findOrCreate
  const { guests, eventId } = req.body;

  //Checkout Model.findOrCreate here https://sequelize-guides.netlify.com/inserting-updating-destroying/
  const userArrs = await Promise.all(guests.map(guest => User.findOrCreate({ where: { email: guest.value, name: guest.label } })));
  const users = userArrs.map(userArr => userArr[0])

  const event = await Event.findByPk(eventId)

  await Promise.all(users.map(user => {
    return user.addEvent(event);
  }));


  // try {
  //   let attendeeUser
  //   attendeeUser = await User.findAll({
  //     where: {
  //       email: req.body.email
  //     }
  //   })
  //   if (!attendeeUser.length) {
  //     attendeeUser = await User.create({
  //       email: req.body.email,
  //       name: req.body.name
  //     })
  //   } else {
  //     attendeeUser = attendeeUser[0]
  //   }
  //   await attendeeUser.addEvents(req.body.eventId, { through: { paid: false, attending: 'NO', arrived: 'NO' } })

  //   //node mailer stuff starts here
  //   let event = await Event.findAll({
  //     where: {
  //       id: req.body.eventId
  //     }
  //   })
  let transporter;
  let mailOptions;
  users.forEach(user => {
    transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'flakeInvite',
        pass: 'abcd123456789!'
      }
    })

    mailOptions = {
      from: 'Flake Invites',
      to: user.email,
      subject: `You are invited to ${event.title}!`,
      //text: `Title: ${event.title} Description: ${event.description} Location: ${event.location} Date: ${event.date} Stake: ${event.stake}`,
      html: `<html><p>Hello ${user.name}!</p>
      <p>You have been invited to <strong>${event.title}</strong> via Flake!</p>

      <p><strong>Title:</strong> ${event.title}</p> 
      <p><strong>Description:</strong> ${event.description}</p> 
      <p><strong>Location:</strong> ${event.location}</p> 
      <p><strong>Date:</strong> ${event.date}</p> 
      <p><strong>Stake:</strong> ${event.stake}</p>

      <p>To respond to this invite, please click <a href="http://localhost:3000">here</a> to log in to the Flake app.
      </html>`
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Message sent to ', user.email);
      }
    })
  })

  res.sendStatus(200)
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