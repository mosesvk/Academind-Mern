import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {

  const USERS = [
    {
      id: 'u1', 
      name: 'Mark Schwarts',
      image: 'https://www.pngitem.com/pimgs/m/516-5167304_transparent-background-white-user-icon-png-png-download.png',
      places: 3
    }
  ]

  return (
    <UsersList items={USERS} />
  )
}

export default Users
