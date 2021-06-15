import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import React, { useEffect, useRef, useMemo ,useState} from 'react';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { SVGIcon } from '@Components/shared/SvgIcon/Icon';
import Routing from "./RoutingMachine";
import { useLocationNameByCoordinate } from "@Core/hooks/useLocationNameByCoordinate";
import "./Map.css"


const SearchField = ({ setTargetLocation }) => {
    const map = useMap();
    const provider = new OpenStreetMapProvider(
        {
            params: {
                email: "huyhoang10032000@gmail.com",
            },
        });

    const searchControl = new GeoSearchControl({
        style: 'button',
        position: "topleft",
        showMarker: false,
        autoClose: true,
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

        const resetButton = searchControl.resetButton
        resetButton.addEventListener("click", () => {
            setTargetLocation({ latitude: null, longtitude: null });
        })

        map.addControl(searchControl);

        // location update
        map.on('geosearch/showlocation', (e) => {
            setTargetLocation({ latitude: e.location.y, longtitude: e.location.x });
        });

        return () => {
            map.removeControl(searchControl);
            resetButton.removeEventListener("click", () => {
                setTargetLocation({ latitude: null, longtitude: null });
            })
        };
    }, [])

    return null;
}


const ClickLocation = ({ setTargetLocation }) => {
    const map = useMapEvents({
        click: (e) => {
            setTargetLocation({ latitude: e.latlng.lat, longtitude: e.latlng.lng })
        },
        locationfound: (location) => {
        }
    })




    return (<div></div>);

}


function CurrentLocation({ setTargetLocation }) {
    const map = useMap()

    useEffect(() => {
        map.on("locationfound", (e) => {
            setTargetLocation({ latitude: e.latlng.lat, longtitude: e.latlng.lng })
        })

        return () => {
            map.off("locationfound");
        }

    }, [map])


    return (
        <div className="currentLocationIcon">
            <SVGIcon name="currentLocation" onClick={(e) => { 
                e.stopPropagation()
                map.locate() }} />
        </div>
    )
}




export const Map = ({ isRoute = true,
    defaultTarget = { latitude: 21.046816934751238, longtitude: 105.79207492501563 }, currentTarget, setCurrentTarget }) => {
    const markerRef = useRef(null)
const [distance,setDistance]=useState(null);


    const defaultTargetName = useLocationNameByCoordinate({ ...currentTarget, open: !isRoute });

    const setTargetLocation = ({ latitude = null, longtitude = null }) => {
        setCurrentTarget({ latitude, longtitude })
    }

    const eventHandlers = useMemo(
        () => ({
            dragend(dragendEvent) {
                const marker = markerRef.current
                if (marker != null) {
                    setCurrentTarget({ latitude: marker._latlng.lat, longtitude: marker._latlng.lng });
                }
            },
        }),
        [],
    )

    return (
        <MapContainer center={[defaultTarget.latitude, defaultTarget.longtitude]} zoom={13} scrollWheelZoom={true}>
            <SearchField setTargetLocation={setTargetLocation} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* For user select a place only */}
            {!isRoute && <Marker draggable={true} position={currentTarget.latitude !== null ?
                [currentTarget.latitude, currentTarget.longtitude] :
                [defaultTarget.latitude, defaultTarget.longtitude]}
                ref={markerRef}
                eventHandlers={eventHandlers}
            >
                <Popup>{defaultTargetName}</Popup>
            </Marker>}

            {/* For guest open to view how far from etc and view place */}
            {isRoute &&
                <Routing currentLocation={defaultTarget} targetLocation={currentTarget} setLocation={(distance)=>{
                    setDistance(distance)
                }}/>}


            <CurrentLocation setTargetLocation={setTargetLocation} />
            <ClickLocation setTargetLocation={setTargetLocation} />
            <div className={`distanceModal ${distance ? "distanceModalActive" : "" }`}>{distance} km</div>
        </MapContainer>
    )
}



