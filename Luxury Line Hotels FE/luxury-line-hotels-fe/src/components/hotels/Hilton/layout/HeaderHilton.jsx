const HeaderHilton = () => {

    return (
        <header className="header-banner hb-img-hilton">
            <div className="overlay"/>
            <div className="animated-texts overlay-content">
                <h1 style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 1)"}}>
                    <span style={{color: "rgb(26,26,126)"}}>Welcome to</span> Hotel Hilton
                </h1>
                <h4 style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 1)"}}>
                    Worldwide quality available at your disposal
                </h4>
            </div>
        </header>
    );
};

export default HeaderHilton;