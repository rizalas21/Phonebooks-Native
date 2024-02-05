import { legacy_createStore, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import rootreducer from './src/reducers'

export const store = legacy_createStore(rootreducer, applyMiddleware(thunk))