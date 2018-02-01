import React from 'react'

const SearchForm = (props) => {
  return(
    <form onSubmit = {props.handleClick} >
      <div className = "small-9 small-centered columns">
        <div className = "row collapse postfix">
          <div className = "small-9 columns">
            <input type="search" placeholder="Search by game name" onChange = {props.handleChange}/>
          </div>
          <div className = "small-3 columns">
            <button className = "button postfix" type="submit">Search</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
