import axios from 'axios';

const directionsAPI = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoiamVpZzEzIiwiYSI6ImNsMHY4ODd3azExenczaXJwNTNndjR6Y20ifQ.vOi67-BkhUSrixhESSZHew',
    }
})

export default directionsAPI;