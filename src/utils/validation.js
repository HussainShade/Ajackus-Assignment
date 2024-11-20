export const validateUserData = (userData) => {
    if (!userData.firstName || !userData.lastName || !userData.email) {
      throw new Error("All fields are required.");
    }
    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      throw new Error("Invalid email format.");
    }
  };
  