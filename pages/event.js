import React, { Component } from 'react'
import Layout from '../components/Layout'

import {withRouter} from 'next/router'

import { Card } from 'react-bootstrap';

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
    return(
      <Card>
        <Card.Img variant="top" src="https://s3.ap-northeast-1.amazonaws.com/s3.techplay.jp/tp-images/event/586318a441ee3cec55576ba8ed067bdf7b60a42c.png" />
        <Card.Body>
          <Card.Text>
            {this.state.event.title}
          </Card.Text>
          <Card.Text className="text--light">
            <HoldingDateTime
              startDateTime={this.state.event.started_at}
              endDateTime={this.state.event.ended_at}
            />
          </Card.Text>
          <Card.Text className="text--light">
            <ApplicationAndCapacityCount event={this.state.event} />
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
          {this.isNotEmpty(event) && this.renderDetailCard()}
          {this.isNotEmpty(movies) && this.renderYouTube()}
        </Layout>
      </>
    )
  }
}

export default withRouter(Event)