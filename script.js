document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const urlParams = new URLSearchParams(window.location.search);

    // Blessing data (Now includes mixed Hindi and English blessings)
    const blessingTexts = [
        "जय खेशवर! महादेव आपके जीवन को सुख, शांति और समृद्धि से भर दें। हर हर महादेव!",
        "May Mahadev remove all sorrow and bring you divine peace. Om Namah Shivaya!",
        "शिव की जोत आपकी जीवन को नये प्रकाश की तरह चमका दे और अंधकार को दूर करे। जय भोलेनाथ!",
        "May Lord Shiva's blessings bring you success in all endeavors and grant you immense strength. Har Har Mahadev!",
        "देवाधिदेव महादेव की कृपा से आपका घर सुख-समृद्धि से भरा रहे और सभी संकट दूर हों। ओम नमः शिवाय!",
        "Om Namah Shivaya! May Mahadev's infinite grace be with you and fulfill all your wishes.",
        "आपकी सभी मनोकामनाएं पूर्ण हों, महादेव का आशीर्वाद सदा आपके साथ है। हर हर महादेव!",
        "May the blessings of Mahakal grant you strength and patience to face every challenge. Jai Mahakal!",
        "महादेव के आशीर्वाद से आपका जीवन खुशियों और सकारात्मकता से भरा रहे। जय शिव शंकर!",
        "May the blessings of Lord Shiva grant you spiritual peace and inner strength. Om Namah Shivaya!"
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

    // --- Logic for index.html (Main Page / Entry for receiving gifts) ---
    if (currentPage === '' || currentPage === 'index.html') {
        const userNameInput = document.getElementById('userNameInput');
        const getBlessingBtn = document.getElementById('getBlessingBtn');
        const mainPageTitle = document.getElementById('mainPageTitle');
        
        const senderNameFromURL = urlParams.get('sender');
        const blessingIdFromURL = urlParams.get('blessingId');

        // If 'sender' and 'blessingId' parameters are present in URL, redirect to receiver.html
        if (senderNameFromURL && blessingIdFromURL !== null) {
            // Update title for shared link landing page
            if (mainPageTitle) {
                mainPageTitle.textContent = `क्या काशी गिफ्ट भेजा है? - From ${decodeURIComponent(senderNameFromURL)}`;
            }
            // Redirect to receiver.html with all parameters
            window.location.replace(`receiver.html?sender=${senderNameFromURL}&blessingId=${blessingIdFromURL}`);
            return; // Stop further execution on this page
        } else {
            // If no shared link parameters, show the normal index.html content for self-blessing
            if (mainPageTitle) {
                mainPageTitle.textContent = `महादेव आशीर्वाद | Mahadev Blessing`;
            }
            // No need to explicitly set homePageGreeting/Subtext as they are static in HTML
        }

        if (getBlessingBtn) {
            getBlessingBtn.addEventListener('click', () => {
                const nameEntered = userNameInput.value.trim();
                const encodedName = encodeURIComponent(nameEntered || 'प्रिय भक्त'); // Default to 'प्रिय भक्त'
                // Redirect to receiver.html with only the receiver's name for self-blessing
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

                    // Generate a link that will land on receiver.html (or index.html which redirects to receiver.html)
                    const blessingLink = `${window.location.origin}/receiver.html?sender=${encodedSenderName}&blessingId=${blessingId}`;

                    generatedLinkInput.value = blessingLink;
                    shareLinkSection.style.display = 'block'; // Make share section visible

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

        // Get parameters from URL
        const receiverName = urlParams.get('name') || 'प्रिय भक्त'; // From index.html (self-blessing)
        const senderName = urlParams.get('sender') || 'महादेव'; // From sender.html (shared blessing)
        let blessingId = urlParams.get('blessingId'); // From sender.html (shared blessing)

        // Update HTML document title (browser tab title)
        if (receiverPageTitle) {
            if (urlParams.has('sender')) { // If it's a shared link, show sender name in title
                receiverPageTitle.textContent = `क्या काशी गिफ्ट भेजा है? - From ${decodeURIComponent(senderName)}`;
            } else { // If it's self-blessing from index.html, show receiver name
                receiverPageTitle.textContent = `${receiverName} के लिए आशीर्वाद | Blessing for ${receiverName}`;
            }
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

            // Determine blessing ID: use provided ID or a random one if not valid
            const finalBlessingId = (id !== null && id >= 0 && id < blessingTexts.length) ? parseInt(id) : Math.floor(Math.random() * blessingTexts.length);

            const finalBlessingText = blessingTexts[finalBlessingId];
            const finalBlessingGifPath = blessingGifPaths[finalBlessingId];

            // Personalize blessing title: If sender is 'महादेव', don't explicitly say 'की ओर से'
            let titleSenderPart = '';
            if (sender !== 'महादेव') {
                titleSenderPart = `<br>(${decodeURIComponent(sender)} की ओर से)`;
            }
            personalizedBlessingTitle.innerHTML = `महादेव का आशीर्वाद ${decodeURIComponent(receiver)} के लिए${titleSenderPart}`;
            blessingTextOutput.innerHTML = finalBlessingText;
            blessingGif.src = finalBlessingGifPath;
        }

        // Start countdown only if on receiver.html
        updateCountdown();
    }
});
                
