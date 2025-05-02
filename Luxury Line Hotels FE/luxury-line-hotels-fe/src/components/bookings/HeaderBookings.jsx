const HeaderBookings = ({title}) => {
  return (
    <header className="header">
      <div className="overlay-success"></div>
      <div className="container">
        <h1 className="header-title text-center">{title}</h1>
      </div>
    </header>
  );
};

export default HeaderBookings;