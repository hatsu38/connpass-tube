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
    this.fetchTagsRelatedEvent
  }

  async fetchTagsRelatedEvent() {
    const apiResponse = await axios.get(`${REQUEST_API_BASE_URL}?num=${10}`).catch(null)
    if(!apiResponse || !apiResponse.data || apiResponse.data.status === 500) { return true }

    const data = apiResponse.data
    const insertTags = this.state.tags.concat(data.tags)
    console.log("insertTags", insertTags)
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