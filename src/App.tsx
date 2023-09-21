import React, { useEffect, useState } from "react";

function App() {
  const [myCoords, setMyCoords] = useState<GeolocationCoordinates[]>([]);
  const [geoState, setGeoState] = useState<boolean>(false);

  const geolocation = navigator.geolocation.watchPosition(
    ({ coords }) => {
      setMyCoords((prev) => {
        if (
          !prev.some(
            ({ latitude, longitude }) =>
              latitude === coords.latitude && longitude === coords.longitude
          )
        ) {
          return [...prev, coords];
        }
        return prev;
      });
    },
    (error) => {
      console.log("==========>error", error);
      setGeoState(true);
    }
  );

  useEffect(() => {
    return () => {
      navigator.geolocation.clearWatch(geolocation);
    };
  }, []);

  if (geoState) return <div>Ошибка получения координат</div>;

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>History My Coords</h1>
      <h2>Количество координат {myCoords.length}</h2>
      {myCoords.map(({ latitude, longitude }) => (
        <div style={{ marginBottom: "20px" }} key={`${latitude}_${longitude}`}>
          <div>Широта: {latitude}</div>
          <div>Долгота: {longitude}</div>
        </div>
      ))}
    </div>
  );
}

export default App;
