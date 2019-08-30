import { createSelector } from 'reselect'
import { repos } from './constants'

export const selectUsersPage = state => state.usersPage

export const selectUsersPageList = createSelector(
  selectUsersPage,
  usersPage => usersPage[repos.LIST]
)

export const selectUsersPageEdit = createSelector(
  selectUsersPage,
  usersPage => usersPage[repos.EDIT]
)

export const selectUsersPageRemove = createSelector(
  selectUsersPage,
  usersPage => usersPage[repos.REMOVE]
)

export const selectUsersListData = createSelector(
  selectUsersPageList,
  usersList => usersList.data
)

export const selectUsersPageFilteredUsers = createSelector(
  selectUsersPage,
  usersPage => usersPage.usersFiltered
)
