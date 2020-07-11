import React, { Component } from 'react'
import axios from 'axios'
import TagsRelatedEvent from '../components/TagsRelatedEvent'
const REQUEST_API_BASE_URL = "https://connpass-tube-api.herokuapp.com/api/v1/ranking/tags"

export default class TagsRelatedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    }
  }

  componentDidMount = () => {
    this.fetchTagsRelatedEvent()
  }

  async fetchTagsRelatedEvent() {
    const api = `${REQUEST_API_BASE_URL}?ranking=related&tags_num=10&events_num=5`
    const apiResponse = await axios.get(api).catch(null)
    if(!apiResponse || !apiResponse.data || apiResponse.data.status === 500) { return true }

    const data = apiResponse.data
    const insertTags = this.state.tags.concat(data.tags)
    this.setState({tags: insertTags})
  }

  render() {
    const { tags } = this.state
    return (
      <>
        {tags &&
          tags.map((tag) =>
            <TagsRelatedEvent key={tag.id} tag={tag} />
          )
        }
      </>
    )
  }
}