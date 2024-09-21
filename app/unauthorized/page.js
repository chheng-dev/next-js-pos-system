// app/unauthorized/page.js

export default function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page. Please log in.</p>
      <a href="/login">Go to Login</a>
    </div>
  );
}
