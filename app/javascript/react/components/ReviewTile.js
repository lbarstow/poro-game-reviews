import React from "react";
import { Link } from 'react-router';

const ReviewTile = (props) => {
  return(
    <div className= "panel">
      <h2>Rating: {props.rating}</h2>
      <h2>Review:</h2>
      <p>{props.body}</p>
      <span>Posted by: {props.username}</span>
      <span className="right"><i className={props.upClass} onClick={props.onUpVote} value ={[props.]} /><i className={props.downClass} onClick={props.onDownVote}/>{props.victory_points}</span>
    </div>
  )

}

export default ReviewTile;
