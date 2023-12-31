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

        function capitalizeFirstLetter(string) {
            if (!string) return string;
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        document.getElementById('amenity').textContent = restaurantData.amenity ? capitalizeFirstLetter(restaurantData.amenity) : 'Suburb Address not available';
        
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
         if (!mymap) {
            mymap = L.map('map').setView([latitude, longitude], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mymap);
            L.marker([latitude, longitude]).addTo(mymap);
        } else {
            // If the map is already initialized, just update its view and marker
            mymap.setView([latitude, longitude], 13);
            L.marker([latitude, longitude]).addTo(mymap);
        }
    } else {
        // Handle the case where no data is found (e.g., display a message)
        console.log("No restaurant data found in local storage.");
    }

});



$(function(){

    $('.dropdown-item').click(function(){
      var value = $(this).data('value');
      $('.form-control').val(value);
    });
    
  });

  document.getElementById('review-button').addEventListener('click', function() {
    const reviewContainer = document.getElementById('review-container');

    // Create a textarea for the review
    const textArea = document.createElement('textarea');
    textArea.placeholder = 'Write your review here...';
    textArea.id = 'review-text'; // Assign an ID for easy retrieval
    reviewContainer.appendChild(textArea);

    const storedData = localStorage.getItem('selectedRestaurant');
    const restaurantData = storedData ? JSON.parse(storedData) : {};

    const existingReviewsStr = localStorage.getItem('userReviews');
    const existingReviews = existingReviewsStr ? JSON.parse(existingReviewsStr) : [];




    // Create a select dropdown for the score
    const scoreSelect = document.createElement('select');
    scoreSelect.id = 'review-score'; // Assign an ID for easy retrieval
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        scoreSelect.appendChild(option);
    }
    reviewContainer.appendChild(scoreSelect);

    // Add a submit button for the review
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Review';
    submitButton.addEventListener('click', function() {
        // Retrieve review text and selected score
        
        const reviewText = textArea.value;
        const reviewScore = scoreSelect.value;

        // Create a review object
        const newReview = {
            restaurantName: restaurantData.name || 'Name not available',
            restaurantAddress: restaurantData.address || 'Address not available',
            text: reviewText,
            score: reviewScore,
            timestamp: new Date().toISOString() // Optional: to keep track of when the review was submitted
        };

        // Save the review in localStorage
         existingReviews.push(newReview);

    // Save the updated reviews array back to local storage
    localStorage.setItem('userReviews', JSON.stringify(existingReviews));

        // Provide feedback to the user
        document.getElementById('feedbackModalBody').textContent = 'Review submitted successfully!';
        $('#feedbackModal').modal('show');

        // Disable the review button and submission button
        document.getElementById('review-button').disabled = true;
        submitButton.disabled = true;

        // Optionally, clear the textarea and reset the score selection
        textArea.value = '';
        scoreSelect.value = '1';
    });
    reviewContainer.appendChild(submitButton);

    // Disable the review button after clicking
    this.disabled = true;
});


document.getElementById('rec-friend-button').addEventListener('click', function() {
    const shareContainer = document.getElementById('share-container');

    // Create a text input for the friend's username
    const usernameInput = document.createElement('input');
    usernameInput.placeholder = 'Enter your friend\'s username';
    usernameInput.id = 'friend-username'; // Assign an ID for easy retrieval
    usernameInput.type = 'text';
    shareContainer.appendChild(usernameInput);

    // Create a textarea for the message
    const messageTextArea = document.createElement('textarea');
    messageTextArea.placeholder = 'Write your message here...';
    messageTextArea.id = 'share-message'; // Assign an ID for easy retrieval
    shareContainer.appendChild(messageTextArea);

    // Add a submit button for sharing
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share with Friend';
    shareButton.addEventListener('click', function() {
        // Retrieve username and message
        const friendUsername = usernameInput.value;
        const shareMessage = messageTextArea.value;

        // Logic to handle sharing (e.g., saving, sending to server, etc.)
        // ...

        document.getElementById('feedbackModalBody').textContent = 'Shared successfully with ' + friendUsername + '!';
    $('#feedbackModal').modal('show');

        // Disable the share button and submission button
        document.getElementById('share-button').disabled = true;
        shareButton.disabled = true;

        // Optionally, clear the input fields
        usernameInput.value = '';
        messageTextArea.value = '';
    });
    shareContainer.appendChild(shareButton);

    // Disable the share button after clicking
    this.disabled = true;
});