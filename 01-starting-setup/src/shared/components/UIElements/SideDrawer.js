import React from 'react'
import { ReactDOM } from 'react'

import './SideDrawer.css'

const SideDrawer = (props) => {
  const content = (
    <aside className='side-drawer'>
      {props.children}
    </aside>)


  return (
    ReactDOM.createPortal(content, getElementById('drawer-hook'))
  )
}

export default SideDrawer
