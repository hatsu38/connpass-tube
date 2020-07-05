import React, { Component } from 'react'

import Layout from '../components/Layout'
import EventList from '../components/EventList'

import { Nav, Card } from 'react-bootstrap';

import axios from 'axios'

const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events"
const DEFALT_RANGE = "recent"
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      range: 'recent',
      totalEventsCount: 0
    }
    this.fetchEvents = this.fetchEvents.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.fetchEvents()
  }

  handleSelect = (eventKey) =>  {
    console.log("eventKey", eventKey);
    this.setState({range: eventKey})
    this.fetchEvents(eventKey)
  }

  async fetchEvents(range = DEFALT_RANGE) {
    console.log(`${REQUEST_API_BASE_URL}?range=${range}`)
    const apiResponse = await axios.get(`${REQUEST_API_BASE_URL}?range=${range}`)
    if(!apiResponse || !apiResponse.data) { return null }


    const eventData = apiResponse.data
    this.setState({events: eventData.events})
    this.setState({totalEventsCount: eventData.total_count})
  };

  render() {
    return (
      <>
        <Layout>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{this.state.totalEventsCount}件のイベント</Card.Title>
            </Card.Body>
          </Card>
          <Nav fill variant="tabs" defaultActiveKey={this.state.range} onSelect={this.handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="recent">
                最近
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="monthly">
                月
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="all">
                すべて
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <EventList events={this.state.events} />
        </Layout>
      </>
    )
  }
}