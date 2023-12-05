// -----------------This parses the data into restaurantPage.html--------------------

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the restaurant data from local storage
    const storedData = localStorage.getItem('selectedRestaurant');
    
    if (storedData) {
        // Parse the data back into an object
        const restaurantData = JSON.parse(storedData);
        console.log("Parsed data:", restaurantData);

        // Update your HTML elements with the data
        document.getElementById('restaurantName').textContent = restaurantData.name || 'Name not available';
        document.getElementById('restaurantAddress').textContent = restaurantData.address || 'Address not available';
        const cuisineElements = document.querySelectorAll('.cuisine');
            cuisineElements.forEach(element => {
            element.textContent = restaurantData.cuisine || 'Cuisine not available';
        });
        document.getElementById('amenity').textContent = restaurantData.amenity || 'Suburb Address not available';
        
        const websiteElements = document.querySelectorAll('.website a'); // Selecting the anchor tags
        websiteElements.forEach(element => {
            if (restaurantData.website) {
                element.href = restaurantData.website;
                element.textContent = restaurantData.website; // Or any other meaningful text
                element.target = "_blank"; // Optional: to open the link in a new tab
            } else {
                element.textContent = 'Website not available';
                element.removeAttribute('href'); // Remove the href attribute if the website is not available
              }
            }
        );
       
        document.getElementById('hours').textContent = restaurantData.openingHours || 'Hours not available';
        document.getElementById('phone').textContent = restaurantData.phoneNum || 'Suburb Address not available';
        document.getElementById('wheelchair').textContent = restaurantData.wheelchair;
       
        let latitude = restaurantData.latitude
        let longitude = restaurantData.longitude
         // document.getElementById('restaurantAddress').textContent = restaurantData.address || 'Address not available';
         var mymap = L.map('map').setView([latitude, longitude], 13); // Replace with actual restaurant coordinates
 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '© OpenStreetMap contributors'
        }).addTo(mymap);
 
     // Add a marker for the restaurant
        L.marker([latitude, longitude]).addTo(mymap); // Replace with actual restaurant coordinates
    
    } else {
        // Handle the case where no data is found (e.g., display a message)
        console.log("No restaurant data found in local storage.");
    }

});

document.getElementById('rec-friend-button').addEventListener('click', function() {
    // Create a temporary text element
    var textArea = document.createElement("textarea");
    textArea.value = window.location.href; // Assign the URL to the text area
    document.body.appendChild(textArea); // Append the text area to the document
    textArea.focus();
    textArea.select(); // Select the text

    try {
        // Copy the text inside the text field
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea); // Remove the temporary element
});

