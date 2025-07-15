document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    // Blessing data (No changes here, already correct)
    const blessingTexts = [
        "जय खेशवर! महादेव आपके जीवन को सुख, शांति और समृद्धि से भर दें। हर हर महादेव!",
        "महादेव आपके सभी दुखों को दूर करें और आपके जीवन को आनंद से भर दें। ओम नमः शिवाय!",
        "शिव की जोत आपकी जीवन को नये प्रकाश की तरह चमका दे और अंधकार को दूर करे। जय भोलेनाथ!",
        "भोलेनाथ का आशीर्वाद आपके हर कार्य में सफलता दिलाए और आपको अपार शक्ति प्रदान करे। हर हर महादेव!",
        "देवाधिदेव महादेव की कृपा से आपका घर सुख-समृद्धि से भरा रहे और सभी संकट दूर हों। ओम नमः शिवाय!",
        "ओम नमः शिवाय! महादेव की असीम कृपा आप पर बनी रहे और आपकी सभी मनोकामनाएं पूर्ण हों।",
        "आपकी सभी मनोकामनाएं पूर्ण हों, महादेव का आशीर्वाद सदा आपके साथ है। हर हर महादेव!",
        "महाकाल का आशीर्वाद आपको शक्ति और धैर्य प्रदान करे, और आपको हर चुनौती का सामना करने में मदद करे। जय महाकाल!",
        "महादेव के आशीर्वाद से आपका जीवन खुशियों और सकारात्मकता से भरा रहे। जय शिव शंकर!",
        "भगवान शिव का आशीर्वाद आपको आध्यात्मिक शांति और आंतरिक शक्ति प्रदान करे। ओम नमः शिवाय!"
    ];

    const blessingGifPaths = [
        "assets/blessing0.gif",
        "assets/blessing1.gif",
        "assets/blessing2.gif",
        "assets/blessing3.gif",
        "assets/blessing4.gif",
        "assets/blessing5.gif",
        "assets/blessing6.gif",
        "assets/blessing7.gif",
        "assets/blessing8.gif",
        "assets/blessing9.gif"
    ];

    // --- Logic for index.html (Main Page) ---
    if (currentPage === '' || currentPage === 'index.html') {
        const senderNameInput = document.getElementById('senderNameInput');
        const openGiftBtn = document.getElementById('openGiftBtn');

        if (openGiftBtn) {
            openGiftBtn.addEventListener('click', () => {
                const nameEntered = senderNameInput.value.trim();
                const encodedName = encodeURIComponent(nameEntered || 'प्रिय भक्त'); // Default to 'प्रिय भक्त' if no name
                // When "Open Gift" is clicked on index.html, it sends the name to receiver.html
                window.location.href = `receiver.html?name=${encodedName}`;
            });
        }
    }

    // --- Logic for sender.html (Send Blessing Page) ---
    else if (currentPage === 'sender.html') {
        const senderNameInput = document.getElementById('senderNameInput');
        const generateLinkBtn = document.getElementById('generateLinkBtn');
        const shareLinkSection = document.getElementById('shareLinkSection');
        const generatedLinkInput = document.getElementById('generatedLinkInput');
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        const whatsappShareBtn = document.getElementById('whatsappShareBtn');
        const facebookShareBtn = document.getElementById('facebookShareBtn');

        if (generateLinkBtn) {
            generateLinkBtn.addEventListener('click', () => {
                const senderName = senderNameInput.value.trim();
                const selectedBlessing = document.querySelector('input[name="blessingChoice"]:checked');

                if (senderName && selectedBlessing) {
                    const blessingId = selectedBlessing.value;
                    const encodedSenderName = encodeURIComponent(senderName);

                    // For sender page, generate a link for general recipient (no specific receiver name)
                    const blessingLink = `${window.location.origin}/receiver.html?sender=${encodedSenderName}&blessingId=${blessingId}`;

                    generatedLinkInput.value = blessingLink;
                    shareLinkSection.style.display = 'block'; // Share section ko visible karein

                    // Update share buttons with the new link and text
                    const whatsappText = `आपको ${senderName} की ओर से महादेव का आशीर्वाद मिला है! इसे खोलने के लिए यहां क्लिक करें: ${blessingLink}`;
                    whatsappShareBtn.href = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

                    const facebookText = `मैंने ${senderName} की ओर से आपको महादेव का आशीर्वाद भेजा है!`;
                    facebookShareBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blessingLink)}&quote=${encodeURIComponent(facebookText)}`;

                } else {
                    alert('कृपया अपना नाम दर्ज करें और एक आशीर्वाद चुनें।');
                }
            });
        }

        if (copyLinkBtn) {
            copyLinkBtn.addEventListener('click', () => {
                generatedLinkInput.select();
                document.execCommand('copy');
                alert('लिंक कॉपी हो गया है! | Link copied!');
            });
        }
    }

    // --- Logic for receiver.html (Blessing Display Page) ---
    else if (currentPage === 'receiver.html') {
        const countdownSection = document.getElementById('countdownSection');
        const countdownDisplay = document.getElementById('countdownDisplay');
        const blessingDisplaySection = document.getElementById('blessingDisplaySection');
        const personalizedBlessingTitle = document.getElementById('personalizedBlessingTitle');
        const blessingTextOutput = document.getElementById('blessingText');
        const blessingGif = document.getElementById('blessingGif');
        const receiverPageTitle = document.getElementById('receiverPageTitle');

        const urlParams = new URLSearchParams(window.location.search);
        // Receiver name for receiver.html, or 'प्रिय भक्त' if not specified from index.html
        const receiverName = urlParams.get('name') || 'प्रिय भक्त';
        // Sender name from link generated via sender.html, or 'महादेव' default
        const senderName = urlParams.get('sender') || 'महादेव';
        let blessingId = urlParams.get('blessingId');

        // Update HTML document title (browser tab title)
        if (receiverPageTitle) {
            receiverPageTitle.textContent = `${receiverName} के लिए आशीर्वाद | Blessing for ${receiverName}`;
        }

        let countdown = 10; // 10 seconds countdown

        function updateCountdown() {
            if (countdown > 0) {
                countdownDisplay.textContent = countdown;
                countdown--;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownSection.style.display = 'none'; // Hide countdown
                displayBlessing(receiverName, senderName, blessingId); // Show blessing
            }
        }

        function displayBlessing(receiver, sender, id) {
            blessingDisplaySection.style.display = 'block'; // Show blessing section

            // Determine blessing ID: use provided ID or a random one
            const finalBlessingId = (id !== null && id >= 0 && id < blessingTexts.length) ? parseInt(id) : Math.floor(Math.random() * blessingTexts.length);

            const finalBlessingText = blessingTexts[finalBlessingId];
            const finalBlessingGifPath = blessingGifPaths[finalBlessingId];

            personalizedBlessingTitle.innerHTML = `महादेव का आशीर्वाद ${receiver} के लिए<br>(${sender} की ओर से)`;
            blessingTextOutput.innerHTML = finalBlessingText;
            blessingGif.src = finalBlessingGifPath;
        }

        // Start countdown only if on receiver.html
        updateCountdown();
    }
});
