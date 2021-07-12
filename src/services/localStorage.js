const initializeLocalStorage = () => {
  localStorage.setItem("fieldAvailableFlagKey", false);
  localStorage.setItem("fieldEntirePropertyFlagKey", false);
  localStorage.setItem("fieldPrivateRoomFlagKey", false);
  localStorage.setItem("fieldSharedRoomFlagKey", false);
  localStorage.setItem("fieldStudioFlagKey", false);
};

export default initializeLocalStorage;
