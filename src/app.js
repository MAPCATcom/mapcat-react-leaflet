import React from 'react';
import styles from './app.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';


//const position = [51.505, -0.09];
const position = [47.1510, 19.0496];

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.map}>
        <Map center={position} zoom={13}>
          <TileLayer
            url='https://terkepem.hu/tile/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://mapcat.com">MapCat</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br />Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}

//            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//            url='https://terkepem.hu/tile/{z}/{x}/{y}.png'
