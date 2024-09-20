// components/LogoutButton.js

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false }); // Optionally handle the redirect
    window.location.href = '/login'; // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
