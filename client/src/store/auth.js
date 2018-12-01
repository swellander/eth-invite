const defaultUser = {
  user: {
    id: '1',
    email: 'kanye@test.com',
    name: 'Kanye West',
    address: '0x62f4fb70BFc5293fCC5036755354BC77967f2699'
  },
  connections: [
    {
      email: 'samwellander@gmail.com',
      name: 'sam'
    },
    {
      email: 'shoe@gmail.com',
      name: 'Shoe'
    },
  ]
};

//Constants
const SET_USER = 'SET_USER';

//Action Creators
const setUser = user => ({
  type: SET_USER,
  user,
});

//TODO: _exchangeTokenForAuth and _loginUser thunks

//Auth Reducer
export default (state = defaultUser, action) => {
  if (action.type == SET_USER) return action.user;
  return state;
};