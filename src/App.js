import UserCard from "./components/userCard";

const appBackground = {
  background: "rgb(255,230,0,15%)",
};
const App = () => {
  let url = window.location.href;
  let aurl = new URL(url).host;
  const host = aurl.split(":");

  return (
    <>
      <div style={appBackground} className=" w-full h-screen">
        <header style={{ background: "rgb(255,250,121,43%)" }}>
          <nav className="flex items-center justify-between">
            <div
              style={{ background: "#FFFA9E" }}
              className=" ml-4 m-2  h-10 font-semibold grid place-items-center"
            >
              <div className="waviy">
                <span style={{ "--i": 1 }}>V</span>
                <span style={{ "--i": 2 }}>D</span>
                <span style={{ "--i": 3 }}>o</span>
                <span style={{ "--i": 4 }}>T</span>
                <span style={{ "--i": 5 }}>o</span>
                <span style={{ "--i": 6 }}>k</span>
              </div>
            </div>
            <div
              style={{ background: "#FFFA9E" }}
              className="m-2 h-10 font-semibold grid place-items-center"
            >
              {host[0]}
            </div>
            <div
              style={{ background: "#FFFA9E" }}
              className="m-2 mr-4 text-sm h-10 font-semibold grid place-items-center"
            >
              oneToOne message
            </div>
          </nav>
        </header>
        <section className="flex justify-center ">
          {/* 25% and 75% width each aside respectively */}
          <aside
            className=" w-1/4 bg-white"
            style={{ height: "calc(100vh - 56px)" }}
          >
            <div className="">
              {/* <div className="bg-blue-500 w-20">1</div>
              <div className="bg-blue-500 w-40">2</div>
              <div className="bg-blue-500 w-6">3</div> */}
              <UserCard />
            </div>
          </aside>
          <aside className="bg_clr w-full">
            <div style={{ width: "50%" }} className="m-2">
              <div
                style={{ background: "transparent", width: "15%" }}
                className="rounded-r-2xl"
              >
                <div>Ali {`{time}`}</div>
                <div
                  className=" text-center h-7 mt-1 rounded-2xl"
                  style={{ background: "white" }}
                >
                  <span className="-mr-4">Hi there</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
};

export default App;
