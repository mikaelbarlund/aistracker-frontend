import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkSetVesselList } from './store/vessels/thunks';
import { RootState } from './store';
import { MapContainer, TileLayer, Circle, Polyline, Tooltip } from 'react-leaflet';
import './App.css';
import L from 'leaflet';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkSetVesselList());
  }, []);

  const vessels = useSelector((state: RootState) => state.vessels.vessels);
  const myLocation = L.latLng( 60.16, 24.87);
  //navigator.geolocation.getCurrentPosition(function (position) {
  //    myLocation =L.latLng(position.coords.latitude, position.coords.longitude);
  //  console.log(myLocation);
  //});
  const blackOptions = { color: 'black', weight: 1 };
  
  const fillRedOptions = { color: 'red' };
  const fillOrangeOptions = { color: 'orange' };
  const fillYellowOptions = { color: 'yellow' };
  const fillGreenOptions = { color: 'green' };
  const fillBlueOptions = { color: 'blue' };

  return (
    <>
      <h1>Marine Traffic Tracks</h1>
      <MapContainer center={myLocation} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
        {vessels.map(v => {
          const line = v.features.map(f => { return { key: f._id, value: L.latLng(f.geometry.coordinates[1], f.geometry.coordinates[0]), feature: f }; });

          return line.map(a => {
            const visual = a.feature.properties.timestampExternal > Date.now() - (1 * 1000 * 60 * 60) ? { color: fillRedOptions, radius: 200 } :
              a.feature.properties.timestampExternal > Date.now() - (12 * 1000 * 60 * 60) ? { color: fillOrangeOptions, radius: 150 } :
                a.feature.properties.timestampExternal > Date.now() - (24 * 1000 * 60 * 60) ? { color: fillYellowOptions, radius: 100 } :
                  a.feature.properties.timestampExternal > Date.now() - (48 * 1000 * 60 * 60) ? { color: fillGreenOptions, radius: 50 } :
                    { color: fillBlueOptions, radius: 20 };
            return (
              <Circle key={`${a.feature._id}-circle`} center={a.value} pathOptions={visual.color} radius={visual.radius} >
                <Tooltip sticky>{new Date(a.feature.properties.timestampExternal).toLocaleString()}</Tooltip>
              </Circle>
            );
          });
        })
        }
        {vessels.map(v => {
          const line = v.features.sort((a, b) => a.properties.timestampExternal > b.properties.timestampExternal ? -1 : 1).map(f => { return L.latLng(f.geometry.coordinates[1], f.geometry.coordinates[0]); });
          return (
            <>
              <Polyline key={`${v._id}-line`} pathOptions={blackOptions} positions={line} />
              {v.features[0] !== undefined &&
                <Circle key={`${v._id}-ship`} center={L.latLng(v.features[0].geometry.coordinates[1], v.features[0].geometry.coordinates[0])} pathOptions={blackOptions} radius={400} >
                  <Tooltip direction="bottom" offset={[0, 20]} opacity={1} >
                    {`Name: ${v.name}`} <br />{`Destination: ${v.destination}`} <br /> {new Date(v.features[0].properties.timestampExternal).toLocaleString()}
                  </Tooltip>
                </Circle>
              }
            </>
          );
        })
        }
      </MapContainer>

    </>
  );
};

export default App;
