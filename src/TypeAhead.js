import React from 'react'
import { map, startWith, tap } from 'rxjs/operators'
import { combineLatest } from 'rxjs'
import { componentFromStream, createEventHandler } from 'recompose'
import './observableConfig'
import SearchResults from './SearchResults'

const TypeAhead = componentFromStream(prop$ => {
  const { handler, stream } = createEventHandler()

  const value$ = stream.pipe(
    map(e => e.target.value),
    startWith('')
  )

  return combineLatest(prop$, value$).pipe(
    tap(console.warn),
    map(([props, value]) => (
      <div className='search-container'>
        <input
          onChange={handler}
          placeholder='search ...'
          autoComplete='off'
          autoFocus
        />
        <SearchResults searchTerm={value} />
      </div>
    ))
  )
})

export default TypeAhead
