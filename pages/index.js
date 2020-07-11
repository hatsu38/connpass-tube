import React, { Component } from 'react'

import Layout from '../components/Layout'
import RankingEvent from '../components/RankingEvent'


export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Layout>
        <RankingEvent />
      </Layout>
    )
  }
}