import React, { Component } from 'react'

import Layout from '../components/Layout'
import RankingEvent from '../components/RankingEvent'
import TagsRelatedEvents from '../components/TagsRelatedEvents'

export default class Index extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Layout>
        <RankingEvent />
        <TagsRelatedEvents />
      </Layout>
    )
  }
}