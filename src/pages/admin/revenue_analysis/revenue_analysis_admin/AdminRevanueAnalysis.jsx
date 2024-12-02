import React from 'react'

const merchantData = [
    {
        Company: "M",
        Email: "nopparat_sat@maya-wizard.com",
        Total_sold_to_Estipal: "5 / USD 75,300.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    },
    {
        Company: "MLA Thai",
        Email: "admin@mlathai.com",
        Total_sold_to_Estipal: "0 / USD 0.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    },
    {
        Company: "Estipal, LLC",
        Email: "niels@estipal.com",
        Total_sold_to_Estipal: "7 / USD 143,000.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    },
    {
        Company: "Test",
        Email: "nopparat@scouse.tech",
        Total_sold_to_Estipal: "0 / USD 0.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    },
    {
        Company: "maya",
        Email: "nopparat.mayawizard2@gmail.com",
        Total_sold_to_Estipal: "0 / USD 0.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    },
    {
        Company: "maya",
        Email: "info.icenetwork@gmail.com",
        Total_sold_to_Estipal: "3 / USD 52,600.00",
        Total_partner_with_Estipal: "0 / USD 0.00"
    }
]

const AdminRevanueAnalysis = () => {
    return (
        <div className="p-[15px] h-[100vh]">
            <div className="px-0 sm:px-[15px] flex flex-col justify-between flex-wrap">
                <h1 className="text-[26px] font-medium mb-4 mt-5 px-0 sm:px-[15px] font-sans text-white">
                    Revenue Analysis (Merchant)
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
                                Total sold to Estipal / Amount
                            </th>
                            <th class="p-2 text-[#ffff] text-center cursor-pointer">
                                Total partner with Estipal / Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {merchantData?.map((item, index) => (
                            <tr key={index} className="border-b border-[#202b34]">
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                                    {item.Company}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                                    {item.Email}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    {item.Total_sold_to_Estipal}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    {item.Total_partner_with_Estipal}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminRevanueAnalysis