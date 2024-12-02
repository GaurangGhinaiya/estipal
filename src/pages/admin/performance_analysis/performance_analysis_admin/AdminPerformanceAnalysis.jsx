import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

const adminPerformanceData = [
  { company: "Estipal, LLC", email: "niels@estipal.com", requested: 34, accepted: 8, successRate: "23.5" },
  { company: "M", email: "nopparat_sat@maya-wizard.com", requested: 37, accepted: 17, successRate: "45.9" },
  { company: "MLA Thai", email: "admin@mlathai.com", requested: 5, accepted: 1, successRate: "20.0" },
  { company: "Test", email: "nopparat@scouse.tech", requested: 0, accepted: 0, successRate: "00.0" },
  { company: "maya", email: "nopparat.mayawizard2@gmail.com", requested: 0, accepted: 0, successRate: "00.0" },
  { company: "maya", email: "info.icenetwork@gmail.com", requested: 7, accepted: 3, successRate: "42.9" },
]

const AdminPerformanceAnalysis = () => {
  return (
    <div className="p-[15px]">
      <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
        <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Performance Analysis (Merchant)
        </h1>
        <div className="flex items-center sm:flex-row flex-col gap-4 space-x-4 mb-1 px-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="fromDate" className="text-md text-white">From</label>
            <input type="date" id="fromDate" placeholder="dd-mm-yyyy" className="p-2 border rounded-md text-black" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="toDate" className="text-md text-white">To</label>
            <input type="date" id="toDate" placeholder="dd-mm-yyyy" className="p-2 border rounded-md text-black" />
          </div>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">Apply Filter</button>
          <button className="bg-[#0060aa] hover:bg-[#0060aa] text-white font-bold py-2 px-4 rounded">Clear Filter</button>
        </div>
        <h1 className="text-[20px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
          Summary
        </h1>
      </div>
      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Comapny
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">Email</th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Quotation Requested
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Total Quotation Accepted
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">
                Success Rate (%)
              </th>
              <th class="p-2 text-[#ffff] text-center cursor-pointer">

              </th>
            </tr>
          </thead>
          <tbody>
            {adminPerformanceData?.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                  {item.company}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                  {item.email}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.requested}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.accepted}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.successRate} %

                </td>
                <td className="py-[12px] text-[#ffff] flex justify-center text-center items-center whitespace-nowrap">
                  <ReactSpeedometer
                    maxValue={100}
                    value={item.successRate}
                    valueFormat={"d"}
                    customSegmentStops={[0, 25, 50, 75, 100]}
                    segmentColors={["#B13338", "#E87A31", "#FFFF00", "#4FE000"]}
                    textColor={"black"}
                    width={160}
                    height={110}
                    ringWidth={10}
                    needleHeightRatio={0.8}
                    showPercentage={false}
                    currentValueText={""}
                  />

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPerformanceAnalysis