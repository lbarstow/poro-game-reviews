import React, { Component } from "react";
import GameTile from "../components/GameTile";
import GameFormTile from "../components/GameFormTile";
import GameFormNoUserTile from "../components/GameFormNoUserTile";
import CategoryButton from "../components/CategoryButton"
import PageNumberButton from "../components/PageNumberButton"
import SearchForm from "../components/SearchForm"

class GamesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      categories: [],
      category: null,
      pageCount: null,
      pageNum: 1,
      searchTerm: '',
      errors: []
    };
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.fetchGamesByPage = this.fetchGamesByPage.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleNewFormNoUserClick = this.handleNewFormNoUserClick.bind(this);
  }

  handleNewFormNoUserClick(event) {
    let errors = []
    errors.push("Please Sign In to Enter New Game")
    this.setState({ errors: errors })
  }

  handleCategoryClick(event) {
    let category = event.target.id
    let page = 1
    if (this.state.category === category) {
      category = null;
      this.setState({ category: null, pageNum: page, searchTerm: '' })
    } else {
      this.setState({ category: category, pageNum: page, searchTerm: '' })
    }
    this.fetchGamesByPage(page, category, '')
  }

  handlePageClick(event) {
    event.preventDefault()
    let text = event.target.text
    if (text != parseInt(this.state.pageNum) && !isNaN(parseInt(text))) {
      this.setState({ pageNum: text })
    } else if (text === '<<') {
      this.setState({ pageNum: 1 })
      text = 1
    } else if (text === '>>') {
      this.setState({ pageNum: this.state.pageCount })
      text = parseInt(this.state.pageCount)
    } else if (text === '<') {
      text = parseInt(this.state.pageNum) - 1
      this.setState({ pageNum: parseInt(this.state.pageNum) - 1 })
    } else if (text === '>') {
      text = parseInt(this.state.pageNum) + 1
      this.setState({ pageNum: parseInt(this.state.pageNum) + 1 })
    }

    this.fetchGamesByPage(text, this.state.category, this.state.searchTerm)
  }

  fetchGamesByPage(page, category, searchTerm) {
    if (category == null) {
    fetch(`/api/v1/games?page=${page - 1}&s=${searchTerm}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ games: body.games, pageCount: body.pages })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      fetch(`/api/v1/categories/${category}/games?page=${page - 1}`)
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ games: body.games, pageCount: body.pages })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleSearchChange(event) {
    let searchTerm = event.target.value
    this.setState({ searchTerm: searchTerm })
  }

  handleSearchClick(event) {
    event.preventDefault()
    this.setState({ pageNum: 1, category: null })
    this.fetchGamesByPage(1, null, this.state.searchTerm)
  }


  componentDidMount() {
    this.fetchGamesByPage(1, null, this.state.searchTerm)
    fetch('/api/v1/categories.json')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ categories: body })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let errorHTML
    let errorClass = ""
    if (this.state.errors.length > 0) {
      errorClass = "panel alert"
      errorHTML = this.state.errors.map(error => {
        return <li>{error}</li>
      })
    }

    let categoryButtons = this.state.categories.map( category => {

      return(
        <CategoryButton
          key={category.id}
          id={category.id}
          name = {category.name}
          handleClick = {this.handleCategoryClick}
        />
      )
    })

    let gameTiles = this.state.games.map( game => {
      let shortDescription = game.description.substring(0, 60).concat('...');
      let categories = ''
      game.categories.forEach(category => {
        categories += `${category.name}, `
      })
      categories = categories.replace(/,\s*$/, "")

        return(
          <li>
            <GameTile
              id={game.id}
              key={game.id}
              name={game.name}
              categories = {categories}
              description={shortDescription}
            />
          </li>
        )

    })

    let pageTiles = []
    let selectedPageNum = this.state.pageNum
    if (this.state.pageNum != 1) {
      pageTiles.push(
        <PageNumberButton
          className="arrow "
          pageNum="<<"
          handleClick={this.handlePageClick}
        />)
      pageTiles.push(
        <PageNumberButton
          className="arrow "
          pageNum="<"
          handleClick={this.handlePageClick}
        />)
    }
    for (let i = 0; i < this.state.pageCount; i++){
      let selectedClassName = ''
      if (i+1 == selectedPageNum) {
        selectedClassName = 'current'
      }
      pageTiles.push(
        <PageNumberButton
          className={selectedClassName}
          pageNum={i+1}
          handleClick={this.handlePageClick}
        />)
    }
    if (this.state.pageNum != this.state.pageCount) {
      pageTiles.push(
        <PageNumberButton
          className="arrow "
          pageNum=">"
          handleClick={this.handlePageClick}
        />)
      pageTiles.push(
        <PageNumberButton
          className="arrow "
          pageNum=">>"
          handleClick={this.handlePageClick}
        />)
    }

    if (this.props.currentUserId) {
      gameTiles.push([<li><GameFormTile/></li>])
    } else {
      gameTiles.push([<li><GameFormNoUserTile handleClick={this.handleNewFormNoUserClick}/></li>])
    }


    return(
        <div className = "row games-container">
          <div className= {errorClass}>
            {errorHTML}
          </div>
          <h1 className = "main-title small-8 small-centered columns">Poro Game Reviews</h1>
          <SearchForm
            handleChange = {this.handleSearchChange}
            handleClick = {this.handleSearchClick}
          />
          <hr/>

          <ul className="button-group even-6 ">
            {categoryButtons}
          </ul>

          <ul className= "small-block-grid-3">
            {gameTiles}
          </ul>
          <div className = "pagination-centered">
            <ul className="pagination">
             {pageTiles}
            </ul>
          </div>

        </div>
    )
  }
}

export default GamesIndexContainer;
