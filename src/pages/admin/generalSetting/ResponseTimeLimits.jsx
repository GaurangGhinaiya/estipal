import React from "react";

const ResponseTimeLimits = () => {
  return (
    <div className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]">
      <div className="space-y-6 text-white">
        <SettingRow
          title="Estimators time limit to reply to estimates"
          value="5"
          unit="Minutes"
        />
        <SettingRow
          title="If no estimator reply, cancel all requests after"
          value="1"
          unit="Days"
        />
        <SettingRow
          title="If staff don't reply to estimators, send reminder after"
          value="15"
          unit="Minutes"
        />
        <SettingRow
          title="If staff don't reply to estimators, send reminder every"
          value="3"
          unit="Hours"
        />
        <SettingRow
          title="If staff don't reply to estimators, Archive the requests after"
          value="1"
          unit="Days"
        />
        <SettingRow
          title="Archived requests remove after"
          value="2"
          unit="Days"
        />
        <SettingRow
          title="Estimator is auto-selected if no estimator is selected by Estipal within"
          value="3"
          unit="Minutes"
        />
      </div>
    </div>
  );
};

const SettingRow = ({ title, value, unit }) => {
  return (
    <div className="flex items-center w-full justify-between lg:justify-start">
      <span className="text-sm font-medium w-[45%]">{title}</span>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          className="w-[70px] flex items-center justify-center text-center px-2 py-1 bg-gray-700 text-[#FFA13C] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-[#3c8dbc]"
        />
        <span>{unit}</span>
      </div>
    </div>
  );
};

export default ResponseTimeLimits;
