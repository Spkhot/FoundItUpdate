const form = document.getElementById("requestForm");
const otpInput = document.getElementById("otpInput");
const message = document.getElementById("message");
const sendOtpBtn = document.getElementById("sendOtpBtn");

let verifiedEmail = null;

sendOtpBtn.addEventListener("click", async () => {
  const email = form.email.value;

  if (!email) return alert("Please enter email first");

  const res = await fetch("/api/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  message.textContent = data.message;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const otp = otpInput.value;

  // 🔐 Step 1: Verify OTP
  const otpRes = await fetch("/api/otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const otpData = await otpRes.json();
  if (!otpData.success) {
    message.textContent = otpData.message;
    return;
  }

  // ✅ Step 2: Post the request
  const formData = {
    productName: form.productName.value,
    description: form.description.value,
    location: form.location.value,
    category: form.category.value,
    reward: form.reward.value,
    email: email,
  };

  const res = await fetch("/api/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (data.success) {
    message.textContent = "Request submitted successfully!";
    form.reset();
    otpInput.value = "";
  } else {
    message.textContent = data.message;
  }
});
