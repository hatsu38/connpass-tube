import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';

const propTypes = {
  range: PropTypes.string.isRequired
}

export default class SelectNav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Nav fill variant="tabs" defaultActiveKey={this.props.range}>
        <Nav.Item>
          <Nav.Link eventKey="/">
            最近
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="monhly">
            月
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="all">
            すべて
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}

SelectNav.propTypes = propTypes