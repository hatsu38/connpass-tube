import React, { Component } from 'react'
import EventCard from '../components/EventCard'
import { Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios'
const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/events"

export default class RankingEvent extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  get initialState() {
    return {
      events: [],
      range: 'recent',
      totalEventsCount: 0,
      page: 1,
      hasMore: false,
      isLoading: false
    }
  }

  componentDidMount = () => {
    this.fetchEvents()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.range !== prevState.range) {
      this.fetchEvents()
    }
  }

  resetState = () => {
    this.setState(this.initialState)
  }

  resetStateExceptRange = () => {
    this.setState({events: []})
    this.setState({page: 1})
    this.setState({hasMore: false})
    this.setState({isLoading: false})
  }

  handleSelect = eventKey =>  {
    this.resetStateExceptRange()
    this.setState({range: eventKey})
  }

  async fetchEvents() {
    this.setState({isLoading: true})
    const { events, page, range } = this.state
    const apiResponse = await axios.get(`${REQUEST_API_BASE_URL}?range=${range}&page=${page}`).catch(null)

    if(!apiResponse || !apiResponse.data || apiResponse.data.status === 500) {
      this.setState({hasMore: false})
      this.setState({isLoading: false})
      return true
    }

    const eventData = apiResponse.data
    const insertEvents = events.concat(eventData.events)

    this.setState({events: insertEvents})
    this.setState({totalEventsCount: eventData.total_count})

    this.updatePageAndHasMore()
    this.setState({isLoading: false})
  }

  updatePageAndHasMore = () => {
    const { events, totalEventsCount, page } = this.state
    if(totalEventsCount > events.length){
      const nextPage = page + 1
      this.setState({hasMore: true})
      this.setState({page: nextPage})
    } else {
      this.setState({hasMore: false})
    }
  }

  render() {
    const { events, isLoading, hasMore, range, totalEventsCount } = this.state

    return (
      <>
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="f3 mb-10">人気ランキング</Card.Title>
            <div className="eventCount">
              <strong>{totalEventsCount}</strong>件のイベント
            </div>
          </Card.Body>
        </Card>
        <Nav fill variant="tabs" defaultActiveKey={range} onSelect={this.handleSelect}>
          <Nav.Item>
            <Nav.Link eventKey="recent">最近</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monthly">月</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="all">すべて</Nav.Link>
          </Nav.Item>
        </Nav>
        {events && events.map((event) => <EventCard event={event} key={event.id} />)}
        {hasMore &&
          <div className="moreReadButton--wrapper mb-40">
            <Button
              block
              className="moreReadButton"
              variant="outline-secondary"
              disabled={isLoading}
              onClick={isLoading ? null : this.fetchEvents}
            >
              {isLoading ? '読み込み中…' : 'もっと見る'}
            </Button>
          </div>
        }
      </>
    )
  }
}