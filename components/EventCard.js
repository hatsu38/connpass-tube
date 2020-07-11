import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Card, Badge } from 'react-bootstrap';
import Link from 'next/link'

import HoldingDateTime from '../components/HoldingDateTime'
import ApplicationAndCapacityCount from '../components/ApplicationAndCapacityCount'

const propTypes = {
  event: PropTypes.object.isRequired,
}

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const event = this.props.event
    const tags = event.tags
    if(!event) {return null}

    return (
      <>
        <Link href={`/event?id=${event.id}`} as={`/event/${event.id}`}>
          <Card>
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
              <div>
                {tags && tags.map((tag) =>
                  <Badge key={tag.id} pill className="m-r-5 bg--darken_1" style={{color: 'white'}}>{tag.name}</Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        </Link>
      </>
    )
  }
}

EventCard.propTypes = propTypes