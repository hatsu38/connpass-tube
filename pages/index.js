import React, { Component } from 'react'

import Layout from '../components/Layout'

import EventCard from '../components/EventCard'

import { Nav, Card } from 'react-bootstrap';

import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';

const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events"
const DEFAULT_RANGE = "recent"
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      range: 'recent',
      totalEventsCount: 0
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  UNSAFE_componentWillMount() {
    this.fetchEvents()
  }

  handleSelect = (eventKey) =>  {
    this.setState({range: eventKey})
    this.fetchEvents(eventKey)
  }

  async fetchEvents(range = DEFAULT_RANGE) {
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
              <Card.Title className="f3 m-b-10">人気ランキング</Card.Title>
              <div className="eventCount">
                <strong>{this.state.totalEventsCount}</strong>件のイベント
              </div>
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
          {this.state.events.map((event) =>
            <EventCard event={event} key={event.id} />
          )}
        </Layout>
      </>
    )
  }
}