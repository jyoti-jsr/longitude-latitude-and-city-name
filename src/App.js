import "./styles.css";
import { useState, useEffect } from "react";
import axois from "axios";

export default function App() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
          axois
            .get(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}longitude=${position.coords.longitude}&localityLanguage=en`
            )
            .then((res) => {
              console.log(res.data);
              setData(res.data);
            })
            .catch((error) => console.log(error));
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      {/* <button onClick={getLocation}>Get Location</button> */}
      <h1>Coordinates</h1>
      <p>{status}</p>
      {lat && <p>Latitude: {lat}</p>}
      {lng && <p>Latitude: {lng}</p>}
      {data && <p>location : {data.city}</p>}
    </div>
  );
}
