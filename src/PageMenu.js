import React, { Component } from 'react';

class PageMenu extends Component {

  constructor() {
    super();
    this.state = {
      genres: []
    }
  }

  buildMenu(){
    let leftNavGenre =[
      'All Games',
      'Time Management & Strategy',
      'Puzzle & Mahjong',
      'Hidden Object & Adventure',
    ];

    this.setState({
      genres: leftNavGenre
    });
  }

  componentDidMount(){
    this.buildMenu();
  }

  render(){
    let menuGenres = this.state.genres;
    return (
      <>
      {menuGenres.map((genre, key) => (
       <li key={key}>
         <button data-sort="genre" onClick={() => this.props.menuClick(genre)} >{genre}</button>
       </li>
      ))}
      </>
    )
  }

}
export default PageMenu
