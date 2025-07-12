function startBlessing() {
    alert("आशीर्वाद तैयार हो रहा है...");
    window.location.href = "receiver.html";
}
function donate(amount) {
    alert(`धन्यवाद! ₹${amount} का दान स्वीकार हुआ।`);
}
// Razorpay integration (Advanced)
function buyProduct(id) {
    const options = {
        key: "rzp_test_YOUR_KEY",
        amount: 4900, // ₹49 = 4900 paise
        name: "Mahadev Stickers",
        description: "Har Har Mahadev Sticker Pack"
    };
    const rzp = new Razorpay(options);
    rzp.open(
        
    );<a href="https://wa.me/919876543210?text=Mahadev%20Sticker%20Order" class="buy-btn">WhatsApp पर ऑर्डर करें</a>
}
