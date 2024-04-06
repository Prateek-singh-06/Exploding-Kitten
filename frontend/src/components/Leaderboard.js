import { useState } from "react";

const Leaderboard = (props) => {
  const [leaderboard, setLeaderboard] = useState(props.username);
  let arrayOfObjects = props.username;
  arrayOfObjects.sort((a, b) => b.score - a.score);
  return (
    <div
      className="flex flex-col h-screen
     bg-white"
    >
      <div className="overflow-x-hidden sm:-mx-6 lg:-mx-8">
        <div className=" min-w-full py-2 sm:px-6 lg:px-8">
          <div className="">
            <table className="min-w-full text-center overflow-scroll text-sm font-light text-surface dark:text-white">
              <thead className=" font-medium">
                <tr className="border-b-2 border-stone-500">
                  <th
                    scope="col"
                    className="px-6 py-4 text-black font-medium text-lg"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-black font-medium text-lg"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-black font-medium text-lg"
                  >
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="border-b-2 border-neutral-400 shadow-md overflow-x-hidden">
                {Array.isArray(arrayOfObjects) &&
                  arrayOfObjects.map((item, index) => {
                    return (
                      <tr className=" border-b-2 border-neutral-400 overflow-auto ">
                        <td className="whitespace-nowrap px-6 py-4 text-lg font-normal text-black">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-black text-lg font-normal">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-black text-lg font-normal">
                          {item.score}
                        </td>
                      </tr>
                    );
                  })}

                {/* <tr className="border-b border-neutral-700 bg-neutral-800 text-neutral-50 dark:border-neutral-600 dark:bg-neutral-700">
                  <td className="whitespace-nowrap px-6 py-4 font-medium">
                    Dark
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">Cell</td>
                  <td className="whitespace-nowrap px-6 py-4">Cell</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
