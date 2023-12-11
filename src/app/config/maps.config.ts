export const mapsConfig: {
    options: google.maps.MapOptions,
    coordinates: Record<'sportshome' | 'a-field' | 'b-field' | 'sportshome-kalchreuth' | 'sportshome-dormitz' | 'sportshome-hetzles' | 'sportshome-neunkirchen', google.maps.LatLngLiteral>
} = {
    options: {
        clickableIcons: false,
        mapTypeId: 'hybrid',
        maxZoom: 20,
        minZoom: 5,
        scrollwheel: false,
        zoom: 14
    },
    coordinates: {
        'sportshome': {
            lat: 49.59228025815224,
            lng: 11.157803435569505
        },
        'a-field': {
            lat: 49.59270166222209,
            lng: 11.158047221011378
        },
        'b-field': {
            lat: 49.589930544472566,
            lng: 11.162866292827417
        },
        'sportshome-kalchreuth': {
            lat: 49.55236954458859,
            lng: 11.115464955698698
        },
        'sportshome-dormitz': {
            lat: 49.59098304622465,
            lng: 11.127452383515601
        },
        'sportshome-hetzles': {
            lat: 49.64027911186147,
            lng: 11.127319731667896
        },
        'sportshome-neunkirchen': {
            lat: 49.61467348027749,
            lng: 11.130279166892937
        }
    }
}
