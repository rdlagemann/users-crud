import { createMuiTheme } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import indigo from '@material-ui/core/colors/indigo'

const theme = createMuiTheme({
  palette: {
    primary: { main: indigo[500] },
    secondary: { main: grey[200] }
  },
  shape: {
    borderRadius: '1px'
  }
})

export default theme
