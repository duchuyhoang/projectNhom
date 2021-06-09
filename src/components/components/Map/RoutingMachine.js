import React, { useEffect } from "react";
import { MapContainer, useMap } from 'react-leaflet'
import L from "leaflet";
import "leaflet-routing-machine";
import "./Routing.css"

export default function Routing({currentLocation,targetLocation,setTargetLocation}) {
    const map = useMap();

    // const callback = (err, route) => {
    //     console.log(route)
    // }


    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(currentLocation.latitude,currentLocation.longtitue), L.latLng(null, null)],
            routeWhileDragging: true,
        }).addTo(map);

        routingControl.on("routesfound",(e)=>{
            console.log(e);
        })



        return () => map.removeControl(routingControl);
    }, [map]);

    return null;
}