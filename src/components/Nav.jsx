const Nav = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src="/logo.jpg" alt="ReactFood Logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <button className="text-button">Cart (0)</button>
      </nav>
    </header>
  );
};

export default Nav;
