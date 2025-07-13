// Initialize Firebase (YOU NEED TO ADD YOUR ACTUAL FIREBASE CONFIG HERE)
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {
    // --- Common Elements/Functions ---
    const userNameInput = document.getElementById('userName');
    const getBlessingBtn = document.getElementById('getBlessingBtn');
    const blessingTextOutput = document.getElementById('blessingText');
    const blessingGifOutput = document.getElementById('blessingGif');

    const blessings = [
        { text: "Har har Mahadev! Mahadev ki kripa ho tum par [NAME], har sankat door ho jaye, aur jeevan me shanti barse.", gif: "assets/blessing1.gif" },
        { text: "Om Namah Shivaya! [NAME] par Shiv ji ki asim kripa bani rahe, sukh, samridhi, aur shanti sadaiv aapke saath rahe.", gif: "assets/blessing2.gif" },
        { text: "Jai Mahakal! [NAME], aapki sabhi manokamnayein poori hon, aur Mahakal aapki raksha karein.", gif: "assets/blessing3.gif" },
        { text: "Bhole Baba ki Jai! [NAME], Bhole Baba ka aashirwad aap par bana rahe, aur aapka jeevan anandmay ho.", gif: "assets/blessing4.gif" },
        { text: "Shiv Shambhu! [NAME], Shiv ji ke aashirwad se aapko shakti aur gyaan prapt ho.", gif: "assets/blessing5.gif" },
        { text: "Bam Bam Bhole! [NAME], Bhagwan Shiv aapke sabhi dukh door karein aur aapko naya marg dikhayein.", gif: "assets/blessing6.gif" },
        { text: "Shiv Shankar! [NAME], Shiv Shankar ki kripa se aapka har din mangalmay ho.", gif: "assets/blessing7.gif" },
        { text: "Mahadev! [NAME], Mahadev aapko aayushman aur swasth rakhein, aur aapke ghar mein khushiyan bharein.", gif: "assets/blessing8.gif" }
    ];

    let lastBlessingIndex = -1; // To ensure rotation or avoid immediate repeats

    // --- Index Page Logic (Blessing System) ---
    if (getBlessingBtn) {
        getBlessingBtn.addEventListener('click', () => {
            const name = userNameInput.value.trim();
            if (name) {
                // Get a random blessing (or rotate)
                let randomIndex;
                do {
                    randomIndex = Math.floor(Math.random() * blessings.length);
                } while (randomIndex === lastBlessingIndex && blessings.length > 1); // Avoid immediate repeat if more than 1 blessing
                lastBlessingIndex = randomIndex;

                const selectedBlessing = blessings[randomIndex];
                blessingTextOutput.textContent = selectedBlessing.text.replace('[NAME]', name);
                blessingGifOutput.src = selectedBlessing.gif;
                blessingGifOutput.alt = `Mahadev Blessing for ${name}`;
            } else {
                alert('Please enter your name to receive a blessing!');
            }
        });
    }

    // --- Admin Login Page Logic ---
    const adminLoginForm = document.getElementById('adminLoginForm');
    const loginMessage = document.getElementById('loginMessage');

    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = adminLoginForm.email.value;
            const password = adminLoginForm.password.value;

            // Placeholder for Firebase Auth login
            // try {
            //     await auth.signInWithEmailAndPassword(email, password);
            //     loginMessage.textContent = 'Login successful! Redirecting...';
            //     loginMessage.style.color = 'green';
            //     window.location.href = 'admin-dashboard.html'; // Redirect on success
            // } catch (error) {
            //     loginMessage.textContent = `Login failed: ${error.message}`;
            //     loginMessage.style.color = 'red';
            //     console.error("Login Error:", error);
            // }

            // Basic client-side check for demonstration (REPLACE WITH FIREBASE AUTH)
            if (email === 'admin@example.com' && password === 'admin123') {
                loginMessage.textContent = 'Login successful! Redirecting to dashboard...';
                loginMessage.style.color = 'green';
                setTimeout(() => {
                    localStorage.setItem('adminLoggedIn', 'true'); // Simulate login state
                    window.location.href = 'admin-dashboard.html';
                }, 1000);
            } else {
                loginMessage.textContent = 'Invalid credentials. Please try again.';
                loginMessage.style.color = 'red';
            }
        });
    }

    // --- Admin Dashboard Page Logic ---
    const authStatus = document.getElementById('authStatus');
    const productManagementSection = document.getElementById('productManagement');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    if (authStatus && productManagementSection) {
        // Check if admin is logged in (Simulated)
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true'; // Check simulated login state
        if (isLoggedIn) {
            authStatus.textContent = 'Welcome, Admin!';
            authStatus.style.color = 'green';
            productManagementSection.style.display = 'block';
            adminLogoutBtn.style.display = 'block';
            // In a real app, you'd fetch products here and populate the list
            // Example: fetchProductsFromFirebase();
        } else {
            authStatus.textContent = 'Access Denied. Please log in as Admin.';
            authStatus.style.color = 'red';
            setTimeout(() => {
                window.location.href = 'admin-login.html'; // Redirect if not logged in
            }, 2000);
        }

        // Logout functionality
        if (adminLogoutBtn) {
            adminLogoutBtn.addEventListener('click', () => {
                // Placeholder for Firebase Auth logout
                // auth.signOut().then(() => {
                //     localStorage.removeItem('adminLoggedIn'); // Clear simulated login state
                //     window.location.href = 'admin-login.html';
                // }).catch((error) => {
                //     console.error("Logout Error:", error);
                // });
                localStorage.removeItem('adminLoggedIn'); // Clear simulated login state
                window.location.href = 'admin-login.html';
            });
        }

        // Add Product Form Submission (Placeholder)
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = productForm.productName.value;
                const price = parseFloat(productForm.productPrice.value);
                const imageUrl = productForm.productImage.value;

                if (name && !isNaN(price) && imageUrl) {
                    // Placeholder for adding product to Firebase
                    // db.collection('products').add({ name, price, imageUrl })
                    //     .then(() => {
                    //         alert('Product added successfully!');
                    //         productForm.reset();
                    //         // Refresh product list
                    //     })
                    //     .catch((error) => {
                    //         console.error("Error adding product: ", error);
                    //         alert('Failed to add product.');
                    //     });

                    // Simulate adding product to list
                    const listItem = document.createElement('li');
                    listItem.textContent = `${name} - ₹${price.toFixed(2)} (${imageUrl})`;
                    productList.appendChild(listItem);
                    alert('Product added (simulated)!');
                    productForm.reset();
                } else {
                    alert('Please fill all product details correctly.');
                }
            });
        }
    }

    // --- Shop Page Logic (Product Display - Placeholder) ---
    const productDisplay = document.getElementById('productDisplay');
    if (productDisplay) {
        // Placeholder for fetching and displaying products
        // In a real app, you would fetch from Firebase Firestore
        // db.collection('products').get().then((snapshot) => {
        //     productDisplay.innerHTML = ''; // Clear loading message
        //     snapshot.forEach((doc) => {
        //         const product = doc.data();
        //         const productItem = `
        //             <div class="product-item">
        //                 <img src="${product.imageUrl}" alt="${product.name}">
        //                 <h3>${product.name}</h3>
        //                 <p>₹${product.price.toFixed(2)}</p>
        //                 <button>Add to Cart (Coming Soon)</button>
        //             </div>
        //         `;
        //         productDisplay.innerHTML += productItem;
        //     });
        // }).catch((error) => {
        //     console.error("Error fetching products:", error);
        //     productDisplay.innerHTML = '<p>Failed to load products.</p>';
        // });

        // Simulated products for demonstration
        setTimeout(() => {
            productDisplay.innerHTML = ''; // Clear loading message
            const simulatedProducts = [
                { name: "Mahadev Idol", price: 1200.00, imageUrl: "https://via.placeholder.com/200x200?text=Idol" },
                { name: "Rudraksha Mala", price: 350.00, imageUrl: "https://via.placeholder.com/200x200?text=Mala" },
                { name: "Shiva T-Shirt", price: 500.00, imageUrl: "https://via.placeholder.com/200x200?text=T-Shirt" },
                { name: "Bhole Baba Poster", price: 150.00, imageUrl: "https://via.placeholder.com/200x200?text=Poster" }
            ];
            simulatedProducts.forEach(product => {
                const productItem = `
                    <div class="product-item">
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>₹${product.price.toFixed(2)}</p>
                        <button>Add to Cart (Coming Soon)</button>
                    </div>
                `;
                productDisplay.innerHTML += productItem;
            });
        }, 1500); // Simulate network delay
    }

    // --- Order Form Logic (Placeholder) ---
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order submitted successfully! (This is a placeholder. Actual email sending requires server-side setup.)');
            orderForm.reset();
        });
    }

});
