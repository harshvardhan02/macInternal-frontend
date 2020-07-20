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

export const CREATE_POST = 'machineTest/user/CREATE_POST'
export const CREATE_POST_SUCCESS = 'machineTest/user/CREATE_POST_SUCCESS'
export const CREATE_POST_ERROR = 'machineTest/user/CREATE_POST_ERROR'

export const GET_POST = 'machineTest/user/GET_POST'
export const GET_POST_SUCCESS = 'machineTest/user/GET_POST_SUCCESS'
export const GET_POST_ERROR = 'machineTest/user/GET_POST_ERROR'

export const UPDATE_POST = 'machineTest/user/UPDATE_POST' 
export const UPDATE_POST_SUCCESS = 'machineTest/user/UPDATE_POST_SUCCESS' 
export const UPDATE_POST_ERROR = 'machineTest/user/UPDATE_POST_ERROR'

export const GET_POST_BY_ID = 'machineTest/user/UPDATE_POST' 
export const GET_POST_BY_ID_SUCCESS = 'machineTest/user/GET_POST_BY_ID_SUCCESS' 
export const GET_POST_BY_ID_ERROR = 'machineTest/user/GET_POST_BY_ID_ERROR'

export const DELETE_POST = 'machineTest/user/DELETE_POST'
export const DELETE_POST_SUCCESS = 'machineTest/user/DELETE_POST'
export const DELETE_POST_ERROR = 'machineTest/user/DELETE_POST'


/***********************************
 * Initial State
 ***********/

 const InitialStateInterface = {
 	phase: INIT,
 	error: null,
 	isSubmitting: false,
 	message: null,
  createPostMessage: '',
  postPhase: INIT,
  posts: [],
  timeSlots: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  updatePostPhase: INIT,
  updatePostData: [],
  updatePostMessage: '',
  getPostById: [],
  deleteMessage: '',
  deletePostPhase: INIT 
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

    case CREATE_POST: {
      return state
        .set('phase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case CREATE_POST_SUCCESS: {
        const { payload } = action
        if(payload.status){
          return state
            .set('phase', SUCCESS)
            .set('createPostMessage', payload.message)
        }else{
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
      if(payload.status){
        return state
          .set('postPhase', SUCCESS)
          .set('posts', payload.data)
          .set('message', payload.message)
      }
      break;
    }

    case GET_POST_ERROR: {
      const { payload } = action
      return state
        .set('postPhase', ERROR)
        .set('error', payload.message) 
    }

    case UPDATE_POST: {
      return state
        .set('updatePostPhase', LOADING)
        .set('error', null)
        .set('isSubmitting', true)
    }

    case UPDATE_POST_SUCCESS: {
      const { payload } = action
      if(payload.status){
        return state
          .set('updatePostPhase', SUCCESS)
          .set('updatePostMessage', payload.message)
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
      if(payload.status){
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
      if(payload.status){
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

 		default: {
      		return state
    	}
 	}
 }

 /***********************************
 * Action Creators
 ***********/ 

export const createPost = credentials => {
  return {
    type: CREATE_POST,
    payload: credentials
  }
}

export const getPosts = credentials => {
  return {
    type: GET_POST,
    payload: credentials
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

/***********************************
 * Epics
 ***********************************/

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
    return fromPromise(api.getPosts(action.payload)).pipe(
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
  createPostEpic,
  getPostEpic,
  updatePostEpic,
  getPostByIdEpic,
  deletePostEpic
)