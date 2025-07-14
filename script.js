document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const getBlessingBtn = document.getElementById('getBlessingBtn');
    const blessingTextOutput = document.getElementById('blessingText');
    const blessingGifOutput = document.getElementById('blessingGif');
    const userNameInTitle = document.getElementById('userNameInTitle');
    const shareLinkContainer = document.getElementById('shareLinkContainer');
    const shareLinkInput = document.getElementById('shareLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // New countdown elements
    const countdownContainer = document.getElementById('countdownContainer');
    const countdownDisplay = document.getElementById('countdown');


    // Array of "bigg blessings" - each includes [NAME] placeholder 3 times
    const bigBlessings = [
        {
            text: `महादेव की कृपा आप पर [NAME] सदैव बनी रहे। आपके जीवन में सुख, शांति और समृद्धि की वर्षा हो, [NAME]। हर बाधा दूर हो, और आप [NAME] हमेशा खुश रहें। हर हर महादेव!
            \n\n
            May Lord Mahadev's grace always be upon you, [NAME]. May joy, peace, and prosperity shower upon your life, [NAME]. May every obstacle be removed, and may you, [NAME], always be happy. Har Har Mahadev!`,
            gif: "assets/blessing1.gif"
        }
        // You can add more blessings here following the same structure
    ];

    let currentBlessingIndex = 0; // Or use a random index for each blessing generated


    // Function to update the title with the user's name
    function updateHeaderUserName(name) {
        if (userNameInTitle) {
            userNameInTitle.textContent = name ? `(${name})` : '';
        }
    }

    // Function to display a blessing
    function displayBlessing(nameToBless) {
        const selectedBlessing = bigBlessings[currentBlessingIndex % bigBlessings.length];

        const blessedText = selectedBlessing.text.replace(/\[NAME\]/g, nameToBless);
        blessingTextOutput.innerHTML = blessedText.replace(/\n/g, '<br>');

        blessingGifOutput.src = selectedBlessing.gif;
        blessingGifOutput.alt = `Mahadev Blessing for ${nameToBless}`;

        // Ensure the blessing output div is visible
        blessingTextOutput.parentElement.style.display = 'block'; // This targets the .blessing-output div

        // Generate and display shareable link
        const currentUrl = new URL(window.location.origin + window.location.pathname);
        currentUrl.searchParams.set('name', encodeURIComponent(nameToBless));
        shareLinkInput.value = currentUrl.toString();
        shareLinkContainer.style.display = 'block'; // Ensure share link container is shown
    }

    // Function to handle the countdown and then display blessing
    function startBlessingCountdown(name) {
        let timeLeft = 10;
        countdownDisplay.textContent = timeLeft;
        countdownContainer.style.display = 'block'; // Show countdown container

        // Hide blessing output and share link immediately when countdown starts
        blessingTextOutput.parentElement.style.display = 'none'; // Hide the parent .blessing-output div
        shareLinkContainer.style.display = 'none'; // Hide share link during countdown

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownContainer.style.display = 'none'; // Hide countdown container

                displayBlessing(name); // Display the blessing after countdown
                // The display: 'block' for blessing output and share link is now handled inside displayBlessing
            }
        }, 1000); // Every 1 second
    }


    // --- On Page Load ---

    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('name');

    if (nameFromUrl) {
        const decodedName = decodeURIComponent(nameFromUrl);
        userNameInput.value = decodedName;
        updateHeaderUserName(decodedName);
        localStorage.setItem('blessedUserName', decodedName);

        // Start countdown for URL blessings as well, for "surprise"
        startBlessingCountdown(decodedName);

    } else {
        const storedName = localStorage.getItem('blessedUserName');
        if (storedName) {
            userNameInput.value = storedName;
            updateHeaderUserName(storedName);
        }
    }


    // --- Event Listeners ---

    if (getBlessingBtn) {
        getBlessingBtn.addEventListener('click', () => {
            const name = userNameInput.value.trim();
            if (name) {
                localStorage.setItem('blessedUserName', name);
                updateHeaderUserName(name);
                startBlessingCountdown(name); // Start countdown on button click
            } else {
                alert('कृपया अपना नाम दर्ज करें / Please enter your name to receive a blessing!');
            }
        });
    }

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', () => {
            shareLinkInput.select();
            shareLinkInput.setSelectionRange(0, 99999); // For mobile devices
            try {
                document.execCommand('copy');
                alert('लिंक कॉपी हो गया है! / Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy text:', err);
                alert('लिंक कॉपी नहीं हो सका। कृपया मैन्युअल रूप से कॉपी करें। / Failed to copy link. Please copy manually.');
            }
        });
    }
});
        
