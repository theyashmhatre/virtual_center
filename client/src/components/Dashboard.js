const Dashboard = () => {
  return (
    <div className="flex flex-row h-screen">
      <sidebar className="bg-black-sidebar grow-1 pr-0 ">
        <ul className="text-slate-50 flex flex-col gap-9 pt-6 ">
          <li>
            <img src="https://img.icons8.com/emoji/48/000000/white-flag.png" />
          </li>
          <li>
            <img src="https://img.icons8.com/emoji/48/000000/white-flag.png" />
          </li>
          <li>
            <img src="https://img.icons8.com/emoji/48/000000/white-flag.png" />
          </li>
          <li>
            <img src="https://img.icons8.com/emoji/48/000000/white-flag.png" />
          </li>
        </ul>
      </sidebar>

      <main className="flex flex-col p-3 grow pl-0 pt-0 pr-0 ">
        <ul className="flex justify-end gap-3 p-7 bg-gradient-to-r from-blue-grd to-green-grd">
          <li className="grow">
            <h1 className="font-bold  text-slate-50 text-xl">
              TCS Virtual Innovation Center
            </h1>
          </li>
          <li>
            <input
              className="rounded-full p-1"
              type="text"
              placeholder="Search.."
            />
          </li>
          <li>
            <div className="rounded-full bg-white px-11 p-1">Shubham </div>
          </li>
        </ul>

        <ul className="flex gap-7 decoration-from-font font-medium bg-gray-rgb p-4 ">
          <li>Home</li>
          <li>Dashboard</li>
          <li>Challenges</li>
          <li>Our Solvers</li>
          <li>Our Offerings</li>
          <li>Resources</li>
          <li>Help</li>
        </ul>

        <div className="flex flex-col">
          <div className="flex">
            <div className=" border-black border-4 flex-1   h-60 ">
              <h1>Lorem ipsum dolor, sit amet consectetur </h1>
              <h3>
                adipisicing elit. Ut voluptatem voluptatum laudantium nobis quis
                earum, rem maxime et pariatur dolore beatae amet, consequuntur
                eius distinctio impedit voluptate libero quia ex.
              </h3>
              <div>
                <h2>adipisicing elit. Ut voluptatem voluptatum </h2>
                <p>
                  adipisicing elit. Ut voluptatem voluptatum laudantium nobis
                  quis earum, rem maxime et pariatur dolore beatae amet,
                  consequuntur eius distinctio impedit voluptate libero quia ex.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h1>ok</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
