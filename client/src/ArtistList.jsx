import React from 'react';

const ArtistList = props => {
  let artists;
  if (props.artists.length) {
    artists = props.artists.map((artist, index) => {
      return <div class='artistwrap'>
                <p className="artistrow" key={index}>{artist.name}</p>
                <p className="artistrow" key={index}><span>From: </span>{artist.origin}</p>
              </div>
    })
  } else {
    //No data yet
    artists = <p>No Artist Data!</p>
  }
  return (
    <div className="ArtistList">
      <h3>All the Artists:</h3>
      {artists}
      <hr/>
      <form onSubmit={props.handleSubmit}>
        <input onChange={props.handleArtistNameChange} type="text" name="name" value={props.name} placeholder="Enter Artist Name..." />
        <input onChange={props.handleArtistOriginChange} type="text" name="origin" value={props.origin} placeholder="Enter Artist Origin..." />
        <input onChange={props.handleArtistYearsActiveChange} type="text" name="yearsActive" value={props.yearsActive} placeholder="Enter Artist Years Active..." />
        <input type="submit" value="Add Artist" />
      </form>
    </div>
  )
}

export default ArtistList;