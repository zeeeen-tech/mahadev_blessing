document.addEventListener('DOMContentLoaded', () => {
    const greetingMessage = document.getElementById('greetingMessage');
    const mahadevImage = document.getElementById('mahadevImage');
    const blessingText = document.getElementById('blessingText');
    const getBlessingBtn = document.getElementById('getBlessingBtn');
    const donateBtn = document.getElementById('donateBtn');
    const shareBlessingBtn = document.getElementById('shareBlessingBtn');

    // List of Mahadev Blessings
    const blessings = [
        "ॐ नमः शिवाय। महादेव की कृपा आप पर सदा बनी रहे।",
        "हर हर महादेव! आपका जीवन सुख, शांति और समृद्धि से भर जाए।",
        "भोलेनाथ आपकी सभी मनोकामनाएं पूर्ण करें।",
        "शिव शंभु! आपको शक्ति, ज्ञान और वैराग्य प्राप्त हो।",
        "ईश्वर आपको स्वस्थ, प्रसन्न और सफल बनाए रखें।",
        "महादेव की कृपा से आपके सभी कष्ट दूर हों।",
        "शिव जी का आशीर्वाद आपके साथ है, भयमुक्त रहें।",
        "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्॥ आपका जीवन मंगलमय हो।"
    ];

    // Array of Mahadev image paths (replace with your actual image paths)
    // Make sure these images exist in your project folder!
    const mahadevImages = [
        "mahadev_1.jpg",
        "mahadev_2.jpg",
        "mahadev_3.jpg",
        "mahadev_4.jpg"
    ];

    // Function to get query parameters from URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Initialize the greeting message with sender's name
    const senderName = getQueryParam('sender');
    if (senderName) {
        greetingMessage.textContent = `जय भोलेनाथ, ${senderName}!`;
    } else {
        greetingMessage.textContent = `जय भोलेनाथ!`;
    }

    // --- Button Event Listeners ---

    // 1. Blessings Prapt Karein Button
    getBlessingBtn.addEventListener('click', () => {
        console.log('Blessings Prapt Karein button clicked!');
        // Choose a random blessing
        const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
        blessingText.textContent = randomBlessing;
        blessingText.classList.remove('hidden'); // Show blessing text

        // Choose a random Mahadev image
        const randomImage = mahadevImages[Math.floor(Math.random() * mahadevImages.length)];
        mahadevImage.src = randomImage;
        mahadevImage.classList.remove('hidden'); // Show image

        // Optional: Scroll to blessing section
        blessingText.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // 2. Mahadev Ko Arpan Karein (Donation) Button
    donateBtn.addEventListener('click', () => {
        console.log('Donation button clicked!');
        alert('महादेव को अर्पण करने के लिए धन्यवाद! (यहां अपनी डोनेशन लिंक या फॉर्म जोड़ें)');
        // Yahan aap apni asli donation functionality add kar sakte hain.
        // Example: window.location.href = 'https://your-donation-link.com';
        // Or open a modal for payment: openDonationModal();
    });

    // 3. Aashirwad Share Karein Button
    shareBlessingBtn.addEventListener('click', () => {
        console.log('Share Blessing button clicked!');
        const shareText = `आपको महादेव का आशीर्वाद प्राप्त हुआ है: "${blessingText.textContent}". जय भोलेनाथ!`;
        const shareUrl = window.location.href; // Current page URL

        if (navigator.share) {
            navigator.share({
                title: 'महादेव का आशीर्वाद',
                text: shareText,
                url: shareUrl,
            })
            .then(() => console.log('Blessing shared successfully'))
            .catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback for browsers that do not support navigator.share
            alert('आशीर्वाद शेयर करें: इस आशीर्वाद को कॉपी करें और अपने दोस्तों को भेजें!\n\n' + shareText + '\n\nLink: ' + shareUrl);
            // Optionally, copy text to clipboard:
            // navigator.clipboard.writeText(shareText + ' ' + shareUrl).then(() => {
            //     alert('Blessing copied to clipboard!');
            // }).catch(err => {
            //     console.error('Could not copy text: ', err);
            // });
        }
    });

    // Initial state setup (if no blessing received yet)
    mahadevImage.classList.add('hidden');
    blessingText.classList.add('hidden');
});
