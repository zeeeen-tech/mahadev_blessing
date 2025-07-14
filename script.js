document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL BLESSING DATA ---
    const allBlessings = [
        {
            hindiText: `जय खेशवर! आपके जीवन की सारी कामनाओं और जय चेतना की धारा बनी रहे!
            <br><br>
            Jay Kheshwar! May the stream of all your life's desires and victorious consciousness flow on!`,
            englishText: `Jay Kheshwar! May the stream of all your life's desires and victorious consciousness flow on!`,
            gif: "assets/blessing1.gif"
        },
        {
            hindiText: `महादेव आपके सभी दुखों को दूर करें और आपको दिव्य शांति प्रदान करें।
            <br><br>
            May Mahadev remove all sorrow and bring you divine peace.`,
            englishText: `May Mahadev remove all sorrow and bring you divine peace.`,
            gif: "assets/blessing2.gif"
        },
        {
            hindiText: `शिव की जोत आपकी जीवन को नये प्रकाश की तरह चमका दे! हर हर महादेव!
            <br><br>
            May Shiva's light illuminate your life like a new dawn! Har Har Mahadev!`,
            englishText: `May Shiva's light illuminate your life like a new dawn! Har Har Mahadev!`,
            gif: "assets/blessing3.gif"
        },
        {
            hindiText: `भोलेनाथ का आशीर्वाद आपके हर कार्य में सफलता दिलाए।
            <br><br>
            May Bholenath's blessings bring success in all your endeavors.`,
            englishText: `May Bholenath's blessings bring success in all your endeavors.`,
            gif: "assets/blessing4.gif"
        },
        {
            hindiText: `देवाधिदेव महादेव की कृपा से आपका घर सुख-समृद्धि से भरा रहे।
            <br><br>
            May your home be filled with happiness and prosperity by the grace of Devadhidev Mahadev.`,
            englishText: `May your home be filled with happiness and prosperity by the grace of Devadhidev Mahadev.`,
            gif: "assets/blessing5.gif"
        },
        {
            hindiText: `ओम नमः शिवाय! महादेव की असीम कृपा आप पर बनी रहे।
            <br><br>
            Om Namah Shivaya! May Mahadev's infinite grace always be upon you.`,
            englishText: `Om Namah Shivaya! May Mahadev's infinite grace always be upon you.`,
            gif: "assets/blessing6.gif"
        },
        {
            hindiText: `आपकी सभी मनोकामनाएं पूर्ण हों, महादेव का आशीर्वाद सदा आपके साथ है।
            <br><br>
            May all your wishes be fulfilled, Mahadev's blessings are always with you.`,
            englishText: `May all your wishes be fulfilled, Mahadev's blessings are always with you.`,
            gif: "assets/blessing7.gif"
        },
        {
            hindiText: `महाकाल का आशीर्वाद आपको शक्ति और धैर्य प्रदान करे।
            <br><br>
            May Mahakal's blessings grant you strength and patience.`,
            englishText: `May Mahakal's blessings grant you strength and patience.`,
            gif: "assets/blessing8.gif"
        }
    ];

    // --- Helper Functions ---
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            receiverName: params.get('receiver') ? decodeURIComponent(params.get('receiver')) : null,
            senderName: params.get('sender') ? decodeURIComponent(params.get('sender')) : null,
            blessingId: params.get('blessingId') ? parseInt(params.get('blessingId'), 10) : null
        };
    }

    function updatePageTitle(titleElementId, text) {
        const titleElement = document.getElementById(titleElementId);
        if (titleElement) {
            titleElement.textContent = text;
        }
    }

    // --- Logic for index.html (Receiver's Home Page) ---
    const receiverHomePage = document.getElementById('receiverHomePage');
    if (receiverHomePage) {
        const receiverNameInput = document.getElementById('receiverNameInput');
        const openGiftBtn = document.getElementById('openGiftBtn');
        const senderNameInTitle = document.getElementById('senderNameInTitle'); // For "From [Sender Name]" in title

        const urlParams = getUrlParams();

        // If sender name is present in URL, update the main title
        if (urlParams.senderName) {
            updatePageTitle('pageTitle', `क्या काशी गिफ्ट भेजा है? - From ${urlParams.senderName}`);
            senderNameInTitle.textContent = `- From ${urlParams.senderName}`;
        } else {
             // Default title if no sender is specified (e.g., user just types site URL)
             updatePageTitle('pageTitle', 'महादेव आशीर्वाद | Mahadev Blessings');
             senderNameInTitle.textContent = ''; // Clear if no sender
        }

        // Try to pre-fill receiver name from local storage
        const storedReceiverName = localStorage.getItem('receiverName');
        if (storedReceiverName) {
            receiverNameInput.value = storedReceiverName;
        }

        openGiftBtn.addEventListener('click', () => {
            const receiverName = receiverNameInput.value.trim();
            if (receiverName) {
                localStorage.setItem('receiverName', receiverName); // Save for future use
                // Pass all parameters to receiver.html
                let redirectUrl = `receiver.html?receiver=${encodeURIComponent(receiverName)}`;
                if (urlParams.senderName) {
                    redirectUrl += `&sender=${encodeURIComponent(urlParams.senderName)}`;
                }
                if (urlParams.blessingId !== null) {
                    redirectUrl += `&blessingId=${urlParams.blessingId}`;
                }
                window.location.href = redirectUrl;
            } else {
                alert('कृपया अपना नाम दर्ज करें! | Please enter your name!');
            }
        });
    }

    // --- Logic for sender.html ---
    const senderInputArea = document.getElementById('senderInputArea');
    if (senderInputArea) {
        const senderNameInput = document.getElementById('senderNameInput');
        const receiverNameInput = document.getElementById('receiverNameInput');
        const blessingChoices = document.querySelectorAll('input[name="blessingChoice"]');
        const generateLinkBtn = document.getElementById('generateLinkBtn');
        const shareLinkSection = document.getElementById('shareLinkSection');
        const generatedLinkInput = document.getElementById('generatedLinkInput');
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        const whatsappShareBtn = document.getElementById('whatsappShareBtn');
        const facebookShareBtn = document.getElementById('facebookShareBtn');

        // Pre-fill names from local storage
        const storedSenderName = localStorage.getItem('senderName');
        if (storedSenderName) {
            senderNameInput.value = storedSenderName;
        }
        const storedReceiverName = localStorage.getItem('receiverName');
        if (storedReceiverName) {
            receiverNameInput.value = storedReceiverName;
        }

        generateLinkBtn.addEventListener('click', () => {
            const senderName = senderNameInput.value.trim();
            const receiverName = receiverNameInput.value.trim();
            let selectedBlessingId = null;

            for (const choice of blessingChoices) {
                if (choice.checked) {
                    selectedBlessingId = parseInt(choice.value, 10);
                    break;
                }
            }

            if (!senderName || !receiverName || selectedBlessingId === null) {
                alert('कृपया अपना और प्राप्तकर्ता का नाम दर्ज करें और एक आशीर्वाद चुनें! | Please enter both your name, receiver\'s name, and choose a blessing!');
                return;
            }

            localStorage.setItem('senderName', senderName);
            localStorage.setItem('receiverName', receiverName);

            // Construct the shareable URL for receiver.html
            const baseUrl = window.location.origin + '/receiver.html';
            const shareUrl = `${baseUrl}?receiver=${encodeURIComponent(receiverName)}&sender=${encodeURIComponent(senderName)}&blessingId=${selectedBlessingId}`;

            generatedLinkInput.value = shareUrl;
            shareLinkSection.style.display = 'block';
            senderInputArea.style.display = 'none'; // Hide sender input after generation

            // Set up share buttons
            const shareText = `महादेव का आशीर्वाद! ${senderName} ने आपके लिए एक खास गिफ्ट भेजा है, ${receiverName}! इसे खोलने के लिए क्लिक करें: ${shareUrl}`;
            const shareTextEnglish = `Mahadev's Blessing! ${senderName} has sent a special gift for you, ${receiverName}! Click to open: ${shareUrl}`;

            // WhatsApp Share
            whatsappShareBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

            // Facebook Share (using share dialog)
            facebookShareBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        });

        copyLinkBtn.addEventListener('click', () => {
            generatedLinkInput.select();
            generatedLinkInput.setSelectionRange(0, 99999); // For mobile devices
            try {
                document.execCommand('copy');
                alert('लिंक कॉपी हो गया है! | Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text:', err);
                alert('लिंक कॉपी नहीं हो सका। कृपया मैन्युअल रूप से कॉपी करें। | Failed to copy link. Please copy manually.');
            }
        });
    }

    // --- Logic for receiver.html ---
    const countdownSection = document.getElementById('countdownSection');
    const blessingDisplaySection = document.getElementById('blessingDisplaySection');
    if (countdownSection && blessingDisplaySection) {
        const countdownDisplay = document.getElementById('countdownDisplay');
        const personalizedBlessingTitle = document.getElementById('personalizedBlessingTitle');
        const blessingTextOutput = document.getElementById('blessingText');
        const blessingGifOutput = document.getElementById('blessingGif');

        const urlParams = getUrlParams();
        const receiverName = urlParams.receiverName;
        const senderName = urlParams.senderName;
        const blessingId = urlParams.blessingId;

        // Update page title
        if (receiverName && senderName) {
            updatePageTitle('receiverPageTitle', `${senderName} का आशीर्वाद आपके लिए, ${receiverName}!`);
        } else if (receiverName) {
            updatePageTitle('receiverPageTitle', `आपके लिए एक आशीर्वाद, ${receiverName}!`);
        }

        // Validate parameters
        if (!receiverName || !senderName || blessingId === null || blessingId < 0 || blessingId >= allBlessings.length) {
            // Fallback for invalid/missing parameters
            countdownSection.innerHTML = `<h2>त्रुटि: आशीर्वाद लोड नहीं हो सका। कृपया सही लिंक का उपयोग करें।</h2>
                                         <p>Error: Blessing could not be loaded. Please use a valid link.</p>
                                         <button class="btn" onclick="window.location.href='index.html'">मुख्य पृष्ठ पर जाएं | Go to Home Page</button>`;
            return;
        }

        // Start Countdown
        let timeLeft = 10;
        countdownDisplay.textContent = timeLeft;

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownSection.style.display = 'none'; // Hide countdown
                blessingDisplaySection.style.display = 'block'; // Show blessing

                const selectedBlessing = allBlessings[blessingId];
                let finalBlessingText = selectedBlessing.hindiText;

                // Replace placeholders in blessing text
                finalBlessingText = finalBlessingText.replace(/\[RECEIVER_NAME\]/g, receiverName);
                finalBlessingText = finalBlessingText.replace(/\[SENDER_NAME\]/g, senderName);

                blessingTextOutput.innerHTML = finalBlessingText;
                blessingGifOutput.src = selectedBlessing.gif;
                blessingGifOutput.alt = `Mahadev Blessing GIF for ${receiverName}`;

                personalizedBlessingTitle.innerHTML = `<span style="color:#FFD700;">${senderName}</span> का आशीर्वाद आपके लिए, <span style="color:#FFD700;">${receiverName}</span>!<br>
                                                 <span style="color:#FFD700;">${senderName}</span>'s Blessing for you, <span style="color:#FFD700;">${receiverName}</span>!`;
            }
        }, 1000); // Every 1 second
    }
});

                                                        
