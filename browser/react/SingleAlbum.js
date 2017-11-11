import React from 'react';

export default class extends React.Component {

  render (props) {
    const album = this.props.selectedAlbum;
    return (
      <div className="col-xs-10">
        <div className="album">
          <div>
            <h3></h3>
            <img src= { album.imageUrl } />
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Artists</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              { album.songs.map(song => {
                return (
                  <tr key={song.id}>
                    <td>
                      <button onClick={() => this.props.start(song.id)} className="btn btn-default btn-xs">
                        <span className="glyphicon glyphicon-play"></span>
                      </button>
                    </td>
                    <td>{ song.name }</td>
                    <td>{
                      song.artists.map(artist => {
                        return (
                          <div key={artist.id}>{artist.name}</div>
                        );
                      })
                    }
                    </td>
                    <td>{ song.genre }</td>

                  </tr>
                );
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
