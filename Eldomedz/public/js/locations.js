// Initialize and add the map
function initMap() {
 
  const centerLocation = { lat: -1.286389, lng: 36.817223 }; 

  // Create a map object
  const map = new google.maps.Map(document.getElementById("mapContainer"), {
      zoom: 10,
      center: centerLocation,
  });

  // Marker for the center location
  const marker = new google.maps.Marker({
      position: centerLocation,
      map: map,
      title: "Your Location",
  });
}

// Load the map when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  initMap();
});
