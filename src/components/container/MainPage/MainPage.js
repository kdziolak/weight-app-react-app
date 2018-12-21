import React, { Component } from 'react'
import Quotes from '../../presentational/Quotes/Quotes'
import './MainPage.css'
import OptionCard from '../../presentational/OptionCard/OptionCard';
import HeaderTitle from '../../presentational/HeaderTitle/HeaderTitle'
import Weight from '../../../img/weight.png'
import Table from '../../../img/test.png'
import BodySize from '../../../img/healthy.png'




export default class MainPage extends Component {

  datas = [
    {
      id: 0,
      optionContents: 'add weight measurement',
      img: Weight,
      colorCard: 'pink',
      link: '/measurement/add',
      imgClass: 'show-results-img'
    },
    {
      id: 1,
      optionContents: 'show measurements results',
      img: Table,
      colorCard: 'cyan',
      link: '/measurement/results',
      imgClass: 'show-results-img'
    },
    {
      id: 2,
      optionContents: 'add body size measurement',
      colorCard: 'indigo',
      img: BodySize,
      link: '/measurement/add-body-size',
      imgClass: 'show-results-img'
    },
    // {
    //   id: 3,
    //   optionContents: 'check your progress',
    //   colorCard: 'light-green',
    //   link: '/',
    // },
    // {
    //   id: 4,
    //   optionContents: 'add workout',
    //   colorCard: 'orange',
    //   link: '/',
    // },
    // {
    //   id: 5,
    //   optionContents: 'add meal today',
    //   colorCard: 'purple',
    //   link: '/',
    // },
  ]

  state = {
    quotes: [],
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
        <Quotes quotes={this.state.quotes} />
        <HeaderTitle headerNumber={2} content='What do you want to do?' />
        <div className="container">
          <div className="row">
            {
              this.datas.map(data => {
                const { optionContents, imgClass, img, colorCard, link, id } = data;
                return (
                  <OptionCard key={id} content={optionContents} link={link} color={colorCard} img={img} imgClass={imgClass} />
                );
              })
            }
          </div>
        </div>

      </div>
    )
  }
}
