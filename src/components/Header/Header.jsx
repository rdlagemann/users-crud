import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Typography,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  withStyles,
  InputBase,
  Button
} from '@material-ui/core'
import orange from '@material-ui/core/colors/orange'

import { AccountCircle, Search } from '@material-ui/icons'
import useStyles from './useStyles'
import withAuth from '../withAuth/withAuth'
import { fullName, userPropTypes } from '../../utils/user'

Header.propTypes = {
  user: PropTypes.shape(userPropTypes()).isRequired,
  logout: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  onChangeFilterTerm: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  title: PropTypes.string
}

Header.defaultProps = {
  title: '',
  isAdmin: false
}

const StyledTabs = withStyles(theme => ({
  root: {
    background: '#fff',
    color: theme.palette.secondary.contrastText
  },
  indicator: {
    background: orange[500]
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))(props => <Tabs {...props} />)

function Header({ user, title, logout, createUser, onChangeFilterTerm, isAdmin }) {
  const [anchorEl, setAnchorEl] = useState(null)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6" component="h1">
            {title}
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Buscar usuário"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={({ target }) => onChangeFilterTerm(target.value)}
            />
          </div>

          <List>
            <ListItem
              button
              aria-controls="header-menu-button"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <ListItemIcon>
                <AccountCircle fontSize="large" />
              </ListItemIcon>
              <ListItemText primary={fullName(user)} secondary={user.tipoUsuario} />
            </ListItem>
          </List>
          <Menu
            id="header-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={logout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            justifyContent: 'space-between'
          }}
        >
          <StyledTabs value={0}>
            <Tab label="Usuários" />
          </StyledTabs>
          {isAdmin && (
            <Button
              style={{ marginRight: '30px' }}
              color="primary"
              variant="contained"
              size="small"
              onClick={createUser}
              type="button"
            >
              Cadastrar
            </Button>
          )}
        </div>
      </AppBar>
    </div>
  )
}

export default withAuth(Header)
