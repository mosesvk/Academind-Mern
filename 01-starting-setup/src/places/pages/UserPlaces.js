import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl: 'https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg',
    address: '20 W 34th St, New York, NY 10001',
    mapAddress: 'https://goo.gl/maps/S2f2QENYnXBVd3yi8',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world',
    imageUrl: 'https://www.history.com/.image/t_share/MTU3ODc4NjA0ODYzOTA3NTUx/image-placeholder-title.jpg',
    address: '20 W 34th St, New York, NY 10001',
    mapAddress: 'https://goo.gl/maps/S2f2QENYnXBVd3yi8',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u2'
  }
]

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId)

  return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
