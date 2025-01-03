const fetchUserData = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ name: "John Doe", age: 30 }), 2000);
  });

async function getUserData() {
  try {
    const userData = await fetchUserData();
    console.log(userData);
  } catch (err) {
    console.log("Failed to Fetch User Data: ", err);
  }
}

getUserData();
