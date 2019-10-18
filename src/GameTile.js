import React, { Component } from 'react';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import './css/GameTile.scss';

polyfill();

class GameTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: []
    }
  }

  getGames(){
    let gamesArr = [
      {oid:"alchemeymysteriespraguelegends", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"aliciaquatermain3ce", fullWcPrice: 60, saleWcPrice:	15},
      {oid:"aliciaquatermain3se", fullWcPrice: 30, saleWcPrice:	10},
      {oid:"aliciaquatermainandthesof", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"aliciaquatermainandthesofse", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"aliciaquatermainsotltce", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"aliciaquatermainsotltse", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"archimedeseurekace", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"archimedeseurekase", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"cursed", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"draculaslegacy", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"frankensteinmasterofdeath", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"mazelord", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"oidjetd004884mahjongstoriesvam", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd004886travelmosaics4ad", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd004887shoppingclutter", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005028travelmosaics5w", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd00503112laboursofhercu", fullWcPrice: 80, saleWcPrice:	15},
      {oid:"oidjetd00503212laboursofhercu", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005113travelmosaics6c", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005116shoppingclutter2", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005123kidsofhellasback", fullWcPrice: 80, saleWcPrice:	10},
      {oid:"oidjetd005237kensho", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005496ecomagjong", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005497travelmosaics7f", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005650shoppingclutter3", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005651travelmosaics8b", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005665varenje", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005810travelmosaics9m", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"oidjetd005825aliciaquatermain4", fullWcPrice: 80, saleWcPrice:	15},
      {oid:"travelmosaics3tokyoanimated", fullWcPrice: 40, saleWcPrice:	10},
      {oid:"travelmosaicsromanholiday", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"travelmosiacs", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"twelvelaborsofhercules", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"twelvelaborsofherculesii", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"twelvelaboursofhercules3", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"twelvelaboursofhercules4ce", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"twelvelaboursofhercules5kidsce", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"twelvelaboursofhercules6rfo", fullWcPrice: 20, saleWcPrice:	10},
      {oid:"twelvelaboursofhercules6rfoce", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"twelvelaboursofhercules7", fullWcPrice: 40, saleWcPrice:	15},
      {oid:"twelvelaboursofhercules7se", fullWcPrice: 20, saleWcPrice:	10}
    ],
    games = [],
    promises = gamesArr.map(function(obj, i){
      let game;
      const X = axios.get(`https://products.wildtangent.com/products/v1.0/wildgames/us/en-us/${obj.oid}?output=json&scope=all`)
        .then(result => {
          let prod = result.data.results[0],
              genre = (function(i){
                let tagLength = i.tags.length;
                for (let ha = 0; ha < tagLength; ha++){
                  if ('Genre' === i.tags[ha].tagtype){
                    return i.tags[ha].displayname;
                  }
                }
                return null
              })(prod);
      game = {
        'productkey':prod.productkey,
        'title': prod.title,
        'i': i,
        'friendlyproductkey':prod.friendlyproductkey,
        'oid': obj.oid,
        'fullWcPrice': obj.fullWcPrice,
        'wildcoinspurchasecost': prod.wildcoinspurchasecost,
        'genre': genre,
        'bigIcon': `https://optimizedimages.wildtangent.com/${prod.productkey}/big_icon.png?h=160&amp;amp;w=160&amp;amp;auto=compress&amp;amp;cs=tinysrgb`
      };
      games.push(game);
        return game;
      });
    return X;
    });
    return Promise.all(promises).then(results => {
      this.setState({
        games: results
      });
    });
  }
  componentDidMount(){
    this.getGames();
  }
  render(){
    return (
      <>
      { this.state.games.length > 0 ? this.state.games.map(game => {
        let menuGenre = game.genre;
        switch(menuGenre){
          case 'Adventure':
          case 'Hidden Object':
            menuGenre = 'Hidden Object & Adventure'
          break;
          case 'Puzzle':
          case 'Mahjong':
            menuGenre = 'Puzzle & Mahjong'
          break;
          case 'Strategy':
          case 'Time Management':
            menuGenre = 'Time Management & Strategy'
          break;
          default:
            menuGenre = game.genre;
          break;
        }
        return (<div onClick={() => this.props.tileClick(game)}
             className={"wrapperElement col-xs-5 col-sm-5 col-md-3 col-lg-2 " + (this.props.activeGame === menuGenre ? "active" : (this.props.activeGame === "All Games" ? "active" : ""))}
             data-event-action="Jetdogs-wildcoin-sale Tile"
             data-event-category="Landing Page"
             data-event-label={game.productkey}
             key={game.i}
             data-orderitemid={game.productkey}>
          <div className="bigIconDiv">
            <img src={game.bigIcon} className="bigIcon" alt={game.title} />
          </div>
          <p className="gameTitle">{game.title}</p>
          <p className="genre">{game.genre}</p>
          <p className="gamePrice">
            <span className="strikeThrough">{game.fullWcPrice}</span>
            <span className="wildcoin-price">{game.wildcoinspurchasecost.value}</span>
          </p>
          <a href={`/games/${game.friendlyproductkey}`} className="cta" title="More Info" data-event-category="Landing Page" data-event-action="Jetdogs-wildcoin-sale" data-event-label={game.productkey} >More Info</a>
        </div>)
      }) : '' }
      </>
    );
  }
}
export default GameTile
