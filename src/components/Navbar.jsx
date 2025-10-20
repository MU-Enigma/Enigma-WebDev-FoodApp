export default function Navbar() {
  return (
    <nav id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <div>
        <button className="text-button">Cart (0)</button>
      </div>
    </nav>
  );
}