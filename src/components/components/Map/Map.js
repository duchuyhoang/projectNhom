import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import React, { useEffect } from 'react';
import styled from "styled-components";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import Routing from "./RoutingMachine";


const SearchField = () => {
    const provider = new OpenStreetMapProvider(
        {
            params: {
                email: "huyhoang10032000@gmail.com",
            },
        });

    const searchControl = new GeoSearchControl({
        style: 'button',
        position: "topleft",
        notFoundMessage: "Không tìm thấy...",
        classNames: {
            container: "searchContainer",
            form: "formSearch",
            input: "inputSearch",
            resetButton: "resetButton",
        },
        provider: provider,
    });

    useEffect(() => {
        map.on('geosearch/showlocation', (e) => {
            console.log("e", e);
        });
    })



    const map = useMap();
    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, [])

    return null;
}



import "./Map.css"

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}




export const Map = ( {isRoute = true, defaultTarget = { latitude: 21.046816934751238, longtitue: 105.79207492501563 } }, currentTarget, setCurrentTarget) => {
    return (
        <MapContainer center={[defaultTarget.latitude, defaultTarget.longtitue]} zoom={13} scrollWheelZoom={true}>
            <SearchField />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {!isRoute && <Marker position={[21.046816934751238, 105.79207492501563]}>
                <Popup>A pretty CSS3 popup. <br /> Easily customizable.</Popup>
            </Marker>}

            {isRoute && <Routing currentLocation={defaultTarget} targetLocation={currentTarget} setTargetLocation={() => { setCurrentTarget() }} />}
            <MyComponent />
        </MapContainer>
    )
}



