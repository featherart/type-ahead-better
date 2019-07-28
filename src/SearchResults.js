import React from 'react'
import { componentFromStream } from 'recompose'
import { ajax } from 'rxjs/ajax'
import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  pluck,
  switchMap,
  tap
} from 'rxjs/operators'
import { BehaviorSubject, merge } from 'rxjs'
import { Loading } from './Loading'
import './index.css'

//const formatUrl = searchTerm => `https://api.github.com/search/repositories?q=${searchTerm}`

const formatUrl = searchTerm => `https://api.github.com/users/${searchTerm}`

const SearchResults = componentFromStream(prop$ => {
  const loading$ = new BehaviorSubject(false)
  const getResult$ = prop$.pipe(
    debounceTime(1000),
    pluck('searchTerm'),
    filter(searchTerm => searchTerm && searchTerm.length),
    map(formatUrl),
    tap(() => loading$.next(true)),
    switchMap(url =>
      ajax(url).pipe(
        pluck('response'),
        delay(1500),
        map(response => (
          <div key={response.id} className='search-results'>
            <h3>{response.login}</h3>
            <img src={response.avatar_url} alt={response.login} />
          </div>
        )),
        tap(() => loading$.next(false)),
        catchError(({ response }) => console.log(response.message))
    ))
  )
  return merge(loading$, getResult$).pipe(
    map(result => (result === true ? <Loading /> : result))
  )
})

export default SearchResults
