import { useEffect, useState } from "react";
import { colors } from "../../constants";
import DoughnutChart from "../components/DoughnutChart";
import { getChallengesCounts } from "../utilities/api/dashboard";

const Dashboard = () => {
  const [challengeCounts, setChallengeCounts] = useState([]);

  useEffect(() => {
    getChallengesCounts()
      .then(({ data }) => setChallengeCounts(data))
      .catch((e) => console.log(e));
  }, []);
  
  return (
    <div>
      <div className="min-h-screen">
        <div className="grid grid-cols-3 m-10">
          <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
            <div className="flex justify-between items-center h-12">
              <label className="font-bold text-gray-600 mr-2">
                Top Challenges - Most Converted into customer projects
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
                  </tr>
                </thead>

                {/* body of the table starts */}
                <tbody>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">1</td>
                    <td className="pl-4 py-2">Challenge 1</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">2</td>
                    <td className="pl-4 py-2">Challenge 2</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">3</td>
                    <td className="pl-4 py-2">Challenge 3</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">4</td>
                    <td className="pl-4 py-2">Challenge 4</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">5</td>
                    <td className="pl-4 py-2">Challenge 5</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">6</td>
                    <td className="pl-4 py-2">Challenge 6</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">7</td>
                    <td className="pl-4 py-2">Challenge 7</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">8</td>
                    <td className="pl-4 py-2">Challenge 8</td>
                  </tr>
                  <tr>
                    <td className="pl-4 py-2">9</td>
                    <td className="pl-4 py-2">Challenge 9</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* second table starts */}
          <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
            <div className="flex justify-between items-start h-12">
              <label className="font-bold text-gray-600 mr-2">
                Top Challenges - Most Submissions Done
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
                      Number Of Submissions
                    </th>
                  </tr>
                </thead>

                {/* body of the table starts */}
                <tbody>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">1</td>
                    <td className="pl-4 py-2">Challenge 1</td>
                    <td className="text-center py-2">13</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">2</td>
                    <td className="pl-4 py-2">Challenge 2</td>
                    <td className="text-center py-2">13</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">3</td>
                    <td className="pl-4 py-2">Challenge 3</td>
                    <td className="text-center py-2">11</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">4</td>
                    <td className="pl-4 py-2">Challenge 4</td>
                    <td className="text-center py-2">10</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">5</td>
                    <td className="pl-4 py-2">Challenge 5</td>
                    <td className="text-center py-2">6</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">6</td>
                    <td className="pl-4 py-2">Challenge 6</td>
                    <td className="text-center py-2">4</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">7</td>
                    <td className="pl-4 py-2">Challenge 7</td>
                    <td className="text-center py-2">3</td>
                  </tr>
                  <tr className="border-0 border-b-2 border-gray-300">
                    <td className="pl-4 py-2">8</td>
                    <td className="pl-4 py-2">Challenge 8</td>
                    <td className="text-center py-2">3</td>
                  </tr>
                  <tr>
                    <td className="pl-4 py-2">9</td>
                    <td className="pl-4 py-2">Challenge 9</td>
                    <td className="text-center py-2">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* doughnut chart using chartjs  */}
          <div className="m-5 p-5 bg-gray-100 border-t-4 border-pink-700 h-fit">
            <div className="h-12">
              <label className="font-bold text-gray-600">
                Number of Challenges in Each Account Type
              </label>
            </div>

            <div className="flex justify-center">
              <div className="relative h-44 w-52 mt-4 mb-4">
                <DoughnutChart
                  chartData={{
                    labels: challengeCounts.map((challenge) => challenge.accountName),
                    datasets: [{
                      label: 'My First Dataset',
                      data: challengeCounts.map((challenge) => challenge.challengeCount),
                      backgroundColor: colors.slice(0, challengeCounts.length),
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

            <div className="h-16 mt-16">
              <div className="flex flex-wrap items-center">
                {challengeCounts.map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 px-2 py-1"
                  >
                    <div className={`border-2 bg-${colors[index]}-600 rounded-full h-5 w-5`} />
                    <p className="text-sm">{challenge.accountName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* content at bottom */}
        <div className="m-10">
          <div className="pl-5 pr-20 pb-5">
            <h2 className="text-2xl">
              Dashboard
            </h2>
            <br></br>
            <h3 className="text-zinc-700 text-justify">
              Know how challenges are being solved across various accounts. Interactive view of past trends on challenges managed in the
              platform.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
