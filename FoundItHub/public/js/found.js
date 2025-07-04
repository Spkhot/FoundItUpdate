const form = document.getElementById("foundForm");
const message = document.getElementById("message");
const otpInput = document.getElementById("otpInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");

// 📨 Send OTP
sendOtpBtn.addEventListener("click", async () => {
  const email = form.email.value;
  if (!email) return alert("Enter email first");

  const res = await fetch("/api/otp/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  message.textContent = data.message;
});

// 📨 Submit Form (verify OTP + upload)
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const otp = otpInput.value;

  // ✅ Step 1: Verify OTP
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

  // ✅ Step 2: Upload item
  const formData = new FormData(form);
  const res = await fetch("/api/items", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.success) {
    message.textContent = "Item posted successfully!";
    form.reset();
    otpInput.value = "";
  } else {
    message.textContent = data.message || "Upload failed";
  }
});
