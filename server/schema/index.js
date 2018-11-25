const { User, Event } = require('../db/models');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    address: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve(parentValue) {
        return User.findById(parentValue.id, {
          include: Event
        })
          .then(user => user.events)
      }
    }
  })
});

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    location: { type: GraphQLString },
    date: { type: GraphQLString },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    stake: { type: GraphQLString },
    guests: {
      type: new GraphQLList(UserType),
      resolve(parentValue) {
        return Event.findById(parentValue.id, {
          include: User
        })
          .then(event => event.users)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return Event.findAll()
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Event.findById(id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.findAll();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return User.findById(id);
      }
    }
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return User.create(args);
      }
    },
    //this should eventually be limited to the organzier of the event; auth route?
    addGuest: {
      type: UserType,
      args: {
        userId: { type: GraphQLID },
        eventId: { type: GraphQLID },
      },
      resolve: async (parentValue, { userId, eventId }) => {
        console.log(typeof userId);
        const event = await Event.findById(1);
        const user = await User.findById(Number(userId));
        console.log(event)

        event.addUser(user);
        user.addEvent(event);
        return user;
      }
    },
    addEvent: {
      type: EventType,
      args: {
        title: { type: GraphQLString },
        location: { type: GraphQLString },
        address: { type: GraphQLString },
        ownerAddress: { type: GraphQLString },
        stake: { type: GraphQLString },
        date: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return Event.create(args)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
