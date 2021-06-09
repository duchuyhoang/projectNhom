import React, { useEffect } from "react";
import { useMap } from 'react-leaflet'
import Flag from "@Assets/mapIcon/flag.png";
import Placeholder from "@Assets/mapIcon/placeholder.png";
import L from "leaflet";
import { useLocationNameByCoordinate } from "@Core/hooks/useLocationNameByCoordinate";
import { decimalAdjust } from "@Ultis/round";
import "leaflet-routing-machine";
import "./Routing.css"



export default function Routing({ currentLocation, targetLocation, setLocation }) {
    const map = useMap();

    const currentLocationName = useLocationNameByCoordinate({ ...currentLocation, open: true })
    const targetLocationName = useLocationNameByCoordinate({ ...targetLocation, open: true });

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints:[L.latLng(currentLocation.latitude, currentLocation.longtitude),L.latLng(targetLocation.latitude, targetLocation.longtitude)],

            createMarker: (index, waypoint, n) => {
                return (L.marker({ lat: waypoint.latLng.lat, lng: waypoint.latLng.lng }, {
                    draggable: index !== 0,
                    title: index === 0 ? currentLocationName : targetLocationName,
                    icon: index === 0 ? new L.Icon({
                        iconUrl: Flag,
                        className: "flagIcon"
                    }) : new L.Icon({
                        iconUrl: Placeholder,
                        className: "flagIcon"
                    })
                }));
            },

            routeWhileDragging: true,
        }).addTo(map);

        // get distance
        routingControl.on("routesfound", (e) => {

            setLocation(parseFloat(e.routes[0].summary.totalDistance / 1000).toFixed(2))
        })



        return () => map.removeControl(routingControl);
    }, [targetLocation, map, currentLocationName, targetLocationName]);

    return null;
}