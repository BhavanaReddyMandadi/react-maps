import React, { Component } from 'react';
import Map from './Map';



class App extends Component {
  render() {
  return (
    <div style = {{ margin : '10px' , border : '10px'}}>
      <Map
        google={this.props.google}
        zoom={16}
        height = '500px'
        center={{
         lat: 40.096990,
         lng: -76.108740
        }}
       />
    </div>
    
  );
  }
}


export default App;
