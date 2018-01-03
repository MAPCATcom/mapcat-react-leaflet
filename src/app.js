import React from 'react';
import styles from './app.css';
import { Map, TileLayer } from 'react-leaflet';
import mapviewinit from '../node_modules/@mapcat/mapview-init/src/mapcat-mapview-init.js';


const position = [51.5, 0];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      loading: false,
      isError: false,
      eMsg: ''
    }
  }

  getViewUrl() {
    return new Promise((resolve, reject) => {
      mapviewinit.initRasterView('jM9oGlsfWxOOYYF0kvuq2UbYl3XrVuUzJmwfnB6M', null, null, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.getViewUrl().then( url => {
      this.setState({
        url: url,
        loading: false
      });
    }).catch( error => {
      console.log(error);
      let eMsg = '';
      if (error.message) {
        eMsg = error.message;
      } else {
        eMsg = String(error);
      }
      this.setState({
        loading: false,
        isError: true,
        eMsg: eMsg
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h4>Loading...</h4>
    }
    if (this.state.isError) {
      return <h4>Failed to load map. Error: {this.state.eMsg}</h4>
    }
    return (
      <div className={styles.map}>
        <Map center={position} zoom={13}>
          <TileLayer
            url={this.state.url}
            attribution='Imagery &copy; 2017 <a href="http://mapcat.com">MapCat</a>, Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a contributors'
          />
        </Map>
      </div>
    )
  }
}
