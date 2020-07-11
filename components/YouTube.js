import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  movie: PropTypes.object.isRequired
};

export default class YouTube extends Component {
  constructor(props) {
    super(props);
  }

  getYoutubeId(youtubeUrl) {
    return youtubeUrl.replace(/http.:\/\/youtu.be\//, '')
  }

  formatEmbedYoutubeURL(youtubeLiveUrl) {
    const youtubeId = this.getYoutubeId(youtubeLiveUrl)
    return `https://www.youtube.com/embed/${youtubeId}`
  }

  render() {
    return (
      <>
        <div className="frame-wrapper__video">
          <iframe width="640" height="360" src={this.formatEmbedYoutubeURL(this.props.movie.url)} />
        </div>
      </>
    )
  }
}


YouTube.propTypes = propTypes