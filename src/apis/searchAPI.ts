import axios from 'axios';

const searchAPI = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoiamVpZzEzIiwiYSI6ImNsMHY4ODd3azExenczaXJwNTNndjR6Y20ifQ.vOi67-BkhUSrixhESSZHew',
    }
})

export default searchAPI;