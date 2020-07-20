import { fetch } from '../../utils'

const HOSTNAME = process.env.REACT_APP_API_HOSTNAME

// create post api

export const createPost = credentials => {
  return fetch(`${HOSTNAME}/api/v1/create_post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

// read

export const getPosts = credentials => {
  return fetch(`${HOSTNAME}/api/v1/get_posts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

// getpostbyid 

export const getPostById = credentials => {
  return fetch(`${HOSTNAME}/api/v1/get_postsById/`+credentials, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

// update

export const updatePost = (credentials, body) => {
  return fetch(`${HOSTNAME}/api/v1/update_post/`+credentials, {
    method: 'PUT',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    body: JSON.stringify(body)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}

// delete

export const deletePost = credentials => {
  return fetch(`${HOSTNAME}/api/v1/delete_post/`+credentials, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
    // body: JSON.stringify(credentials)
  })
    .then(res => {
      return res.json()
    })
    .then(payload => {
      return payload
    })
    .catch(error => {
      throw error
    })
}