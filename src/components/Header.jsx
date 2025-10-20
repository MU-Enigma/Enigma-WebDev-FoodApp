export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button className="text-button">Cart (0)</button>
      </nav>
    </header>
  );
}