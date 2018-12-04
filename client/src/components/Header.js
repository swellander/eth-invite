import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListItemIcon, Divider, List, ListItem, ListItemText, Drawer, MenuItem, Menu, Avatar, Button, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListAlt from '@material-ui/icons/ListAlt';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

// eslint-disable-next-line react/prefer-stateless-function
const styles = {
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: 'rgb(247,248,249)',
    color: 'rgb(44,123,242)',
    marginBottom: 30,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends Component {
  state = {
    anchorEl: null,
    menu: false
  }
  toggleDrawer = (open) => () => {
    this.setState({
      menu: open,
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleMenu = (e) => {
    this.setState({ anchorEl: e.currentTarget })
  }
  render() {
    const leftMenu = (
      <List>
        <ListItem button component={Link} to="/create_event">
          <ListItemIcon><ListAlt /></ListItemIcon>
          <ListItemText primary='Create Event' />
        </ListItem>
        <Divider />
        <ListItem buttonon onClick={this.props.logOut}>
          <ListItemIcon><AccountCircle /></ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    )
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      // <div className="p-3 mb-2 bg-light text-dark">
      //   <div className="container" style={{ fontFamily: 'Andale Mono' }}>
      //     <div className="row">
      //       <div className="col-2">
      //         <Link to="/dashboard"><strong>Dashboard</strong></Link>
      //       </div>
      //       <div className="col-3">
      //         <Link to="/create_event"><strong>Create Event</strong></Link>
      //       </div>
      //       <div className="col-5">
      //         <h6><p align="right"><strong>Logged in as:</strong> {this.props.auth.user.email}</p></h6>
      //       </div>
      //       <div className="col-2">
      //         <h6><p align="right"><button type="button" className="btn btn-warning" onClick={this.props.logOut}><strong>Log Out</strong></button></p></h6>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      <div className={classes.root}>
        <AppBar className={classes.bar} position="static">
          <Toolbar>

            {!isWidthUp('lg', this.props.width) ? (
              <Fragment>
                <IconButton onClick={this.toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography style={{ letterSpacing: 4, fontSize: 18 }} component={Link} to="/dashboard" className={classes.grow}>
                  FLAKE
                </Typography>
                <div>
                  <IconButton
                    onClick={this.handleMenu}
                    aria-owns={open ? 'profile-menu' : null}
                    aria-haspopup="true"
                  >
                    <Avatar
                      src={this.props.auth.user.imageUrl}
                    />
                  </IconButton>
                  <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
                  </Menu>
                </div>
                <Drawer open={this.state.menu} onClose={this.toggleDrawer(false)}>
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                  >
                    {leftMenu}
                  </div>
                </Drawer>
              </Fragment>
            ) : (
                <Fragment>
                  <Typography style={{ letterSpacing: 4, fontSize: 18, marginRight: 30 }} className={classes.grow} component={Link} to="/dashboard" >
                    FLAKE
                </Typography>
                  <div>
                    <Link to="/create_event" style={{ marginRight: 15 }}>
                      Create Event
                  </Link>
                    <IconButton
                      onClick={this.handleMenu}
                      aria-owns={open ? 'profile-menu' : null}
                      aria-haspopup="true"
                    >
                      <Avatar
                        src={this.props.auth.user.imageUrl}
                      />
                    </IconButton>
                    <Menu
                      id="profile-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.props.logOut}>Logout</MenuItem>
                    </Menu>
                  </div>
                </Fragment>
              )

            }

          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch({ type: 'SET_USER', user: {} })
      location.href = '/'
    }
  }
}

export default withWidth()(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Header)));







