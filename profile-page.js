document.addEventListener('DOMContentLoaded', function() {
    const reviewsSection = document.getElementById('reviews-section');

    // Retrieve the stored reviews array from local storage
    const storedReviewsStr = localStorage.getItem('userReviews');
    if (storedReviewsStr) {
        const storedReviews = JSON.parse(storedReviewsStr);

        // Loop through each review and display it
        storedReviews.forEach(review => {
            const reviewCard = document.createElement('li');
            reviewCard.className = 'list-group-item';

            reviewCard.innerHTML = `
                <div class="review-card">
                    <h4>${review.restaurantName}</h4>
                    <p>${review.restaurantAddress}</p>
                    <p>Review: ${review.text}</p>
                    <p>Score: ${review.score} / 5</p>
                    <p>Submitted on: ${new Date(review.timestamp).toLocaleString()}</p>
                    <button id="share-button">Share to a friend</button>
                </div>
            `;
            reviewsSection.appendChild(reviewCard);
        });
    } else {
        reviewsSection.textContent = 'No reviews available.';
    }
});