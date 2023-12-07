document.addEventListener('DOMContentLoaded', function() {
    const reviewsSection = document.getElementById('reviews-section');

    // Retrieve the stored reviews array from local storage
    const storedReviewsStr = localStorage.getItem('userReviews');
    if (storedReviewsStr) {
        const storedReviews = JSON.parse(storedReviewsStr);

        // Loop through each review and display it
        storedReviews.forEach((review, index) => {
            const reviewCard = document.createElement('li');
            reviewCard.className = 'list-group-item';

            reviewCard.innerHTML = `
            <div class="review-card">
            <h4>${review.restaurantName}</h4>
            <p>${review.restaurantAddress}</p>
            <p>Review: ${review.text}</p>
            <p>Score: ${review.score} / 5</p>
            <p>Submitted on: ${new Date(review.timestamp).toLocaleString()}</p>
            <button class="share-button" id="share-button" data-index="${index}">Share to a friend</button>
            <div class="share-container" id="share-container-${index}" style="display: none;"></div>
            </div>
            `;
            reviewsSection.appendChild(reviewCard);

            reviewCard.querySelector('.share-button').addEventListener('click', function() {
                const buttonIndex = this.getAttribute('data-index');
                const shareContainer = document.getElementById(`share-container-${buttonIndex}`);
                
                // Clear previous content and create new input elements
                shareContainer.innerHTML = '';

                // Create a text input for the friend's username
                const usernameInput = document.createElement('input');
                usernameInput.placeholder = 'Enter your friend\'s username';
                usernameInput.type = 'text';
                shareContainer.appendChild(usernameInput);

                // Create a textarea for the message
                const messageTextArea = document.createElement('textarea');
                messageTextArea.placeholder = 'Write your message here...';
                shareContainer.appendChild(messageTextArea);

                // Create a submit button for sharing
                const shareButton = document.createElement('button');
                shareButton.textContent = 'Share with Friend';
                shareButton.addEventListener('click', function() {
                    // Logic to handle sharing
                    const friendUsername = usernameInput.value;

                    // Update the modal content with the username
                    document.getElementById('feedbackModalBody').textContent = 'Shared successfully with ' + friendUsername + '!';
                    $('#feedbackModal').modal('show');
                    // Clear the input fields
                    usernameInput.value = '';
                    messageTextArea.value = '';
                });
                shareContainer.appendChild(shareButton);

                // Show the share container
                shareContainer.style.display = 'block';
            });
        });
    } else {
        reviewsSection.textContent = 'No reviews available.';
    }
});

