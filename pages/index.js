import React, { Component } from 'react'

import Layout from '../components/Layout'
import EventList from '../components/EventList'

import axios from 'axios'

const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events"

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
    this.fetchEvents = this.fetchEvents.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.fetchEvents()
  }

  async fetchEvents() {
    const apiResponse = await axios.get(REQUEST_API_BASE_URL)
    if(!apiResponse || !apiResponse.data) { return null }

    const events = apiResponse.data.events
    this.setState({events: events})
  };

  render() {
    return (
      <>
        <Layout>
          <EventList events={this.state.events} />
        </Layout>
      </>
    )
  }
}
