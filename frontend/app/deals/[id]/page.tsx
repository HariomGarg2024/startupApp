const handleClaim = async (deal: any) => {
  
  if (deal.locked) {
    alert("Authentication / verification required");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to claim this deal");
    return;
  }

  try {
    const res = await fetch(
      `http://127.0.0.1:5000/api/claims/${deal._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const text = await res.text();

    if (!res.ok) {
      let message = "Failed to claim deal";
      try {
        const data = JSON.parse(text);
        if (data.message) message = data.message;
      } catch {
        if (text) message = text;
      }
      throw new Error(message);
    }

    alert("You have successfully claimed this deal.");
  } catch (err: any) {
    console.error("Claim error:", err.message);
    alert(err.message);
  }
};
