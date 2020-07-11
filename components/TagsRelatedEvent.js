import React, { Component } from 'react'
import PropTypes from 'prop-types'
import EventCard from '../components/EventCard'

const propTypes = {
  tag: PropTypes.object.isRequired
}

export default class TagsRelatedEvent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tag = this.props.tag
    const events = this.props.tag.events
    return (
      <>
        <div className="white--background">
          <h2 className="f4 section-title-main-text mt-20 mb-0 pt-20 pb-20 pl-10 border-top">{tag.name}</h2>
          {events && events.map((event) => <EventCard event={event} key={event.id} />)}
        </div>
      </>
    )
  }
}

TagsRelatedEvent.propTypes = propTypes