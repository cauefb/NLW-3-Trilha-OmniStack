import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map,Marker, TileLayer,Popup  } from "react-leaflet";
import Leaflet from "leaflet";

import "leaflet/dist/leaflet.css";

import { FiPlus, FiArrowRight } from "react-icons/fi";

import "../styles/pages/orphanages-map.css";

import mapMarkerImg from "../images/map-marker.svg";
import api from "../services/api";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize:[58,68],
  iconAnchor:[29,68],
  popupAnchor:[170,2]
});

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}


function OrphanagesMap() {
  const [orphanages,setOrphanages] = useState<Orphanage[]>([]);
  useEffect(() =>{
      api.get('orphanages').then(response =>{
         setOrphanages(response.data);
      })
  }, []);


  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas criaças estão esperando sua visita :</p>
        </header>

        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.6110644, -46.4767199]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      
    {orphanages.map(orphanage =>{
      return(
              <Marker
          icon={mapIcon} 
         position={[orphanage.latitude, orphanage.longitude]} 
         key={orphanage.id}
         >
          <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
           {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF"/>
            </Link>
        </Popup>  
        </Marker>
      )
    })}
 
</Map>
      <Link to="orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
