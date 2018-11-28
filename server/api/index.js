const express = require('express')
const router = express.Router()
const { User, Event, UserEvent } = require('../db/models');

//GENERAL TODO: Set up error handling route so that we can just pass all errors to next

//====================USER ROUTES===============================================================

router.get('/users', (req, res, next) => {
    User.findAll({})
        .then(data => res.send(data))
})

//====================EVENT ROUTES===============================================================
router.post('/events', (req, res, next) => {
    Event.create(req.body)
        .then(event => res.json(event))
        .catch(next);
})
router.get('/events', (req, res, next) => {
    Event.findAll({})
        .then(data => res.send(data))
})
router.put('/events', (req, res, next) => {
    Event.update({
        name: req.body.name,
        description: req.body.description,
        place: req.body.place,
        time: req.body.time,
        stake: req.body.stake
    }, {
            where: {
                id: req.body.id
            }
        })
        .then(() => res.sendStatus(200))
        .catch((ex) => res.status(400).send(ex))
})


//====================USEREVENT ROUTES===============================================================

router.get('/userevents', (req, res, next) => {
    UserEvent.findAll({ include: User })
        .then(data => res.send(data))
        .catch(next);
})

router.put('/userevents', (req, res, next) => {
    userevents.update({
        attending: 'Yes',
        arrived: 'Yes'
    }, {
            where: {
                id: req.body.code
            }
        }
    )
        .then(() => res.sendStatus(200))
        .catch((ex) => res.status(400).send(ex))
})

router.post('/userevents', async (req, res, next) => {
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

router.delete('/userevents/:id', (req, res, next) => {
    console.log(req.params.id)
    UserEvent.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.sendStatus(200))
        .catch((ex) => res.status(400).send(ex))
})

module.exports = router