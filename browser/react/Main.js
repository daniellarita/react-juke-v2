import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import Album from './SingleAlbum';
import axios from 'axios';

export default class extends React.Component {
  constructor(){
    super();
    this.state = {
      albums: [],
      selectedAlbum: {}
    };
    this.selectAlbum = this.selectAlbum.bind(this);
  }

  componentDidMount(){
    axios.get('/api/albums')
    .then(res => {
      return res.data;
    })
    .then(albumsFromServer => {
      albumsFromServer = albumsFromServer.map(album => {
        album.imageUrl = `/api/albums/${album.id}/image`;
        return album;
      });
      this.setState({ albums: albumsFromServer });
    });
  }

  selectAlbum(albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => {
        this.setState({ selectedAlbum: album });
      });
  }

  render(){
    const album = <Album selectedAlbum={this.state.selectedAlbum}/>;
    const albumList = <Albums
      albums={this.state.albums}
      handleClick={this.selectAlbum}
      />
      const albumIsSelected = this.state.selectedAlbum.id;
    return(
      <div id="main" className="container-fluid">
        <Sidebar />
        { albumIsSelected ? album : albumList }
        <Footer />
      </div>
    );
  }
}
