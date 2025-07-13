document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('userName');
    const getBlessingBtn = document.getElementById('getBlessingBtn');
    const blessingTextOutput = document.getElementById('blessingText');
    const blessingGifOutput = document.getElementById('blessingGif');
    const userNameInTitle = document.getElementById('userNameInTitle');
    const shareLinkContainer = document.getElementById('shareLinkContainer');
    const shareLinkInput = document.getElementById('shareLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // Array of "bigg blessings" - each includes [NAME] placeholder 3 times
    const bigBlessings = [
        {
            text: `महादेव की कृपा आप पर [NAME] सदैव बनी रहे। आपके जीवन में सुख, शांति और समृद्धि की वर्षा हो, [NAME]। हर बाधा दूर हो, और आप [NAME] हमेशा खुश रहें। हर हर महादेव!
            \n\n
            May Lord Mahadev's grace always be upon you, [NAME]. May joy, peace, and prosperity shower upon your life, [NAME]. May every obstacle be removed, and may you, [NAME], always be happy. Har Har Mahadev!`,
            gif: "assets/blessing1.gif"
        }
        // You can add more blessings here following the same structure, e.g., blessing2.gif for the next one
        // {
        //     text: `ओम नमः शिवाय! [NAME], शिव जी का आशीर्वाद आपके हर कदम पर साथ रहे। आपकी सभी इच्छाएं पूरी हों, [NAME] और आपका जीवन प्रकाश से भर जाए, [NAME]। जय भोलेनाथ!
        //     \n\n
        //     Om Namah Shivaya! [NAME], may Lord Shiva's blessings be with your every step. May all your wishes come true, [NAME] and may your life be filled with light, [NAME]. Jai Bholenath!`,
        //     gif: "assets/blessing2.gif"
        // },
        // {
        //     text: `जय महाकाल! [NAME], आप पर महाकाल की कृपा से हर संकट टल जाए। आपका स्वास्थ्य उत्तम रहे, [NAME], और आपको हर क्षेत्र में सफलता मिले, [NAME]। बम बम भोले!
        //     \n\n
        //     Jai Mahakal! [NAME], by the grace of Mahakal, may every crisis be averted from you. May your health be excellent, [NAME], and may you achieve success in every field, [NAME]. Bam Bam Bhole!`,
        //     gif: "assets/blessing3.gif"
        // }
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
        // Select a blessing (you can implement rotation or randomness here)
        const selectedBlessing = bigBlessings[currentBlessingIndex % bigBlessings.length];
        // If you add more blessings to the array and want to rotate them:
        // currentBlessingIndex = (currentBlessingIndex + 1) % bigBlessings.length;

        // Replace [NAME] with the user's name three times
        const blessedText = selectedBlessing.text.replace(/\[NAME\]/g, nameToBless);
        blessingTextOutput.innerHTML = blessedText.replace(/\n/g, '<br>'); // Replace newlines with <br> for HTML

        blessingGifOutput.src = selectedBlessing.gif;
        blessingGifOutput.alt = `Mahadev Blessing for ${nameToBless}`;

        // Generate and display shareable link
        const currentUrl = new URL(window.location.origin + window.location.pathname);
        currentUrl.searchParams.set('name', encodeURIComponent(nameToBless)); // Add name as query parameter, encode for special characters
        shareLinkInput.value = currentUrl.toString();
        shareLinkContainer.style.display = 'block';
    }


    // --- On Page Load ---

    // 1. Check for name in URL query parameter (for shared links)
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromUrl = urlParams.get('name');

    if (nameFromUrl) {
        const decodedName = decodeURIComponent(nameFromUrl);
        userNameInput.value = decodedName; // Populate input field with URL name
        displayBlessing(decodedName);
        updateHeaderUserName(decodedName);
        localStorage.setItem('blessedUserName', decodedName); // Store it for future visits
    } else {
        // 2. Check for name in localStorage (for returning users)
        const storedName = localStorage.getItem('blessedUserName');
        if (storedName) {
            userNameInput.value = storedName; // Populate input field with stored name
            updateHeaderUserName(storedName);
            // Optionally, auto-display blessing for returning user
            // displayBlessing(storedName);
        }
    }


    // --- Event Listeners ---

    if (getBlessingBtn) {
        getBlessingBtn.addEventListener('click', () => {
            const name = userNameInput.value.trim();
            if (name) {
                localStorage.setItem('blessedUserName', name); // Store name
                updateHeaderUserName(name); // Update header
                displayBlessing(name); // Display the blessing
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
