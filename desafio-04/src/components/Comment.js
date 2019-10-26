import React from 'react'
import PropTypes from 'prop-types'

function Comment({ commentData }) {
  return (
    <li className='comment'>
      <div className='post-header'>
        <img src={commentData.author.avatar} />
        <div className='post-content'>
          <p><strong>{commentData.author.name}</strong>{commentData.content}</p>
        </div>
      </div>
    </li>
  )
}

Comment.propTypes = {
  commentData: PropTypes.object.isRequired
}

export default Comment