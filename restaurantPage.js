// -----------------This parses the data into restaurantPage.html--------------------

document.addEventListener("DOMContentLoaded", function () {
  const storedData = localStorage.getItem("selectedRestaurant");

  if (storedData) {
    const restaurantData = JSON.parse(storedData);
    console.log("Parsed data:", restaurantData);
    document.getElementById("restaurantName").textContent =
      restaurantData.name || "Name not available";
    document.getElementById("restaurantAddress").textContent =
      restaurantData.address || "Address not available";
    const cuisineElements = document.querySelectorAll(".cuisine");
    cuisineElements.forEach((element) => {
      element.textContent = restaurantData.cuisine || "Cuisine not available";
    });
    document.getElementById("amenity").textContent =
      restaurantData.amenity || "Suburb Address not available";

    const websiteElements = document.querySelectorAll(".website a");
    websiteElements.forEach((element) => {
      if (restaurantData.website) {
        element.href = restaurantData.website;
        element.textContent = restaurantData.website;
        element.target = "_blank";
      } else {
        element.textContent = "Website not available";
        element.removeAttribute("href");
      }
    });

    document.getElementById("hours").textContent =
      restaurantData.openingHours || "Hours not available";
    document.getElementById("phone").textContent =
      restaurantData.phoneNum || "Suburb Address not available";
    document.getElementById("wheelchair").textContent =
      restaurantData.wheelchair;

    let latitude = restaurantData.latitude;
    let longitude = restaurantData.longitude;
    var mymap = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mymap);
    L.marker([latitude, longitude]).addTo(mymap);
  } else {
    console.log("No restaurant data found in local storage.");
  }
});

$(function () {
  $(".dropdown-item").click(function () {
    var value = $(this).data("value");
    $(".form-control").val(value);
  });
});

document.getElementById("review-button").addEventListener("click", function () {
  const reviewContainer = document.getElementById("review-container");

  const textArea = document.createElement("textarea");
  textArea.placeholder = "Write your review here...";
  textArea.id = "review-text";
  reviewContainer.appendChild(textArea);

  const storedData = localStorage.getItem("selectedRestaurant");
  const restaurantData = storedData ? JSON.parse(storedData) : {};

  const existingReviewsStr = localStorage.getItem("userReviews");
  const existingReviews = existingReviewsStr
    ? JSON.parse(existingReviewsStr)
    : [];

  // Create a select dropdown for the score
  const scoreSelect = document.createElement("select");
  scoreSelect.id = "review-score";
  for (let i = 1; i <= 5; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    scoreSelect.appendChild(option);
  }
  reviewContainer.appendChild(scoreSelect);

  // Add a submit button for the review
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Review";
  submitButton.addEventListener("click", function () {
    const reviewText = textArea.value;
    const reviewScore = scoreSelect.value;

    // Create a review object
    const newReview = {
      restaurantName: restaurantData.name || "Name not available",
      restaurantAddress: restaurantData.address || "Address not available",
      text: reviewText,
      score: reviewScore,
      timestamp: new Date().toISOString(),
    };

    // Save the review in localStorage
    existingReviews.push(newReview);

    // Save the updated reviews array back to local storage
    localStorage.setItem("userReviews", JSON.stringify(existingReviews));

    // Provide feedback to the user
    alert("Review submitted successfully!");

    // Disable the review button and submission button
    document.getElementById("review-button").disabled = true;
    submitButton.disabled = true;

    // Optionally, clear the textarea and reset the score selection
    textArea.value = "";
    scoreSelect.value = "1";
  });
  reviewContainer.appendChild(submitButton);

  // Disable the review button after clicking
  this.disabled = true;
});
