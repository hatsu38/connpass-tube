import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

export default class HoldingDateTime extends Component {
  constructor(props) {
    super(props);
  }

  formatStringToDate(stringDateTime) {
    return moment(stringDateTime).format('YYYY年MM月DD日')
  }

  formatStringToTime(stringDateTime) {
    return moment(stringDateTime).format('HH:MM')
  }

  formatStringToDateTime(stringDateTime) {
    return moment(stringDateTime).format('YYYY年MM月DD日 HH:MM')
  }

  holdingTime(startDateTime, endDateTime) {
    const isStartAndEndSameDate = moment(startDateTime).isSame(endDateTime, 'day')
    if(isStartAndEndSameDate) {
      const holdingDate = this.formatStringToDate(startDateTime)
      const holdingTime = `${this.formatStringToTime(startDateTime)}~${this.formatStringToTime(endDateTime)}`
      return `${holdingDate} ${holdingTime}`
    } else {
      return `${this.formatStringToDateTime(startDateTime)} ${this.formatStringToDateTime(endDateTime)}`
    }
  }

  render() {
    return (
      <>
        <FontAwesomeIcon icon={faCalendarAlt} className="icon--margin" />
        { this.holdingTime(this.props.startDateTime, this.props.endDateTime) }
      </>
    )
  }
}

HoldingDateTime.propTypes = {
  startDateTime: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
};
