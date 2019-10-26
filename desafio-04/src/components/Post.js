import React from 'react'
import PropTypes from 'prop-types'

import Comment from './Comment'

function Post({ postData }) {
  return (
    <li className='container'>
      <div className='post-header'>
        <img src={postData.author.avatar} />
        <div>
          <strong>{postData.author.name}</strong>
          <p className='date'>{postData.date}</p>
        </div>
      </div>
      <div className='post-content'>
        {postData.content}
      </div>
      {postData.comments.map(item =>
        <Comment
          key={item.id}
          commentData={item}
        />
      )}
    </li>
  )
}

Post.propTypes = {
  postData: PropTypes.object.isRequired
}

export default Post