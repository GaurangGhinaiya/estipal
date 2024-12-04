import React, { useState } from 'react'
import PaginationComponent from '../../../components/common/PaginationComponent'
import SearchBar from '../../../components/common/SearchBar'
import { Button } from '@mui/material'

const estimatorData = [
    {
        online: true,
        active: true,
        requiresValidation: false,
        id: "ECA1009",
        first: "Albert",
        last: "Einstein",
        email: "niels@sfcloudwork.com",
        addedOn: "22 Dec 2022",
        sentAccepted: "49/2",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1015",
        first: "Bob",
        last: "Karan",
        email: "ks6890551@gmail.com",
        addedOn: "11 Nov 2023",
        sentAccepted: "2/1",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: false,
        id: "ECA1011",
        first: "Robert",
        last: "MLA",
        email: "robert@mlathai.com",
        addedOn: "5 Jan 2023",
        sentAccepted: "46/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1013",
        first: "Robert",
        last: "MLA Thai",
        email: "roberto.omini@gmail.com",
        addedOn: "27 Apr 2023",
        sentAccepted: "9/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: false,
        id: "ECA1000",
        first: "Paolo",
        last: "Manzoli",
        email: "paolo@mlathai.com",
        addedOn: "29 Nov 2022",
        sentAccepted: "68/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1001",
        first: "nopp",
        last: "ice",
        email: "nopparat_sat@maya-wizard.com",
        addedOn: "30 Nov 2022",
        sentAccepted: "77/16",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1016",
        first: "test1",
        last: "test1",
        email: "test1@gmail.com",
        addedOn: "3 Dec 2022",
        sentAccepted: "0/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1006",
        first: "test3",
        last: "test3",
        email: "info.icenetwork@gmail.com",
        addedOn: "17 Dec 2022",
        sentAccepted: "0/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1012",
        first: "nopp",
        last: "w",
        email: "nopparat.mayawizard@gmail.com",
        addedOn: "24 Apr 2023",
        sentAccepted: "11/0",
        paidOutstanding: "0/0"
    },
    {
        online: true,
        active: true,
        requiresValidation: true,
        id: "ECA1017",
        first: "Nopp",
        last: "w",
        email: "info.icenetwork@gmail.com",
        addedOn: "3 Dec 2022",
        sentAccepted: "0/0",
        paidOutstanding: "0/0"
    },
    {
        online: false,
        active: true,
        requiresValidation: true,
        id: "ECA1007",
        first: "John",
        last: "Jacobsen",
        email: "nielsc59@gmail.com",
        addedOn: "17 Dec 2022",
        sentAccepted: "0/0",
        paidOutstanding: "0/0"
    },
    {
        online: false,
        active: true,
        requiresValidation: true,
        id: "ECA1005",
        first: "Albert",
        last: "Quotes",
        email: "niels@sfcloudwork.com",
        addedOn: "10 Dec 2022",
        sentAccepted: "46/2",
        paidOutstanding: "0/0"
    }
]




const Estimators = () => {

    const [searchQuery, setSearchQuery] = useState("");


    return (
        <div className="p-[15px] h-[100vh]">
            <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
                <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
                    Estimators
                </h1>

                <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        placeholder={"Search estimators"}
                    />

                    <Button
                        variant="contained"
                        className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
                    >
                        Add Estimator
                    </Button>
                </div>
            </div>

            <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
                <table className="table-auto w-full text-left">
                    <thead style={{ borderBottom: "2px solid #111111" }}>
                        <tr>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Online
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Active
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Requires Validation
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">Id</th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                First
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Last
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">Email</th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Added on
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">
                                Sent/Accepted
                            </th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer">Paid/Outstanding</th>
                            <th className="p-2 text-[#ffff] text-center cursor-pointer"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {estimatorData?.map((item, index) => (
                            <tr key={index} className="border-b border-[#202b34]">
                                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                                    <div className="require_vaild_list text-center">
                                        {item?.online ? <span className="dot-green"></span> : <span className="dot-red"></span>}
                                    </div>
                                </td>
                                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                                    <div className="require_vaild_list text-center">
                                        {item?.active ? <span className="dot-green"></span> : <span className="dot-red"></span>}
                                    </div>
                                </td>
                                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                                    <div className="require_vaild_list text-center">
                                        {item?.requiresValidation ? <span className="dot-green"></span> : <span className="dot-red"></span>}
                                    </div>
                                </td>

                                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                                    {item.id}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] cursor-pointer">
                                    <div className="whitespace-nowrap text-center">
                                    {item.first}
                                    </div>
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] cursor-pointer">
                                    <div className="whitespace-nowrap text-center">
                                    {item.last}
                                    </div>
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                                    {item.email}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    {item.addedOn}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    {item.sentAccepted}
                                </td>
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    {item.paidOutstanding}
                                </td>
                              
                                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                                    <div className="flex gap-[10px]">
                                        <a href="/admin/watch_details/watch_history">
                                            <img
                                                alt='star'
                                                id="star"
                                                width="30px"
                                                height="30px"
                                                style={{ filter: "invert(1)" }}
                                                src="https://www.estipal.com/assets/dist/images/icons/Watch history 2.png"
                                            />
                                        </a>
                                        <a href="/admin">
                                            <img
                                                alt='revanue'
                                                width="30px"
                                                height="30px"
                                                style={{ filter: "invert(1)" }}
                                                src="https://www.estipal.com/assets/dist/images/icons/Revenue.png"
                                            />
                                        </a>
                                        <a href="/admin/analysis/performance_analysis/estimator">
                                            <img
                                                alt='performance'
                                                width="30px"
                                                height="30px"
                                                style={{ filter: "invert(1)" }}
                                                src="https://www.estipal.com/assets/dist/images/icons/performance.png"
                                            />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationComponent totalPages={1} />
        </div>
    )
}

export default Estimators