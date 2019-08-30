import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import compose from 'ramda/src/compose'
import { connect } from 'react-redux'
import { Container, Dialog, CircularProgress, DialogContent, Snackbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import withAuth from '../../components/withAuth/withAuth'
import Header from '../../components/Header/Header'
import { UserTable, UserEdit } from '../../components/User'
import {
  onChangeFilterTerm as handleChangeFilterTerm,
  requestUsers as doRequestUsers,
  saveEditUser as doSaveEditUser,
  saveCreateUser as doSaveCreateUser,
  filterUsers as doFilterUsers,
  removeUser as doRemoveUser
} from './reducer'
import { userShape, userPropTypes } from '../../utils/user'
import { remoteDataPropTypes } from '../../utils/remoteData'
import {
  selectUsersPageList,
  selectUsersPageEdit,
  selectUsersPageFilteredUsers,
  selectUsersPageRemove,
  selectUsersPage
} from './reducer/selectors'

const useStyles = makeStyles(theme => ({
  tableContainer: {
    paddingTop: theme.spacing(3)
  }
}))

UsersPage.propTypes = {
  usersFiltered: PropTypes.arrayOf(PropTypes.shape(userPropTypes())).isRequired,
  edit: PropTypes.shape(remoteDataPropTypes()).isRequired,
  list: PropTypes.shape(remoteDataPropTypes()).isRequired,
  remove: PropTypes.shape(remoteDataPropTypes()).isRequired,
  requestUsers: PropTypes.func.isRequired,
  saveCreateUser: PropTypes.func.isRequired,
  saveEditUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  onChangeFilterTerm: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  statusMessage: PropTypes.string
}

UsersPage.defaultProps = {
  isAdmin: false,
  statusMessage: ''
}

function UsersPage({
  usersFiltered,
  list,
  edit,
  remove,
  statusMessage,
  requestUsers,
  saveCreateUser,
  saveEditUser,
  removeUser,
  filterUsers,
  isAdmin,
  onChangeFilterTerm
}) {
  const users = usersFiltered || []
  const [isCreating, setIsCreating] = useState(false)
  const [isOpenEditor, setIsOpenEditor] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    requestUsers()
  }, [requestUsers])

  const openUserEditor = user => {
    setIsOpenEditor(true)
    setCurrentUser(user)
  }

  const editUser = user => {
    openUserEditor(user)
    setIsCreating(false)
  }

  const createUser = () => {
    openUserEditor(userShape())
    setIsCreating(true)
  }

  const onSuccess = () => {
    setIsOpenEditor(false)
    requestUsers()
  }

  return (
    <div style={{ width: '100%' }}>
      <Dialog open={remove.isFetching}>
        <DialogContent>
          <CircularProgress color="primary" />
        </DialogContent>
      </Dialog>

      <Header
        title="Gerenciar Usuários"
        createUser={createUser}
        filterUsers={filterUsers}
        onChangeFilterTerm={onChangeFilterTerm}
      />

      <Container className={classes.tableContainer} maxWidth="xl">
        <UserTable
          isFetching={list.isFetching}
          error={list.error}
          actionsEnabled={isAdmin}
          users={users}
          onClickEdit={editUser}
          mainAction={{
            label: 'Editar',
            icon: <EditIcon />,
            onClick: editUser
          }}
          moreOptions={[
            {
              label: 'Excluir',
              icon: <DeleteIcon />,
              onClick: removeUser
            }
          ]}
        />
        {isOpenEditor && (
          <UserEdit
            title={isCreating ? 'Cadastrar Usuário' : 'Editar Usuário'}
            user={currentUser}
            isOpen={isOpenEditor}
            close={() => setIsOpenEditor(false)}
            isFetching={edit.isFetching}
            error={edit.error}
            onSubmit={userData =>
              isCreating ? saveCreateUser(userData, onSuccess) : saveEditUser(userData, onSuccess)
            }
          />
        )}

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={!!statusMessage}
          message={<span>{statusMessage} </span>}
        />
      </Container>
    </div>
  )
}

const mapStateToProps = state => ({
  list: selectUsersPageList(state),
  edit: selectUsersPageEdit(state),
  remove: selectUsersPageRemove(state),
  usersFiltered: selectUsersPageFilteredUsers(state),
  statusMessage: selectUsersPage(state).statusMessage
})

const mapDispatchToProps = dispatch => ({
  requestUsers: compose(
    dispatch,
    doRequestUsers
  ),
  saveEditUser: compose(
    dispatch,
    doSaveEditUser
  ),
  saveCreateUser: compose(
    dispatch,
    doSaveCreateUser
  ),
  removeUser: compose(
    dispatch,
    doRemoveUser
  ),
  filterUsers: compose(
    dispatch,
    doFilterUsers
  ),
  onChangeFilterTerm: compose(
    dispatch,
    handleChangeFilterTerm
  )
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(UsersPage))
