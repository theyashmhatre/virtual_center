import DoughnutChart from "../components/DoughnutChart";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 m-10">
        <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-600">
              Top Challenges - Most Challenges Won
            </label>
            <select className="py-1 px-2 border-b-2 rounded shadow bg-white ring-1">
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
          </div>

          <div className="overflow-y-auto whitespace-nowrap h-80 mt-4">
            <table className="text-sm w-full">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="py-1 text-left pl-4">
                    Rank
                  </th>
                  <th className="py-1 text-left pl-4">
                    Name
                  </th>
                  <th className="py-1">
                    Challenges Won
                  </th>
                </tr>
              </thead>

              {/* body of the table starts */}
              <tbody>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">1</td>
                  <td className="pl-4 py-2">Name 01</td>
                  <td className="text-center py-2">07</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">2</td>
                  <td className="pl-4 py-2">Name 02</td>
                  <td className="text-center py-2">05</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">3</td>
                  <td className="pl-4 py-2">Name 03</td>
                  <td className="text-center py-2">08</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">4</td>
                  <td className="pl-4 py-2">Name 04</td>
                  <td className="text-center py-2">12</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">5</td>
                  <td className="pl-4 py-2">Name 05</td>
                  <td className="text-center py-2">06</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">6</td>
                  <td className="pl-4 py-2">Name 06</td>
                  <td className="text-center py-2">04</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">7</td>
                  <td className="pl-4 py-2">Name 07</td>
                  <td className="text-center py-2">10</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">8</td>
                  <td className="pl-4 py-2">Name 08</td>
                  <td className="text-center py-2">05</td>
                </tr>
                <tr>
                  <td className="pl-4 py-2">9</td>
                  <td className="pl-4 py-2">Name 09</td>
                  <td className="text-center py-2">09</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* second table starts */}
        <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-600">
              Top Challenges - Most Challenges Won
            </label>
            <select className="py-1 px-2 border-b-2 rounded shadow bg-white ring-1">
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
          </div>

          <div className="overflow-y-auto whitespace-nowrap h-80 mt-4">
            <table className="text-sm w-full">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  <th className="py-1 text-left pl-4">
                    Rank
                  </th>
                  <th className="py-1 text-left pl-4">
                    Name
                  </th>
                  <th className="py-1">
                    Challenges Won
                  </th>
                </tr>
              </thead>

              {/* body of the table starts */}
              <tbody>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">1</td>
                  <td className="pl-4 py-2">Name 01</td>
                  <td className="text-center py-2">07</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">2</td>
                  <td className="pl-4 py-2">Name 02</td>
                  <td className="text-center py-2">05</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">3</td>
                  <td className="pl-4 py-2">Name 03</td>
                  <td className="text-center py-2">08</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">4</td>
                  <td className="pl-4 py-2">Name 04</td>
                  <td className="text-center py-2">12</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">5</td>
                  <td className="pl-4 py-2">Name 05</td>
                  <td className="text-center py-2">06</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">6</td>
                  <td className="pl-4 py-2">Name 06</td>
                  <td className="text-center py-2">04</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">7</td>
                  <td className="pl-4 py-2">Name 07</td>
                  <td className="text-center py-2">10</td>
                </tr>
                <tr className="border-0 border-b-2 border-gray-300">
                  <td className="pl-4 py-2">8</td>
                  <td className="pl-4 py-2">Name 08</td>
                  <td className="text-center py-2">05</td>
                </tr>
                <tr>
                  <td className="pl-4 py-2">9</td>
                  <td className="pl-4 py-2">Name 09</td>
                  <td className="text-center py-2">09</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* doughnut chart using chartjs  */}
        <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
          <div>
            <label className="font-bold text-gray-600">
              Lorem Ipsum
            </label>
          </div>

          <div className="flex justify-center">
            <div className="relative h-52 w-52 mt-4">
              <DoughnutChart
                chartData={{
                  labels: [
                    'Red',
                    'Blue',
                    'Yellow'
                  ],
                  datasets: [{
                    label: 'My First Dataset',
                    data: [300, 50, 100],
                    backgroundColor: [
                      'red',
                      'blue',
                      'yellow'
                    ],
                    hoverOffset: 4
                  }]
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="h-28 mt-6">
            <div className="flex flex-wrap items-center">
              <div className="flex items-center space-x-1 px-2 py-1">
                <div className="border-2 bg-red-600 rounded-full h-5 w-5" />
                <p className="text-sm">Red Color</p>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1">
                <div className="border-2 bg-blue-600 rounded-full h-5 w-5" />
                <p className="text-sm">Blue Color</p>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1">
                <div className="border-2 bg-yellow-600 rounded-full h-5 w-5" />
                <p className="text-sm">Yellow Color</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* content at bottom */}
      <div className="m-10">
        <div className="pl-5 pr-20 pb-5">
          <h2 className="text-2xl">
            Know how challenges are being solved across various accounts.
            <br />
            Interactive view of past trends on challenges managed in the
            platform.
          </h2>
          <br></br>
          <h3 className="text-zinc-700 text-justify">
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
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
