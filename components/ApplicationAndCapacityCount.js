import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default class ApplicationAndCapacityCount extends Component {
  constructor(props) {
    super(props);
  }

  isCapacityCountOver(event) {
    if(!event.limit || event.limit === 0){ return false }
    return event.limit < event.applicant
  }
  render() {
    const event = this.props.event
    const applicantColor = this.isCapacityCountOver(event) ? 'text--color-red' : null
    return(
      <>
        <FontAwesomeIcon icon={faUsers} className="icon--margin" />
        <span className={applicantColor}>{event.applicant}人</span>
        { 0 < event.limit && <span>/定員:{event.limit}人</span> }
      </>
    )
  }
}

ApplicationAndCapacityCount.propTypes = {
  event: PropTypes.object.isRequired
};