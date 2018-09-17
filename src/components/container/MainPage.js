import React, { Component } from 'react'
import Quotes from '../presentational/Quotes'

export default class MainPage extends Component {

    state = {
      quotes: []
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/b1nary/ea8fff806095bcedacce/raw/6e6de20d7514b93dd69b149289264997b49459dd/enterpreneur-quotes.json')
            .then(res => res.json())
            .then(json => {
              let quotes = json
              this.setState({
                quotes
              })
            })
    }

  render() {
    return (
      <div className='main-page'>
        <Quotes quotes={this.state.quotes}/>
      </div>
    )
  }
}
