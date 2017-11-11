import React from 'react';

export default class extends React.Component {
  render(props){
    return (
      <div className="col-xs-10">
        <div className="albums">
          <h3>Albums</h3>
          <div className="row">
            <div> { this.props.albums.map((album,i) => {
              return (
                <div key={i} className="col-xs-4">
                  <a onClick={ () => this.props.handleClick(album.id, album.imageUrl) } className="thumbnail" href="#">
                    <img src= { album.imageUrl } />
                    <div className="caption">
                      <h5>
                        <span> { album.name }</span>
                      </h5>
                      <small> { album.songs.length }</small>
                    </div>
                  </a>
                </div>
              );
            })
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
