import React from 'react'
import { Link } from 'react-router';

const PageNumberButton = (props) => {
  return(
    <li className={props.className} ><a href='#' onClick={props.handleClick}>{props.pageNum}</a></li>
  )
}

export default PageNumberButton
