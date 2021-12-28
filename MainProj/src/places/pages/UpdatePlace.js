import React from 'react'
import {useParams} from 'react-router-dom'

const UpdatePlace = () => {
  const params = useParams();
  console.log(params)

  return (
    <div>
      <h2>UPDATE PLACE</h2>
    </div>
  )
}

export default UpdatePlace
