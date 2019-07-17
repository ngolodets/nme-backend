import React from 'react';
import axios from 'axios';
import './App.css';
import ArtistList from './ArtistList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artistName: '',
      artistOrigin: '',
      artistYearsActive: ''
    }
    this.handleArtistNameChange = this.handleArtistNameChange.bind(this);
    this.handleArtistOriginChange = this.handleArtistOriginChange.bind(this);
    this.handleArtistYearsActiveChange = this.handleArtistYearsActiveChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/artists', {
      name: this.state.artistName,
      origin: this.state.artistOrigin,
      yearsActive: this.state.artistYearsActive
    }).then((response) => {
      axios.get('/artists').then((response) => {
        this.setState({
          artists: response.data
        })
      })
    })
  }

  handleArtistNameChange(e) {
    this.setState({
      artistName: e.target.value
    })
  }
  
  handleArtistOriginChange(e) {
    this.setState({
      artistOrigin: e.target.value
    })
  }

  handleArtistYearsActiveChange(e) {
    this.setState({
      artistYearsActive: e.target.value
    })
  }

  componentDidMount() {
    axios.get('/artists')
    .then(res => {
      this.setState({
        artists: res.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <ArtistList artists={this.state.artists}
                    handleArtistNameChange={this.handleArtistNameChange}
                    handleArtistOriginChange={this.handleArtistOriginChange}
                    handleArtistYearsActiveChange={this.handleArtistYearsActiveChange}
                    name={this.state.artistName}
                    origin={this.state.artistOrigin}
                    yearsActive={this.state.artistYearsActive}
                    handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
