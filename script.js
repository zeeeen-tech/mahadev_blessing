document.addEventListener('DOMContentLoaded', () => {
    // --- UI Element References ---
    const senderNameInput = document.getElementById('senderName');
    const receiverNameInput = document.getElementById('receiverName');
    const blessingChoices = document.querySelectorAll('input[name="blessingChoice"]');
    const generateBlessingBtn = document.getElementById('generateBlessingBtn'); // Renamed button ID
    const blessingTextOutput = document.getElementById('blessingText');
    const blessingGifOutput = document.getElementById('blessingGif');
    const receiverNameInTitle = document.getElementById('receiverNameInTitle'); // Changed name
    const senderNameDisplay = document.getElementById('senderNameDisplay'); // New element
    const personalizedReceiverTitle = document.getElementById('personalizedReceiverTitle'); // New element
    const shareLinkContainer = document.getElementById('shareLinkContainer');
    const shareLinkInput = document.getElementById('shareLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // Section containers to show/hide
    const senderInputArea = document.getElementById('senderInputArea');
    const receiverDisplayArea = document.getElementById('receiverDisplayArea');
    const countdownContainer = document.getElementById('countdownContainer');
    const countdownDisplay = document.getElementById('countdown');

    // --- Blessing Data ---
    const bigBlessings = [
        {
            text: `महादेव की कृपा आप पर [RECEIVER_NAME] सदैव बनी रहे। आपके जीवन में सुख, शांति और समृद्धि की वर्षा हो, [RECEIVER_NAME]। हर बाधा दूर हो, और आप [RECEIVER_NAME] हमेशा खुश रहें। हर हर महादेव!
            \n\n
            May Lord Mahadev's grace always be upon you, [RECEIVER_NAME]. May joy, peace, and prosperity shower upon your life, [RECEIVER_NAME]. May every obstacle be removed, and may you, [RECEIVER_NAME], always be happy. Har Har Mahadev!`,
            gif: "assets/blessing1.gif"
        },
        {
            text: `[SENDER_NAME] की ओर से [RECEIVER_NAME] के लिए विशेष आशीर्वाद। महादेव आपको बल, बुद्धि और समृद्धि प्रदान करें। आपके सभी कष्टों का निवारण हो, [RECEIVER_NAME]। शुभ हो!
            \n\n
            A special blessing from [SENDER_NAME] for [RECEIVER_NAME]. May Mahadev grant you strength, wisdom, and prosperity. May all your troubles be resolved, [RECEIVER_NAME]. Be well!`,
            gif: "assets/blessing2.gif"
        },
        {
            text: `महादेव का दिव्य प्रकाश [RECEIVER_NAME] के जीवन को प्रकाशित करे। [SENDER_NAME] आपके लिए सुख और शांति की कामना करते हैं। हर क्षण शुभ हो, हर इच्छा पूरी हो।
            \n\n
            May Mahadev's divine light illuminate [RECEIVER_NAME]'s life. [SENDER_NAME] wishes you happiness and peace. May every moment be auspicious, and every wish be fulfilled.`,
            gif: "assets/blessing3.gif"
        }
        // Add more blessing objects here as needed, make sure to add corresponding GIFs
    ];

    // --- Helper Functions ---

    // Function to update the main title with the receiver's name
    function updateReceiverNameInTitle(name) {
        if (receiverNameInTitle) {
            receiverNameInTitle.textContent = name ? `(${name})` : '';
        }
    }

    // Function to display sender's name prominently
    function updateSenderNameDisplay(name) {
        if (senderNameDisplay) {
            if (name) {
                senderNameDisplay.innerHTML = `आप भेज रहे हैं: <span style="color:#FFF;">${name}</span> | You are sending: <span style="color:#FFF;">${name}</span>`;
                senderNameDisplay.style.display = 'block';
            } else {
                senderNameDisplay.style.display = 'none';
            }
        }
    }

    // Function to display personalized receiver title
    function updatePersonalizedReceiverTitle(senderName, receiverName) {
        if (personalizedReceiverTitle) {
            if (senderName && receiverName) {
                personalizedReceiverTitle.innerHTML = `<span style="color:#FFD700;">${senderName}</span> का आशीर्वाद आपके लिए, <span style="color:#FFD700;">${receiverName}</span>!<br>
                                                 <span style="color:#FFD700;">${senderName}</span>'s blessing for you, <span style="color:#FFD700;">${receiverName}</span>!`;
                personalizedReceiverTitle.style.display = 'block';
            } else {
                personalizedReceiverTitle.style.display = 'none';
            }
        }
    }

    // Function to display a blessing based on ID and names
    function displayBlessing(receiverName, senderName, blessingId) {
        const selectedBlessing = bigBlessings[blessingId];
        if (!selectedBlessing) {
            console.error("Invalid blessing ID:", blessingId);
            // Fallback to a default blessing if ID is invalid
            selectedBlessing = bigBlessings[0];
            blessingId = 0;
        }

        let blessedText = selectedBlessing.text.replace(/\[RECEIVER_NAME\]/g, receiverName);
        blessedText = blessedText.replace(/\[SENDER_NAME\]/g, senderName);
        blessingTextOutput.innerHTML = blessedText.replace(/\n/g, '<br>');

        blessingGifOutput.src = selectedBlessing.gif;
        blessingGifOutput.alt = `महादेव आशीर्वाद GIF | Mahadev Blessing GIF for ${receiverName}`;

        // Ensure receiver display area is visible
        receiverDisplayArea.style.display = 'block';
        shareLinkContainer.style.display = 'block'; // Ensure share link container is shown

        // Generate and display shareable link
        const currentUrl = new URL(window.location.origin + window.location.pathname);
        currentUrl.searchParams.set('receiver', encodeURIComponent(receiverName));
        currentUrl.searchParams.set('sender', encodeURIComponent(senderName));
        currentUrl.searchParams.set('blessingId', blessingId);
        shareLinkInput.value = currentUrl.toString();
    }

    // Function to handle the countdown and then display blessing
    function startBlessingCountdown(receiverName, senderName, blessingId) {
        let timeLeft = 10;
        countdownDisplay.textContent = timeLeft;
        countdownContainer.style.display = 'block'; // Show countdown container

        // Hide main input/receiver areas
        senderInputArea.style.display = 'none';
        receiverDisplayArea.style.display = 'none'; // Hide receiver area during countdown
        senderNameDisplay.style.display = 'none'; // Hide prominent sender name during countdown
        personalizedReceiverTitle.style.display = 'none'; // Hide title during countdown

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownContainer.style.display = 'none'; // Hide countdown container

                // Display personalized title
                updatePersonalizedReceiverTitle(senderName, receiverName);
                // Display the blessing after countdown
                displayBlessing(receiverName, senderName, blessingId);
            }
        }, 1000); // Every 1 second
    }


    // --- Page Load Logic ---

    const urlParams = new URLSearchParams(window.location.search);
    const receiverNameFromUrl = urlParams.get('receiver');
    const senderNameFromUrl = urlParams.get('sender');
    const blessingIdFromUrl = parseInt(urlParams.get('blessingId') || '0', 10); // Default to 0 if not present

    if (receiverNameFromUrl && senderNameFromUrl) {
        // This is the RECEIVER'S VIEW (shared link)
        const decodedReceiverName = decodeURIComponent(receiverNameFromUrl);
        const decodedSenderName = decodeURIComponent(senderNameFromUrl);

        receiverNameInput.value = decodedReceiverName; // Populate input fields
        senderNameInput.value = decodedSenderName; // For sender input section, if ever shown

        updateReceiverNameInTitle(decodedReceiverName); // Update main header
        updateSenderNameDisplay(decodedSenderName); // Update prominent sender name (will be hidden during countdown)

        // Start countdown for received blessings
        startBlessingCountdown(decodedReceiverName, decodedSenderName, blessingIdFromUrl);

    } else {
        // This is the SENDER'S INITIAL VIEW (no URL params)
        senderInputArea.style.display = 'block'; // Show sender input area
        receiverDisplayArea.style.display = 'none'; // Hide receiver area
        countdownContainer.style.display = 'none'; // Hide countdown

        // Pre-fill sender name from localStorage if exists
        const storedSenderName = localStorage.getItem('senderName');
        if (storedSenderName) {
            senderNameInput.value = storedSenderName;
            updateSenderNameDisplay(storedSenderName); // Show prominent sender name
        }
        // Pre-fill receiver name from localStorage if exists
        const storedReceiverName = localStorage.getItem('receiverName');
        if (storedReceiverName) {
            receiverNameInput.value = storedReceiverName;
        }
    }


    // --- Event Listeners ---

    if (generateBlessingBtn) {
        generateBlessingBtn.addEventListener('click', () => {
            const senderName = senderNameInput.value.trim();
            const receiverName = receiverNameInput.value.trim();
            let selectedBlessingId = 0; // Default to first blessing

            // Get selected blessing ID
            for (const choice of blessingChoices) {
                if (choice.checked) {
                    selectedBlessingId = parseInt(choice.value, 10);
                    break;
                }
            }

            if (senderName && receiverName) {
                localStorage.setItem('senderName', senderName); // Store sender's name
                localStorage.setItem('receiverName', receiverName); // Store receiver's name

                updateReceiverNameInTitle(receiverName); // Update main header with receiver's name
                updateSenderNameDisplay(senderName); // Update prominent sender name

                // Start countdown to display the blessing and share link
                startBlessingCountdown(receiverName, senderName, selectedBlessingId);
            } else {
                alert('कृपया अपना और प्राप्तकर्ता का नाम दर्ज करें! | Please enter both your name and the receiver\'s name!');
            }
        });
    }

    // Update prominent sender name as user types
    if (senderNameInput) {
        senderNameInput.addEventListener('input', () => {
            const name = senderNameInput.value.trim();
            updateSenderNameDisplay(name);
        });
    }


    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            shareLinkInput.select();
            shareLinkInput.setSelectionRange(0, 99999); // For mobile devices
            try {
                document.execCommand('copy');
                alert('लिंक कॉपी हो गया है! | Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text:', err);
                alert('लिंक कॉपी नहीं हो सका। कृपया मैन्युअल रूप से कॉपी करें। | Failed to copy link. Please copy manually.');
            }
        });
    }
});
                                                        
