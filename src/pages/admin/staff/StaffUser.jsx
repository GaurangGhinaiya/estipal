import { Button } from "@mui/material";
import React, { useState } from "react";
import PaginationComponent from "../../../components/common/PaginationComponent";
import SearchBar from "../../../components/common/SearchBar";

const staffUserData = [
  {
    active: true,
    id: "SCA1000",
    company: "M",
    contact: "John wewe",
    email: "nopparat_sat@maya-wizard.com",
    username: "mayawizard",
    addedOn: "11 Nov 2022",
    staff: 3,
    sentAccepted: "45/16",
  },
  {
    active: true,
    id: "SCA1001",
    company: "MLA Thai",
    contact: "paolo M",
    email: "admin@mlathai.com",
    username: "paolom",
    addedOn: "28 Nov 2022",
    staff: 5,
    sentAccepted: "7/1",
  },
  {
    active: true,
    id: "SCA1009",
    company: "Estipal, LLC",
    contact: "Niels Christensen",
    email: "niels@estipal.com",
    username: "nielschristensen",
    addedOn: "08 Dec 2022",
    staff: 4,
    sentAccepted: "35/8",
  },
  {
    active: true,
    id: "SCA1010",
    company: "Test",
    contact: "test3 test3",
    email: "nopparat@scouse.tech",
    username: "test3test3",
    addedOn: "08 Dec 2022",
    staff: 2,
    sentAccepted: "0/0",
  },
  {
    active: true,
    id: "SCA1011",
    company: "maya",
    contact: "nopparat w",
    email: "nopparat.mayawizard2@gmail.com",
    username: "nopparatw",
    addedOn: "24 Apr 2023",
    staff: 0,
    sentAccepted: "0/0",
  },
  {
    active: true,
    id: "SCA1012",
    company: "maya",
    contact: "Nopparat W",
    email: "info.icenetwork@gmail.com",
    username: "nopparatw",
    addedOn: "24 Apr 2023",
    staff: 2,
    sentAccepted: "7/3",
  },
  {
    active: true,
    id: "SCA1013",
    company: "test2",
    contact: "test2 maya",
    email: "nopparat.mayawizard@gmail.com",
    username: "test2maya",
    addedOn: "03 May 2023",
    staff: 0,
    sentAccepted: "0/0",
  },
];

const StaffUser = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-[15px] h-[100vh]">
      <div className="px-0 sm:px-[15px] flex justify-between flex-wrap">
        <h1 className="text-[30px] font-medium mb-4 px-0 sm:px-[15px] font-sans text-white">
          Merchants & Staff
        </h1>

        <div className="flex justify-between items-center mb-4 gap-4 sm:gap-8 flex-wrap ">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={"Search sellers/staffs"}
          />

          <Button
            variant="contained"
            className="!bg-[#1760a9] !normal-case !py-[10px] !px-[40px] !rounded-[50px]"
          >
            Add Merchant
          </Button>
        </div>
      </div>

      <div className="w-[95.5%] overflow-auto mx-auto pt-[10px]">
        <table className="table-auto w-full text-left">
          <thead style={{ borderBottom: "2px solid #111111" }}>
            <tr>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Active
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">Id</th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Company
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Contact
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">Email</th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Username
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Added on
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">Staff</th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer">
                Sent/Accepted
              </th>
              <th className="p-2 text-[#ffff] text-center cursor-pointer"></th>
            </tr>
          </thead>
          <tbody>
            {staffUserData.map((item, index) => (
              <tr key={index} className="border-b border-[#202b34]">
                <td className="px-[18px] py-[0px] text-[#ffff] text-center">
                  <div className="require_vaild_list text-center">
                    <span className="dot-green"></span>
                  </div>
                </td>

                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                  {item.id}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] cursor-pointer">
                  <div className="whitespace-nowrap text-center">
                    {item.company}
                  </div>
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center">
                  {item.contact}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] whitespace-nowrap text-center cursor-pointer">
                  {item.email}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center">
                  {item.username}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.addedOn}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.staff}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  {item.sentAccepted}
                </td>
                <td className="px-[18px] py-[12px] text-[#ffff] text-center whitespace-nowrap">
                  <div className="flex gap-[10px]">
                    <a href="https://www.estipal.com//admin/watch_details/watch_history?seller_id=1000">
                      <img
                        id="star"
                        width="30px"
                        height="30px"
                        style={{ filter: "invert(1)" }}
                        src="https://www.estipal.com/assets/dist/images/icons/Watch history 2.png"
                      />
                    </a>
                    <a href="#">
                      <img
                        width="30px"
                        height="30px"
                        style={{ filter: "invert(1)" }}
                        src="https://www.estipal.com/assets/dist/images/icons/Revenue.png"
                      />
                    </a>
                    <a href="https://www.estipal.com/admin/analysis/performance_analysis/seller/1000">
                      <img
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
  );
};

export default StaffUser;
