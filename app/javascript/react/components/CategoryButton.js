import React from 'react'

const CategoryButton = (props) => {
  return(
    <li><a href="#" className="button tiny" onClick = {props.handleClick}>{props.name}</a></li>
  )
}

export default CategoryButton
