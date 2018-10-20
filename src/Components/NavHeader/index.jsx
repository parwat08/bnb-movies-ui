import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    };
  }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    var styles = {
      appBar: {
        flexWrap: "wrap"
      },
      tabs: {
        // width: "100%",
        color: "white"
      }
    };

    const {
      isAuthenticated,
      user: { name, email }
    } = this.props;

    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          style={styles.appBar}
          position="static"
        >
          <Tabs style={styles.tabs} textColor="red" centered>
            <Tab
              label="Home"
              to="/movies"
              component={Link}
              style={styles.tabs}
            />
            <Tab
              label="Cinemas"
              to="/cinemas"
              component={Link}
              style={styles.tabs}
            />
            <Tab
              label="Movies"
              to="/movies"
              component={Link}
              style={styles.tabs}
            />
            {!isAuthenticated && (
              <Tab
                label="Register"
                to="/register"
                component={Link}
                style={styles.tabs}
              />
            )}

            {!isAuthenticated && (
              <Tab
                label="Login"
                to="/login"
                component={Link}
                style={styles.tabs}
              />
            )}

            {isAuthenticated && (
              <div>
                <IconButton
                  // aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  Welcome, {name} &nbsp;
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                  <Link to="/profile">
                    <MenuItem>My profile</MenuItem>
                  </Link>
                  <Link to="/my-tickets">
                    <MenuItem>My tickets</MenuItem>
                  </Link>
                  <Link to="/change-password">
                    {" "}
                    <MenuItem>Change passsword</MenuItem>
                  </Link>
                  <Link to="/logout">
                    {" "}
                    <MenuItem>Logout</MenuItem>
                  </Link>
                </Menu>
              </div>
            )}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  {}
)(NavHeader);
