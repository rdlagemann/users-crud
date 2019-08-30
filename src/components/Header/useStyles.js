import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  },
  accountIcon: {
    marginBottom: theme.spacing(0),
    color: theme.palette.primary.dark
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    left: '-10px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    borderBottom: '1px solid',
    fontSize: '12px',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
}))
