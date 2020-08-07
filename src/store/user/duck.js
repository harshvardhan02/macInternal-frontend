import { fromPromise } from 'rxjs/observable/fromPromise'
import { of } from 'rxjs'
import { mergeMap, flatMap, catchError } from 'rxjs/operators'
import { Record } from 'immutable'
import { assign } from 'lodash'
// import Cookies from 'universal-cookie'
import { ofType, combineEpics } from 'redux-observable'

import { INIT, LOADING, SUCCESS, ERROR } from '../../constants/phase'

import * as api from './api'

/***********************************
 * Action Types
 **********************************/
// const cookies = new Cookies()

export const LOGIN_USER = 'machineTest/user/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'machineTest/user/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'machineTest/user/LOGIN_USER_ERROR'

export const SIGNUP_USER = 'machineTest/user/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'machineTest/user/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'machineTest/user/SIGNUP_USER_ERROR'

export const CREATE_POST = 'machineTest/user/CREATE_POST'
export const CREATE_POST_SUCCESS = 'machineTest/user/CREATE_POST_SUCCESS'
export const CREATE_POST_ERROR = 'machineTest/user/CREATE_POST_ERROR'

export const GET_POST = 'machineTest/user/GET_POST'
export const GET_POST_SUCCESS = 'machineTest/user/GET_POST_SUCCESS'
export const GET_POST_ERROR = 'machineTest/user/GET_POST_ERROR'

export const UPDATE_POST = 'machineTest/user/UPDATE_POST'
export const UPDATE_POST_SUCCESS = 'machineTest/user/UPDATE_POST_SUCCESS'
export const UPDATE_POST_ERROR = 'machineTest/user/UPDATE_POST_ERROR'

export const GET_POST_BY_ID = 'machineTest/user/GET_POST_BY_ID'
export const GET_POST_BY_ID_SUCCESS = 'machineTest/user/GET_POST_BY_ID_SUCCESS'
export const GET_POST_BY_ID_ERROR = 'machineTest/user/GET_POST_BY_ID_ERROR'

export const DELETE_POST = 'machineTest/user/DELETE_POST'
export const DELETE_POST_SUCCESS = 'machineTest/user/DELETE_POST_SUCCESS'
export const DELETE_POST_ERROR = 'machineTest/user/DELETE_POST_ERROR'

export const CLEAR_PHASE = 'machineTest/user/CLEAR_PHASE'

export const USER_LOGOUT = 'machineTest/user/USER_LOGOUT'


/***********************************
 * Initial State
 ***********/

const InitialStateInterface = {
  phase: INIT,
  error: null,
  isSubmitting: false,
  message: null,
  token: null,
  createPostMessage: '',
  postPhase: INIT,
  posts: [],
  updatePostPhase: INIT,
  updatePostData: [],
  updatePostMessage: '',
  getPostById: [],
  deleteMessage: '',
  deletePostPhase: INIT,
  loginPhase: INIT,
  isSuccess: false,
  loginError: {},
  signUpPhase: INIT,
  signUpError: {}
}

class InitialState extends Record(InitialStateInterface) {
  constructor(desiredValues) {
    // When we construct InitialState, we automatically update it's default value
    // for token to be what is stored in localStorage
    const token = '' // localStorage.getItem(Config.LocalStorageKeys.Authorization)
    super(assign({ token }, desiredValues))
  }
}

/***********************************
 * Reducer
 ***********/

export default function (state = new InitialState(), action = {}) {
  switch (action.type) {

    case LOGIN_USER: {
      return state
        .set('phase', LOADING)
        .set('loginError', null)
    }

    case LOGIN_USER_SUCCESS: {
      const { payload } = action
      localStorage.setItem('authToken', payload.token)
      return state
        .set('loginPhase', SUCCESS)
        .set('isSuccess', payload.status)
        .set('message', payload.message)
        .set('loginError', null)
    }

    case LOGIN_USER_ERROR: {
      const { payload } = action
      return state
        .set('loginPhase', ERROR)
        .set('loginError', payload.message)
    }

    case SIGNUP_USER: {
      return state
        .set('phase', LOADING)
        .set('signUpError', null)
    }

    case SIGNUP_USER_SUCCESS: {
      const { payload } = action
      localStorage.setItem('authToken', payload.token)
      return state
        .set('signUpPhase', SUCCESS)
        .set('isSuccess', payload.status)
        .set('message', payload.message)
        .set('signUpError', null)
    }

    case SIGNUP_USER_ERROR: {
      const { payload } = action
      return state
        .set('signUpPhase', ERROR)
        .set('signUpError', payload.message)
    }

    case CREATE_POST: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case CREATE_POST_SUCCESS: {
      const { payload } = action
      if (payload.status) {
        return state
          .set('phase', SUCCESS)
          .set('createPostMessage', payload.message)
      } else {
        return state
          .set('phase', ERROR)
          .set('message', payload.message)
      }
    }

    case CREATE_POST_ERROR: {
      const { payload } = action
      return state
        .set('phase', ERROR)
        .set('error', payload.message)
        .set('isSubmitting', true)
    }

    case GET_POST: {
      return state
        .set('postPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case GET_POST_SUCCESS: {
      const { payload } = action
      if (payload.status) {
        return state
          .set('postPhase', SUCCESS)
          .set('posts', payload.data)
          .set('message', payload.message)
      }
      break;
    }

    case GET_POST_ERROR: {
      return state
        .set('postPhase', ERROR)
        .set('error', 'Something went wrong')
    }

    case UPDATE_POST: {
      return state
        .set('updatePostPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case UPDATE_POST_SUCCESS: {
      const { payload } = action
      if (payload.status) {
        return state
          .set('updatePostPhase', SUCCESS)
          .set('updatePostMessage', payload.message)
          .set('updatePostData', payload.data)
      } else {
        return state
          .set('updatePostPhase', ERROR)
          .set('updatePostMessage', payload.message)
      }
    }

    case UPDATE_POST_ERROR: {
      const { payload } = action
      return state
        .set('updatePostPhase', ERROR)
        .set('updatePostMessage', payload.message)
        .set('isSubmitting', true)
    }

    case GET_POST_BY_ID: {
      return state
        .set('postPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case GET_POST_BY_ID_SUCCESS: {
      const { payload } = action
      if (payload.status) {
        return state
          .set('postPhase', SUCCESS)
          .set('getPostById', payload.data)
          .set('message', payload.message)
      }
      break;
    }

    case GET_POST_BY_ID_ERROR: {
      const { payload } = action
      return state
        .set('postPhase', ERROR)
        .set('error', payload.message)
    }

    case DELETE_POST: {
      return state
        .set('deletePostPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case DELETE_POST_SUCCESS: {
      const { payload } = action
      if (payload.status) {
        return state
          .set('deletePostPhase', SUCCESS)
          .set('deleteMessage', payload.message)
      }
      break;
    }

    case DELETE_POST_ERROR: {
      const { payload } = action
      return state
        .set('deletePostPhase', ERROR)
        .set('error', payload.message)
    }

    case USER_LOGOUT: {
      window.localStorage.clear()
      return state
        .set('loginPhase', INIT)
        .set('signUpPhase', INIT)
    }

    default: {
      return state
    }
  }
}

/***********************************
* Action Creators
***********/
export const loginUser = credentials => {
  return {
    type: LOGIN_USER,
    payload: credentials
  }
}

export const signupUser = credentials => {
  return {
    type: SIGNUP_USER,
    payload: credentials
  }
}

export const createPost = credentials => {
  return {
    type: CREATE_POST,
    payload: credentials
  }
}

export const getPosts = (offset, limit) => {
  return {
    type: GET_POST,
    offset: offset,
    limit: limit
  }
}

export const updatePosts = (credentials, body) => {
  return {
    type: UPDATE_POST,
    payload: credentials,
    body: body
  }
}

export const getPostById = credentials => {
  return {
    type: GET_POST_BY_ID,
    payload: credentials
  }
}

export const deletePost = credentials => {
  return {
    type: DELETE_POST,
    payload: credentials
  }
}

export const logout = data => {
  return {
    type: USER_LOGOUT,
    payload: data
  }
}

/***********************************
 * Epics
 ***********************************/
const loginUserEpic = action$ =>
  action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(action => {
      return fromPromise(api.loginUser(action.payload)).pipe(
        flatMap(payload => [{
          type: LOGIN_USER_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: LOGIN_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const signupUserEpic = action$ =>
  action$.pipe(
    ofType(SIGNUP_USER),
    mergeMap(action => {
      return fromPromise(api.signupUser(action.payload)).pipe(
        flatMap(payload => [{
          type: SIGNUP_USER_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: SIGNUP_USER_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const createPostEpic = action$ =>
  action$.pipe(
    ofType(CREATE_POST),
    mergeMap(action => {
      return fromPromise(api.createPost(action.payload)).pipe(
        flatMap(payload => [{
          type: CREATE_POST_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: CREATE_POST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getPostEpic = action$ =>
  action$.pipe(
    ofType(GET_POST),
    mergeMap(action => {
      return fromPromise(api.getPosts(action.offset, action.limit)).pipe(
        flatMap(payload => [{
          type: GET_POST_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: GET_POST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const getPostByIdEpic = action$ =>
  action$.pipe(
    ofType(GET_POST_BY_ID),
    mergeMap(action => {
      return fromPromise(api.getPostById(action.payload)).pipe(
        flatMap(payload => [{
          type: GET_POST_BY_ID_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: GET_POST_BY_ID_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const updatePostEpic = action$ =>
  action$.pipe(
    ofType(UPDATE_POST),
    mergeMap(action => {
      return fromPromise(api.updatePost(action.payload, action.body)).pipe(
        flatMap(payload => [{
          type: UPDATE_POST_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: UPDATE_POST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )

const deletePostEpic = action$ =>
  action$.pipe(
    ofType(DELETE_POST),
    mergeMap(action => {
      return fromPromise(api.deletePost(action.payload)).pipe(
        flatMap(payload => [{
          type: DELETE_POST_SUCCESS,
          payload
        }
        ]),
        catchError(error =>
          of({
            type: DELETE_POST_ERROR,
            payload: { error }
          })
        )
      )
    })
  )


export const userEpic = combineEpics(
  loginUserEpic,
  signupUserEpic,
  createPostEpic,
  getPostEpic,
  updatePostEpic,
  getPostByIdEpic,
  deletePostEpic
)