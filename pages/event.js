import React, { Component } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import {withRouter} from 'next/router'

import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import HoldingDateTime from '../components/HoldingDateTime'
import ApplicationAndCapacityCount from '../components/ApplicationAndCapacityCount'
import YouTube from '../components/YouTube'

const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events/"

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      movies: []
    }
  }


  UNSAFE_componentWillMount(nextProps) {
    this.fetchEvent()
  }

  async fetchEvent() {
    const apiResponse = await axios.get(`${REQUEST_API_BASE_URL}${this.props.router.query.id}`)
    if(!apiResponse || !apiResponse.data) { return null }

    const eventData = apiResponse.data
    this.setState({event: eventData.event})
    this.setState({movies: eventData.movies})
  };

  isNotEmpty(obj) {
    return Object.keys(obj).length
  }

  renderYouTube() {
    return (
      this.state.movies.map((movie, index) =>
        <YouTube key={index} movie={movie} />
      )
    )
  }

  renderDetailCard(){
    const event = this.state.event
    return(
      <Card>
        <Card.Body>
          <Card.Text>
            {event.title}
          </Card.Text>
          <Card.Text className="text--light">
            <HoldingDateTime
              startDateTime={event.started_at}
              endDateTime={event.ended_at}
            />
          </Card.Text>
          <Card.Text className="text--light">
            <ApplicationAndCapacityCount event={event} />
          </Card.Text>
          <Card.Text className="text--light">
            <Link href={event.connpass_event_url} prefetch={false}>
              <a target="_blank">
                <FontAwesomeIcon icon={faExternalLinkAlt} className="icon--margin darken_1" />
              </a>
            </Link>
            <Link href={event.connpass_event_url} prefetch={false}>
              <a target="_blank">元のイベントページへ</a>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }

  render() {
    const event = this.state.event
    const movies = this.state.movies
    return (
      <>
        <Layout>
          {this.isNotEmpty(movies) ? this.renderYouTube() : null }
          {this.isNotEmpty(event) ? this.renderDetailCard() : null }
        </Layout>
      </>
    )
  }
}

export default withRouter(Event)