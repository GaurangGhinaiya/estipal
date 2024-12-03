import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Translation = () => {
  const [translations, setTranslations] = useState([
    { code: "ENG", value: "Back to Activities list" },
    { code: "ITA", value: "Torna all'elenco delle attività" },
    { code: "ESP", value: "Volver a la lista de actividades" },
    { code: "CN", value: "返回活动列表" },
    { code: "JP", value: "" },
    { code: "PT", value: "" },
    { code: "TH", value: "" },
    { code: "AR", value: "" },
    { code: "HE", value: "" },
    { code: "HI", value: "" },
  ]);

  const handleEdit = (index) => {
    const newValue = prompt(
      "Enter new translation:",
      translations[index].value
    );
    if (newValue !== null) {
      setTranslations((prev) =>
        prev?.map((item, idx) =>
          idx === index ? { ...item, value: newValue } : item
        )
      );
    }
  };

  return (
    <div className="w-full my-[20px]">
      <div className="bg-[#1E252B] text-white p-6 rounded-lg shadow-lg">
        {translations?.map((translation, index) => (
          <div key={translation?.code} className="flex items-center justify-between gap-4 py-3">
            {/* Language Code */}
            <div className="w-12 text-center font-bold text-[16px] sm:pl-[35px] sm:pr-[50px] ">
              {translation?.code}
            </div>
            <div className="w-[85%] flex items-center bg-[#283641] text-white px-4 rounded-md h-[55px]">
              {translation?.value}
            </div>
            {/* Edit Button */}
            <button
              className="text-yellow-500"
              onClick={(e) => e.stopPropagation()}
            >
              <FaEdit size={30} onClick={() => handleEdit(index)} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Translation;
