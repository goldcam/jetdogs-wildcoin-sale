import React, { Component } from 'react';
import './css/App.scss';


import GameTile from './GameTile'
import PageMenu from './PageMenu'



class App extends Component {

  constructor() {
    super();
    this.state = {
      games: [],
      activeGameSection: 'All Games'
    }
    this.tileClick = this.tileClick.bind(this);
    this.menuClick = this.menuClick.bind(this);
  }

  tileClick(game){
    window.location = `/games/${game.friendlyproductkey}`;
  }

  menuClick(genre){
    this.setState({
      activeGameSection: genre
    });
  }

  render(){
    return (
      <div id="app" >
        <div className="container">
          <div className="row">
            <div className="col-sm-10 offset-sm-2 page-title">
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-sm-3 pageNav">
                  <nav className="lpNav" id="lpPageNav">
                    <div className="row">
                      <div className="col-sm-11">
                        <h3>Genre</h3>
                        <ul id="navUl1">
                          <PageMenu menuClick={this.menuClick} />
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div>
                <div className="col-sm-8 col-lg-9">
                  <div className="row game-tiles">
                      <h2 className="col-sm-12 gameSecHeader" >{this.state.activeGameSection}</h2>
                      <GameTile tileClick={this.tileClick}
                                activeGame={this.state.activeGameSection} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scrollSpacer"></div>
        </div>
      </div>

    );
  }
}

export default App
