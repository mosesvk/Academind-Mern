import React from 'react'

import Avatar from '../../shared/components/UIElements/Avatar/Avatar'
import './UserItem.css'

export const UserItem = (props) => {
  return (
    <li className='users-item'>
      <div className='user-item__content'>
        <div className='user-item__image'>
          <Avatar image={props.image} alt={props.name} width={props.width} />
        </div>
        <div className='user-item__info'>
          <h2>{props.name}</h2>
          <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
        </div>
      </div>
    </li>
  )
}
 