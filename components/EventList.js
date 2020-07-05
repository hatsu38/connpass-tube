import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

import HoldingDateTime from '../components/HoldingDateTime'
import ApplicationAndCapacityCount from '../components/ApplicationAndCapacityCount'

export default class EventList extends Component {
  constructor(props) {
    super(props);
  }
  renderEventList() {
    const events = this.props.events
    if(!events) {return null}

    return (
      events.map((event, index) =>
        <Card key={index}>
          <Card.Body>
            <Card.Title>{event.title}</Card.Title>
            <Card.Text className="text--light">
              <HoldingDateTime
                startDateTime={event.started_at}
                endDateTime={event.ended_at}
              />
            </Card.Text>
            <Card.Text className="text--light">
              <ApplicationAndCapacityCount event={event} />
            </Card.Text>
          </Card.Body>
        </Card>
      )
    )
  }

  render() {
    return (
      <>
        {this.renderEventList()}
      </>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired,
};