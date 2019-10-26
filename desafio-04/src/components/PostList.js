import React, { Component } from 'react'

import TechItem from '../components/Post'
import staticData from '../assets/posts'

class TechList extends Component {
  state = {
    newTech: '',
    posts: staticData
  }

  componentDidMount() {
    const techs = localStorage.getItem('techs')

    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    })
  }

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) })
  }

  render() {
    const { posts } = this.state

    return (
      <ul className='post-list'>
        {posts.map(tech =>
          <TechItem
            key={tech.id}
            postData={tech}
            onDelete={() => this.handleDelete(tech)}
          />
        )}
      </ul>
    )
  }
}

export default TechList;