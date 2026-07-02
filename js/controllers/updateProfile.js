document.addEventListener("DOMContentLoaded", () => {
  const authManager = new Auth();
  const userManager = new User();

  const profileName = document.getElementById("profileName");
  let userProfileData = authManager.getCurrentUser();
  if (!userProfileData || !userProfileData.id) return;
  if (profileName) profileName.innerText = userProfileData.username;

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const profileForm = document.getElementById("profileForm");

  let dataCurrentUser = authManager.getUserByCurrentUser(userProfileData.id);

  if (usernameInput && dataCurrentUser) usernameInput.value = dataCurrentUser.username;

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updateData = {
      username: usernameInput.value.trim(),
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    };

    if (!validateUpdateForm(updateData, dataCurrentUser.username)) return;

    const result = userManager.updateUserProfile(dataCurrentUser.id, updateData);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "Updated successfully!",
        text: result.message,
      }).then(() => {
        passwordInput.value = "";
        confirmPasswordInput.value = "";

        userProfileData = authManager.getCurrentUser();
        profileName.innerText = userProfileData.username;
        dataCurrentUser = authManager.getUserByCurrentUser(userProfileData.id);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
      });
    }
  });

  function validateUpdateForm(data, currentUsername) {
    const isUsernameSame = data.username === currentUsername;
    const isPasswordEmpty = data.password === "" && data.confirmPassword === "";

    if (isUsernameSame && isPasswordEmpty) {
      Swal.fire({
        icon: "info",
        title: "No changes made",
        text: "You haven't made any changes to your profile data.",
      });
      return false;
    }

    if (data.username && data.username.length < 3) {
      Swal.fire({
        title: "Warning",
        icon: "warning",
        text: "Username must be at least 3 characters long!",
      });
      return false;
    }

    if (!isPasswordEmpty) {
      if (data.password !== data.confirmPassword) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Password and Confirm Password do not match!",
        });
        return false;
      }

      if (data.password.length < 8) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Password must be at least 8 characters long!",
        });
        return false;
      }
    }

    return true;
  }
});
