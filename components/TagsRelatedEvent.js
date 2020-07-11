import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  tag: PropTypes.object.isRequired
}

export default class TagsRelatedEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {}

  render() {
    const tag = this.props.tag
    console.log("tag====", tag)
    return (
      <>
        <h2 className="section-title-main-text">{tag.name}</h2>
      </>
    )
  }
}

TagsRelatedEvent.propTypes = propTypes