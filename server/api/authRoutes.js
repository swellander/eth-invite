const router = require('express').Router();
const axios = require('axios');

const { User } = require('../db/models');

router.get('/google', (req, res, next) => {
  /*
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/contacts.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/&response_type=token&client_id=616542210104-rg5ejkkhdagodg3e86rlas2vclfuu16j.apps.googleusercontent.com';
  */
 const url =
 'https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20email%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/plus.me%20https://www.googleapis.com/auth/contacts.readonly&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/&response_type=token&client_id=616542210104-rg5ejkkhdagodg3e86rlas2vclfuu16j.apps.googleusercontent.com';
    res.redirect(url);
});

router.post('/google', async (req, res, next) => {
    const access_token = req.body.access_token
    const response = await axios.get(`https://people.googleapis.com/v1/people/me/connections?personFields=emailAddresses,names&access_token=${access_token}`)
    const connectionArr = response.data.connections
    let filteredConnectionArr = []
    if (connectionArr){
        connectionArr.forEach(element => {
            let connectionObj = {}
            if (element.emailAddresses){
                connectionObj.email = element.emailAddresses[0].value
            } else {
                connectionObj.email = ''
            }
            if (element.names){
              connectionObj.name = element.names[0].displayName
            } else {
              connectionObj.name = ''
            }
            filteredConnectionArr.push(connectionObj)
        });
    }

  const userData = await axios.get(
    `https://www.googleapis.com/plus/v1/people/me?key=AIzaSyBUrcWqLQf6TwGT259x9g2XoGQf16fWxng&access_token=${access_token}`
  );
  let user;
  user = await User.findAll({
    where: {
      email: userData.data.emails[0].value,
    },
  });
  if (user.length) {
    user = user[0];
  } else {
    user = await User.create({
      email: userData.data.emails[0].value,
      name: userData.data.name.givenName + ' ' + userData.data.name.familyName,
    });
  }

  let retObj = {
    user: user,
    connections: filteredConnectionArr,
  };
  res.send(retObj);
});

module.exports = router;
