class LocationModel {
    static async getLocationsForMap() {
         return [
            { name: "Location 1", lat: 37.7749, lng: -122.4194 }, // Example coordinates
            { name: "Location 2", lat: 34.0522, lng: -118.2437 },
            
        ];
    }
}

module.exports = LocationModel;
