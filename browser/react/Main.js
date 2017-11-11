import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Albums from './Albums';
import Album from './SingleAlbum';
import axios from 'axios';

const audio = document.createElement('audio');

export default class extends React.Component {
  constructor(){
    super();
    this.state = {
      albums: [],
      selectedAlbum: {}
    };
    this.selectAlbum = this.selectAlbum.bind(this);
    this.showAlbums = this.showAlbums.bind(this);
    this.start = this.start.bind(this);
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
        album.imageUrl = `/api/albums/${album.id}/image`;
        this.setState({ selectedAlbum: album });
      });
  }

  showAlbums(){
    this.setState({ selectedAlbum: {} });
  }

  start (songId) {
    console.log(songId)
    axios.get(`api/songs/${songId}/audio`)
      .then(res => {
        console.log(res,"audio for correct song")
      })
    // audio.src = 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3';
    // audio.load();
    // audio.play();
  }

  render(){
    const album = <Album
      selectedAlbum={this.state.selectedAlbum}
      start={this.start}
    />;
    const albumList = <Albums
      albums={this.state.albums}
      handleClick={this.selectAlbum}
      />
      const albumIsSelected = this.state.selectedAlbum.id;
    return(
      <div id="main" className="container-fluid">
        <Sidebar
          handleClick={this.showAlbums}
        />
        { albumIsSelected ? album : albumList }
        <Footer />
      </div>
    );
  }
}
