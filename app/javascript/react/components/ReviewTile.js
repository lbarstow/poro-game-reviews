import React from "react";
import { Link } from 'react-router';

const ReviewTile = (props) => {
  let handleUp = () => {
    props.onUpVote(props.id, props.value)
  }
  let handleDown = () => {
    props.onDownVote(props.id, props.value)
  }

  return(
    <div className= "panel">
      <h2>Rating: {props.rating}</h2>
      <h2>Review:</h2>
      <p>{props.body}</p>
      <span>Posted by: {props.username}</span>
      <span className="right">
        <i className={props.upClass} onClick={handleUp}  />
        <i className={props.downClass} onClick={handleDown}/>
          {props.victory_points}
        </span>
    </div>
  )

}

export default ReviewTile;
