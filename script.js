document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Gets 'index.html', 'receiver.html', etc.

    // Common elements (agar sab pages pe hain)
    const mainHeaderTitle = document.getElementById('mainHeaderTitle');
    const receiverPageTitle = document.getElementById('receiverPageTitle'); // For receiver.html

    // Blessing data
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
        "assets/blessing4.gif", // Typos corrected: was 'blaching4.gif'
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
                const senderName = senderNameInput.value.trim();
                // Index page se click karne par, receiver.html par random blessing dikhegi.
                // Agar aap chahte hain ki yahan se bhi koi specific blessing jaye, toh logic change karna padega.
                window.location.href = 'receiver.html';
            });
        }
    }

    // --- Logic for sender.html (Send Blessing Page) ---
    else if (currentPage === 'sender.html') {
        const senderNameInput = document.getElementById('senderNameInput');
        const receiverNameInput = document.getElementById('receiverNameInput');
        const generateLinkBtn = document.getElementById('generateLinkBtn');
        const shareLinkSection = document.getElementById('shareLinkSection');
        const generatedLinkInput = document.getElementById('generatedLinkInput');
        const copyLinkBtn = document.getElementById('copyLinkBtn');
        const whatsappShareBtn = document.getElementById('whatsappShareBtn');
        const facebookShareBtn = document.getElementById('facebookShareBtn');

        if (generateLinkBtn) {
            generateLinkBtn.addEventListener('click', () => {
                const senderName = senderNameInput.value.trim();
                const receiverName = receiverNameInput.value.trim();
                const selectedBlessing = document.querySelector('input[name="blessingChoice"]:checked');

                if (senderName && receiverName && selectedBlessing) {
                    const blessingId = selectedBlessing.value;
                    const encodedSenderName = encodeURIComponent(senderName);
                    const encodedReceiverName = encodeURIComponent(receiverName);

                    // Pura URL generate karein, jismein domain aur path bhi ho
                    const blessingLink = `${window.location.origin}/receiver.html?sender=${encodedSenderName}&name=${encodedReceiverName}&blessingId=${blessingId}`;

                    generatedLinkInput.value = blessingLink;
                    shareLinkSection.style.display = 'block';

                    // Update share buttons with the full link
                    const whatsappText = `आपको ${senderName} की ओर से महादेव का आशीर्वाद मिला है! इसे खोलने के लिए यहां क्लिक करें: ${blessingLink}`;
                    whatsappShareBtn.href = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`;

                    const facebookText = `मैंने ${senderName} की ओर से आपको महादेव का आशीर्वाद भेजा है!`;
                    facebookShareBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blessingLink)}&quote=${encodeURIComponent(facebookText)}`;

                } else {
                    alert('कृपया अपना और प्राप्तकर्ता का नाम दर्ज करें और एक आशीर्वाद चुनें।');
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

        const urlParams = new URLSearchParams(window.location.search);
        const receiverName = urlParams.get('name') || 'प्रिय भक्त'; // 'प्रिय भक्त' agar naam nahi mila
        const senderName = urlParams.get('sender') || 'महादेव'; // 'महादेव' agar sender nahi mila
        let blessingId = urlParams.get('blessingId'); // Blessing ID URL se lein

        // Page Title update karein
        if (receiverPageTitle) {
            receiverPageTitle.textContent = `${receiverName} के लिए आशीर्वाद | Blessing for ${receiverName}`;
        }
        if (mainHeaderTitle) {
            mainHeaderTitle.textContent = `महादेव का आशीर्वाद | Mahadev's Blessing`;
        }

        let countdown = 10; // 10 seconds ka countdown

        function updateCountdown() {
            if (countdown > 0) {
                countdownDisplay.textContent = countdown;
                countdown--;
                setTimeout(updateCountdown, 1000);
            } else {
                countdownSection.style.display = 'none'; // Countdown hide karein
                displayBlessing(receiverName, senderName, blessingId); // Blessing dikhayein
            }
        }

        function displayBlessing(receiver, sender, id) {
            blessingDisplaySection.style.display = 'block'; // Blessing section show karein

            // Blessing ID determine karein: agar URL mein diya hai, nahi toh random
            const finalBlessingId = (id !== null && id >= 0 && id < blessingTexts.length) ? parseInt(id) : Math.floor(Math.random() * blessingTexts.length);

            const finalBlessingText = blessingTexts[finalBlessingId];
            const finalBlessingGifPath = blessingGifPaths[finalBlessingId];

            personalizedBlessingTitle.innerHTML = `महादेव का आशीर्वाद ${receiver} के लिए<br>(${sender} की ओर से)`;
            blessingTextOutput.innerHTML = finalBlessingText;
            blessingGif.src = finalBlessingGifPath;
        }

        // receiver.html load hote hi countdown start karein
        updateCountdown();
    }
});
