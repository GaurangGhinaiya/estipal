import React from "react";

const ResponseTimeLimits = ({ data, setData, isEditable }) => {
  return (
    <div className="bg-[#1E252B] p-6 rounded-lg w-full mb-[15px]">
      <div className="space-y-6 text-white">
        <SettingRow
          isEditable={isEditable}
          title="Estimators time limit to reply to estimates"
          value={data?.estimate_response_limit}
          unit="Minutes"
          onChange={(value) =>
            setData({ ...data, estimate_response_limit: value })
          }
        />
        <SettingRow
          isEditable={isEditable}
          title="If no estimator reply, cancel all requests after"
          value={data?.est_expire_time}
          unit="Days"
          onChange={(value) => setData({ ...data, est_expire_time: value })}
        />
        <SettingRow
          isEditable={isEditable}
          title="If staff don't reply to estimators, send reminder after"
          value={data?.staff_reminder}
          unit="Minutes"
          onChange={(value) => setData({ ...data, staff_reminder: value })}
        />
        <SettingRow
          isEditable={isEditable}
          title="If staff don't reply to estimators, send reminder every"
          value={data?.staff_every_hour_reminder}
          unit="Hours"
          onChange={(value) =>
            setData({ ...data, staff_every_hour_reminder: value })
          }
        />
        <SettingRow
          isEditable={isEditable}
          title="If staff don't reply to estimators, Archive the requests after"
          value={data?.staff_expire_time}
          unit="Days"
          onChange={(value) => setData({ ...data, staff_expire_time: value })}
        />
        <SettingRow
          isEditable={isEditable}
          title="Archived requests remove after"
          value={data?.quotation_expire_time}
          unit="Days"
          onChange={(value) =>
            setData({ ...data, quotation_expire_time: value })
          }
        />
        <SettingRow
          isEditable={isEditable}
          title="Estimator is auto-selected if no estimator is selected by Estipal within"
          value={data?.admin_assign_time}
          unit="Minutes"
          onChange={(value) => setData({ ...data, admin_assign_time: value })}
        />
      </div>
    </div>
  );
};

const SettingRow = ({ title, value, unit, isEditable, onChange }) => {
  return (
    <div className="flex items-center w-full justify-between lg:justify-start">
      <span className="text-sm font-medium w-[45%]">{title}</span>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={value}
          readOnly={!isEditable}
          onChange={(e) => onChange(e.target.value)}
          className="w-[70px] flex items-center justify-center text-center px-2 py-1 bg-gray-700 text-[#FFA13C] rounded border border-gray-600 focus:outline-none focus:ring focus:ring-[#3c8dbc]"
        />
        <span>{unit}</span>
      </div>
    </div>
  );
};

export default ResponseTimeLimits;
