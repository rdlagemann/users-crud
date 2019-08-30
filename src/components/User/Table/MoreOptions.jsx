import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

MoreOptions.propTypes = {
  options: PropTypes.array,
  target: PropTypes.any
}

MoreOptions.defaultProps = {
  options: [],
  target: undefined
}

export default function MoreOptions({ target, options }) {
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <div>
      <IconButton onClick={({ currentTarget }) => setAnchorEl(currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="header-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <div>
          {options.map((option, i) => (
            // eslint-disable-next-line
            <MenuItem onClick={() => option.onClick(target)} type="button" key={i}>
              {option.icon} {option.label}
            </MenuItem>
          ))}
        </div>
      </Menu>
    </div>
  )
}
