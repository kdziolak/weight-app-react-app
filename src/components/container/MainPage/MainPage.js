import React, { Component } from 'react'
import Quotes from '../../presentational/Quotes/Quotes'
import './MainPage'
import OptionCard from '../../presentational/OptionCard/OptionCard';
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle'
import Weight from '../../../img/weight.png'

export default class MainPage extends Component {

    state = {
      quotes: [],
      optionContents: ['add weight measurement', 'add meal today', 'check your progress', 'add workout'],
      imgs: [Weight],
      colorCards: ['pink', 'purple', 'cyan', 'light-green'],
      links: ['/measurement/add', '/', '/', '/']
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/b1nary/ea8fff806095bcedacce/raw/6e6de20d7514b93dd69b149289264997b49459dd/enterpreneur-quotes.json')
            .then(res => res.json())
            .then(json => {
              let quotes = json;
              this.setState({
                quotes
              })
            })
           
        
    }

  render() {
    return (
      <div className='main-page center-align'>
        <Quotes quotes={this.state.quotes}/>
        <HeaderTitle headerNumber={2} content='What you want to do?' />
        <div className="container">
          <div className="row">
            {
              this.state.optionContents.map((text, i) => {
              return(
                <OptionCard key={i} content={text} link={this.state.links[i]} color={this.state.colorCards[i]} img={this.state.imgs[i]}/>
              );              
              })
            }
          </div>
        </div>
        
      </div>
    )
  }
}
