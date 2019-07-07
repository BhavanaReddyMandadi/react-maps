import React, { Component } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap,  InfoWindow, Marker } from 'react-google-maps';
import Geocode from "react-geocode";
import './Map.css';

Geocode.setApiKey( "AIzaSyCKKcbPlfzVqLNfgjgg2kzZzldekrnED_Q" );
Geocode.enableDebug();

class Map extends Component {

constructor( props ){
  super( props );
  this.state = {
   address: '',
   city: '',
   zip: '',
   state: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
   },
   markerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
}
  }
 }
 componentDidMount() {
  Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     zip = this.getZip( addressArray ),
     state = this.getState( addressArray );
  
    this.setState( {
     address: ( address ) ? address : '',
     city: ( city ) ? city : '',
     zip: ( zip ) ? zip : '',
     state: ( state ) ? state : '',
    } )
   },
   error => {
    console.error(error);
   }
  );
 };

 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.zip !== nextState.zip   ||
   this.state.state !== nextState.state
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }

 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'locality' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };

 getZip = ( addressArray ) => {
  let zip = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'postal_code' === addressArray[ i ].types[0] ) {
    zip = addressArray[ i ].long_name;
    return zip;
   }
  }
 };



 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].short_name;
     return state;
    }
   }
  }
 };

 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };

 onInfoWindowClose = ( event ) => {
};

 onMarkerDragEnd = ( event ) => {
  let newLat = event.latLng.lat(),
   newLng = event.latLng.lng(),
   addressArray = [];
   Geocode.fromLatLng( newLat , newLng ).then(
   response => {
    const address = response.results[0].formatted_address,
     addressArray =  response.results[0].address_components,
     city = this.getCity( addressArray ),
     zip = this.getZip( addressArray ),
     state = this.getState( addressArray );
     this.setState( {
     address: ( address ) ? address : '',
     city: ( city ) ? city : '',
     zip: ( zip ) ? zip : '',
     state: ( state ) ? state : ''
    } )
   },
   error => {
    console.error(error);
   }
  );
 };
 
 onPlaceSelected = ( place ) => {
const address = place.formatted_address,
   addressArray =  place.address_components,
   city = this.getCity( addressArray ),
   zip = this.getZip( addressArray ),
   state = this.getState( addressArray ),
   latValue = place.geometry.location.lat(),
   lngValue = place.geometry.location.lng();
  this.setState({
   address: ( address ) ? address : '',
   zip: ( zip ) ? zip : '',
   city: ( city ) ? city : '',
   state: ( state ) ? state : '',
   markerPosition: {
    lat: latValue,
    lng: lngValue
   },
   mapPosition: {
    lat: latValue,
    lng: lngValue
   },
  })
 };



render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
     <Marker google={this.props.google}
       name={'Goodville Mutual Casualty Company'}
          draggable={true}
          onDragEnd={ this.onMarkerDragEnd }
             position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
      />
      <Marker />
      <InfoWindow
       onClose={this.onInfoWindowClose}
       position={{ lat: ( this.state.markerPosition.lat + 0.001), lng: this.state.markerPosition.lng }}
      >
       <div className = "info"> 
        <span style={{ padding: 0, margin: 0}}>{ this.state.address }</span>
       </div>
      </InfoWindow>
</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
     <div className = "mapform">
     <div className="form">
       <label htmlFor="">Address:</label>
       <input type="text" name="address" className="form" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
      <div className="form">
       <label htmlFor="">City:</label>
       <input type="text" name="city" className="form" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
      </div>
      <div className="form">
       <label htmlFor="">ZipCode:</label>
       <input type="text" name="zip" className="form" onChange={ this.onChange } readOnly="readOnly" value={ this.state.zip }/>
      </div>
      <div className="form">
       <label htmlFor="">State:</label>
       <input type="text" name="state" className="form" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
      </div>  
     </div>
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKKcbPlfzVqLNfgjgg2kzZzldekrnED_Q&libraries=places"
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `100%` }} />
      }
     />
    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map





