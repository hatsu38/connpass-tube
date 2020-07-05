import React, { Component } from 'react'

import EventList from '../components/EventList'
import SelectNav from '../components/SelectNav'

import axios from 'axios'

const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events"

export default class PopularEventsWithNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      range: '/'
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
        <SelectNav range={this.state.range} />
        <EventList events={this.state.events} />
      </>
    )
  }
}
