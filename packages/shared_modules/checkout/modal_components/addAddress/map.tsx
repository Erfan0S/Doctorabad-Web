"use client";

import React from "react";
import { MapComponent, MapTypes } from "@neshan-maps-platform/mapbox-gl-react";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import { useEffect, useRef, useState } from "react";
import { isServerSide } from "@repo/core/constants/constants";
import { useFormikContext } from "formik";
import { ShippingAddress } from "@repo/core/types/cart";

const Map = () => {
  const { setValues, values } = useFormikContext<ShippingAddress>();

  const [mapInstance, setMapInstance] = useState<any>(null);
  const prevMarker = useRef<any>();

  useEffect(() => {
    const addMarker = (lat: number, lng: number) => {
      let marker = new nmp_mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(mapInstance);
      if (prevMarker.current) prevMarker.current.remove();
      prevMarker.current = marker;
    };

    if (mapInstance) {
      mapInstance.addControl(
        new nmp_mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },

          trackUserLocation: true,

          showUserHeading: true,
        })
      );
      if (values.latitude && values.longitude) {
        addMarker(values.latitude, values.longitude);
      }
      mapInstance.on("click", (event: any) => {
        const { lat, lng } = event.lngLat;

        // @ts-ignore
        addMarker(lat, lng);

        setValues((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapInstance, setValues]);

  if (isServerSide) return null;

  return (
    <>
      <MapComponent
        mapSetter={(e) => {
          setMapInstance(e);
        }}
        options={{
          mapKey: "web.25bd3d6c30ff4cf8a8171283624126f2",
          mapTypeControllerOptions: { show: false, position: "bottom-left" },
          mapType: MapTypes.neshanRaster,
          zoom: 15,
          center:
            values.latitude && values.longitude
              ? [values.longitude, values.latitude]
              : [51.3347, 35.7219],
        }}
      />
    </>
  );
};

export default Map;
