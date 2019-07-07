Clone this project

Create a GoogleAPI key from developers.google console and create a project in the console and enable the GeoCoding API, Maps Javascript API, Places API

Step 1:
Go into the cloned project directory and in cmd in the map directory type

npm install

In the "map/src/Map.js" file
Set your API key in Geocode.setApiKey( "*********************" );
and in the googleMapURL="https://maps.googleapis.com/maps/api/js?key=&libraries=places"

Step 2:
To run the server 

npm start 

Step 3:
Open  localhost:3000


