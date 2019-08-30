import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TableBody,
  IconButton
} from '@material-ui/core'
import MoreOptions from './MoreOptions'

const useStyles = makeStyles(() => ({
  firtsTableCell: {
    width: '50%'
  },
  modal: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center'
  }
}))

const actionPropTypes = () => ({
  label: PropTypes.string,
  icon: PropTypes.element,
  onClick: PropTypes.func
})

CollectionTable.propTypes = {
  users: PropTypes.array.isRequired,
  actionsEnabled: PropTypes.bool.isRequired,
  mainAction: PropTypes.shape(actionPropTypes()),
  moreOptions: PropTypes.arrayOf(PropTypes.shape(actionPropTypes()))
}

CollectionTable.defaultProps = {
  mainAction: null,
  moreOptions: []
}

export default function CollectionTable({ users = [], actionsEnabled, mainAction, moreOptions }) {
  const classes = useStyles()
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.firtsTableCell}>Usuário</TableCell>
            <TableCell>Tipo de usuário</TableCell>
            <TableCell>Usuário ativo</TableCell>
            {actionsEnabled && <TableCell>Ações</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell
                className={classes.firtsTableCell}
              >{`${user.nome} ${user.sobrenome}`}</TableCell>
              <TableCell>{user.tipoUsuario}</TableCell>
              <TableCell>{user.ativo ? 'Sim' : 'Não'}</TableCell>
              {actionsEnabled && (
                <TableCell
                  style={{
                    display: 'flex'
                  }}
                >
                  {!!mainAction && (
                    <IconButton onClick={() => mainAction.onClick(user)} title={mainAction.label}>
                      {mainAction.icon}
                    </IconButton>
                  )}
                  <MoreOptions target={user} options={moreOptions} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
