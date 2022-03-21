import "./Bottom.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 divide-x">
        <div className="pl-8 pt-14 pb-40 ">
          <div className="text-left mb-5 space-x-24">
            <label
              htmlFor="top"
              className=" w-20  text-left
                                    font-bold text-gray-600"
            >
              {" "}
              Top Challenges - Most Challenges Won{" "}
            </label>
            <select className="flex-1  py-1 p-2 border-b-2  mt-2 w-20  rounded shadow bg-white ring-1">
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select>
          </div>
          <table className="fixed">
            <div className="bg-gray-300 border-b-2 border-gray-200">
              <tr>
                <th className=" pb-2 pl-8 text-sm font-semibold tracking-wide text-left">
                  Rank
                </th>
                <th className=" pb-2 pl-32 p-1 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className=" pb-2 pl-32 p-1 text-sm font-semibold tracking-wide text-left">
                  Challenges Won
                </th>
              </tr>
            </div>

            {/* body of the table starts */}
            <div className="bg-gray-100 divide-y  divide-gray-400 px-6 space-y-1 max-h-72 overflow-auto ">
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">1</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 01</div>
                <div className="pt-4 pb-4 pl-10 w-1/4 ">07</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">2</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 02</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">05</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">3</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 03</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">08</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">4</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 04</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">12</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">5</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 05</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">06</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">6</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 06</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">04</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">7</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 07</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">10</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">8</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 08</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">05</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">9</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 09</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">09</div>
              </div>
            </div>
          </table>
        </div>

        {/* second table starts */}
        <div className="pl-8 pt-14 pb-40 ">
          <div className="text-left mb-5 space-x-24">
            <label
              for="top"
              className=" w-20  text-left
                                 font-bold text-gray-600"
            >
              {" "}
              Top Challenges - Most Submissions
            </label>
            <select className="flex-1  py-1 p-2 border-b-2  mt-2 w-20  rounded shadow bg-white ring-1">
              <option>2018</option>
              <option>2019</option>
              <option>2020</option>
              <option>2021</option>
            </select>
          </div>
          {/* harshitha */}
          <table className="fixed">
            <div className="bg-gray-300 border-b-2 border-gray-200">
              <tr>
                <th className="pt-2 pb-2 pl-8 text-sm font-semibold tracking-wide text-left">
                  Rank
                </th>
                <th className="pt-2 pb-2 pl-28  p-1 text-sm font-semibold tracking-wide text-left">
                  Name
                </th>
                <th className="pt-2 pb-2 pl-28  p-1 text-sm font-semibold tracking-wide text-left">
                  Challenges Won
                </th>
              </tr>
            </div>

            {/* body of the table starts */}
            <div className="bg-gray-100 divide-y  divide-gray-400 px-6 space-y-1 max-h-72 overflow-auto ">
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">1</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 01</div>
                <div className="pt-4 pb-4 pl-10 w-1/4 ">12</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">2</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 02</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">15</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">3</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 03</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">09</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">4</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 04</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">11</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">5</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 05</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">10</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">6</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 06</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">06</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">7</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 07</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">10</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">8</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 08</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">05</div>
              </div>
              <div className="flex">
                <div className="pt-4 pb-4 pl-2 w-1/2">9</div>
                <div className="pt-4 pb-4 pl-2 w-1/2">Name 09</div>
                <div className="pt-4 pb-4 pl-10 w-1/4">09</div>
              </div>
            </div>
          </table>
        </div>
        {/* content at bottom */}
        {/* <div id="bottom">
          <div className="pl-10 pt-20 pr-20">
            <h2 className="text-2xl">
              Lorem Ipsum Dolor, Sit Amet Consectetur
            </h2>
            <br></br>
            <h3 className=" text-zinc-700 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est
              laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed id imperdiet lectus, nec consectetur purus.
            </h3>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
