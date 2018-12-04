import React, { Component } from 'react';
import { rsvpEth } from '../eth';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import GuestList from './GuestList';
import InviteGuests from './InviteGuests';
import { _rsvp } from '../store/invites';
import { _loadGuests } from '../store/guests';
import Header from './Header';
import ImageGallery from './ImageGallery';
import { withStyles, Grid, Tab, Tabs } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

const styles = {
  container: {
    marginBottom: 20
  }
}

class EventDetail extends Component {
  state = {
    value: 0
  }
  componentDidMount() {
    const { loadGuests, eventId } = this.props;
    loadGuests(eventId);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  rsvp = async decision => {
    //call rsvp method from currently logged in account

    const { rsvp, selectedInvite, selectedEvent } = this.props;
    const { id, address, stake } = selectedEvent;
    const eventId = id;

    //if rsvp yes, make transaction to stake eth
    if (decision === 'YES') rsvpEth(address, stake);

    //else, just update db
    rsvp(selectedInvite, decision);

    //redirect to rsvp camera
    this.props.history.push(`/rsvp/${eventId}`);
  }
  getYesGuests = guests => guests.filter(guest => guest.attending === 'YES' && !guest.arrived).map(guest => guest.user);
  getNoGuests = guests => guests.filter(guest => guest.attending === 'NO').map(guest => guest.user);
  getArrivedGuests = guests => guests.filter(guest => guest.arrived).map(guest => guest.user);
  getAllGuests = guests => guests.map(guest => guest.user);
  render() {
    const confirmBtn = (
      <button style={width !== 'sm' && width !== 'xs' ? { float: 'right' } : {}} className="btn btn-success" onClick={() => this.props.history.push(`/confirm/${selectedEvent.id}`)}>CONFIRM ATTENDANCE</button>
    );
    const rsvpBtns = (
      <div>
        {/* TODO: only allow this to be clicked once */}
        <button className="btn btn-primary" onClick={() => this.rsvp('YES')}>ACCEPT</button> <button className="btn btn-danger" onClick={() => this.rsvp('NO')}>DECLINE</button>
      </div>
    )
    const { width, classes, auth, selectedInvite, selectedEvent, eventId, guests } = this.props;
    const { value } = this.state;
    if (!selectedEvent) return <h3>Spinner...</h3>
    else {
      console.log('width', width)
      const { title, location, date, description, address, stake } = selectedEvent;
      console.log('selectedInvite', selectedInvite);
      const hasRSVPd = selectedInvite ? selectedInvite.attending === 'YES' : false;
      const yesGuests = this.getYesGuests(guests);
      const noGuests = this.getNoGuests(guests);
      const arrivedGuests = this.getArrivedGuests(guests);
      const allGuests = this.getAllGuests(guests);
      //auth user id is a string
      const isOrganizer = +auth.user.id === selectedEvent.organizerId;
      return (
        <div>
          <Header />
          <Grid container justify="center">
            <Grid item xs={10} lg={6}>
              <div style={{ fontFamily: 'Andale Mono' }}>
                {/* update status to deployed if event has an address */}
                <h3 style={width !== 'sm' && width !== 'xs' ? { display: 'inline' } : {}}><strong>{title}</strong></h3>
                <div style={width !== 'sm' && width !== 'xs' ? { float: 'right' } : {}}>
                  {
                    isOrganizer ? '' : (
                      hasRSVPd ? confirmBtn : rsvpBtns
                    )
                  }
                </div>

                <hr />
                <h6><strong>Location: </strong>{location}</h6>
                <h6><strong>Date: </strong>{date}</h6>
                <h6><strong>Stake: </strong>{stake} ETH</h6>
                <h6><strong>Status: </strong>{address ? <span>Deployed</span> : <span>Deploying <div style={{ margin: 0 }} className="spinner">
                  <div className="rect1 bar"></div>
                  <div className="rect2 bar"></div>
                  <div className="rect3 bar"></div>
                  <div className="rect4 bar"></div>
                  <div className="rect5 bar"></div>
                </div></span>}</h6>
                <h6><strong>Description: </strong></h6>
                <div className="p-3 mb-2 bg-light text-dark"><h6>{description}</h6></div>

                {isOrganizer && (
                  <div>
                    <p />
                    <h5><strong>Invite Guests</strong></h5>
                    <InviteGuests />
                  </div>
                )}
                <Tabs
                  style={{ marginTop: 20 }}
                  className={classes.container}
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                >
                  <Tab style={{ fontFamily: 'Andale Mono' }} label="All" />
                  <Tab style={{ fontFamily: 'Andale Mono' }} label="Yes" />
                  <Tab style={{ fontFamily: 'Andale Mono' }} label="No" />
                  <Tab style={{ fontFamily: 'Andale Mono' }} label="Arrived" />
                </Tabs>
                {value === 0 && <GuestList guests={allGuests} />}
                {value === 1 && <GuestList guests={yesGuests} />}
                {value === 2 && <GuestList guests={noGuests} />}
                {value === 3 && <ImageGallery eventId={selectedEvent.id} />}
              </div>
            </Grid>
          </Grid>
        </div >
      )
    }
  }
}

const mapStateToProps = ({ events, invites, auth, guests }, { match }) => {
  const eventId = +match.params.id; //coerce string id to an int to match with data returned from sequelize
  const selectedInvite = invites.find(invite => invite.event.id === eventId);
  const allEvents = events.concat(invites.map(invite => invite.event));
  const selectedEvent = allEvents.find(event => event.id === eventId);
  return {
    guests,
    auth,
    selectedInvite,
    selectedEvent,
    eventId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rsvp: (invite, decision) => dispatch(_rsvp(invite, decision)),
    loadGuests: eventId => dispatch(_loadGuests(eventId))
  }
}

export default withWidth()(withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(EventDetail))));