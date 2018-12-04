import axios from 'axios';

const defaultUser = {
  user: {
    id: '1',
    email: 'kanye@test.com',
    name: 'Kanye West',
    address: '0x62f4fb70BFc5293fCC5036755354BC77967f2699',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg/250px-Kanye_West_at_the_2009_Tribeca_Film_Festival.jpg',
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
const REFRESH_USER = 'REFRESH_USER';

//Action Creators
const setUser = user => ({
  type: SET_USER,
  user,
});
const refreshUser = user => ({
  type: REFRESH_USER,
  user
})

export const _refreshUser = userId => dispatch => {
  console.log('refresh user thunk is running')
  return axios.get(`/api/users/${userId}`)
    .then(response => response.data)
    .then(user => dispatch(refreshUser(user)))
}

//TODO: _exchangeTokenForAuth and _loginUser thunks

//Auth Reducer
export default (state = defaultUser, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    case REFRESH_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};