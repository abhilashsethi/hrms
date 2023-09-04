import { IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { AdminBreadcrumbs, HeadText } from "components/core";
import { ProfessionalTaxInfo } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { PayRoll } from "types";

const ViewConfig = () => {
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const { data: configData, mutate } = useFetch<PayRoll[]>(
    `payrolls/getAllPayrollConfigs`
  );

  return (
    <PanelLayout title="View Config - Admin Panel">
      <AdminBreadcrumbs links={links} />
      <section className="w-full px-2 md:py-4 py-2 flex justify-center items-center">
        <div className="md:p-6 px-4 md:w-2/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <ProfessionalTaxInfo
            open={isInfo}
            handleClose={() => setIsInfo(false)}
            data={configData}
            ptTax={configData?.length && configData[0]?.ptTaxes}
            mutate={mutate}
          />
          <div className="mt-4">
            <div className="text-xl pb-2 flex justify-between items-center">
              <HeadText title="Payroll Config" />
              <Tooltip title="Edit">
                <IconButton onClick={() => setIsInfo(true)}>
                  <ICONS.Edit className="h-6 w-6" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="font-medium py-1.5">
              {configData?.length && (
                <>
                  <div className="grid lg:grid-cols-3 pb-4 gap-1 text-lg">
                    <p className="text-gray-800 lg:col-span-2">
                      Basic Salary :{" "}
                    </p>
                    <p className=" text-gray-500">
                      {configData[0]?.basicSalary} %
                    </p>

                    <p className="text-gray-800 lg:col-span-2">HRA :</p>
                    <p className=" text-gray-500">{configData[0]?.hra} %</p>

                    <p className="text-gray-800 lg:col-span-2">
                      Conveyance Allowances :
                    </p>
                    <p className=" text-gray-500">
                      {configData[0]?.conveyanceAllowances} Rs.
                    </p>

                    <p className="text-gray-800 lg:col-span-2">
                      Medical Allowances :
                    </p>
                    <p className=" text-gray-500">
                      {configData[0]?.medicalAllowances} Rs.
                    </p>

                    <p className="text-gray-800 lg:col-span-2">PF Employee :</p>
                    <p className=" text-gray-500">
                      {configData[0]?.pfEmployee} %
                    </p>

                    <p className="text-gray-800 lg:col-span-2">PF Employer :</p>
                    <p className=" text-gray-500">
                      {configData[0]?.pfEmployer} %
                    </p>

                    <p className="text-gray-800 lg:col-span-2">
                      ESI Employee :
                    </p>
                    <p className=" text-gray-500">
                      {configData[0]?.esiEmployee} %
                    </p>

                    <p className="text-gray-800 lg:col-span-2">
                      ESI Employer :
                    </p>
                    <p className=" text-gray-500">
                      {configData[0]?.esiEmployer} %
                    </p>
                  </div>

                  <HeadText title="Professional Tax Slab" />
                  <div className="pt-3 md:block hidden">
                    {configData[0]?.ptTaxes?.map((item, i) => {
                      return (
                        <div key={i} className="flex py-1 gap-3 w-full text-lg">
                          <p className=" text-gray-500">
                            <span className="text-gray-800">Form : </span>
                            {item?.startGrossSalary}
                          </p>
                          <p className=" text-gray-500">
                            <span className="text-gray-800">To : </span>
                            {item?.endGrossSalary}
                          </p>
                          -
                          <p className=" text-gray-500">
                            <span className="text-gray-800">Tax : </span>
                            {item?.tax}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-3 md:hidden block">
                    {configData[0]?.ptTaxes?.map((item, i) => {
                      return (
                        <div
                          key={i}
                          className="py-1 gap-3 w-full px-2 my-2 border-2 border-emerald-500 text-lg"
                        >
                          <div className="flex gap-1 justify-between">
                            <div className=" grid gap-1 text-center text-gray-500">
                              <span className="text-gray-800">Form </span>
                              <span>{item?.startGrossSalary}</span>
                            </div>
                            <div className=" grid gap-1 text-center text-gray-500">
                              <span className="text-gray-800">To </span>
                              <span>
                                {item?.endGrossSalary
                                  ? item?.endGrossSalary
                                  : "---"}
                              </span>
                            </div>

                            <div className="grid gap-1 text-center text-gray-500">
                              <span className="text-gray-800">Tax </span>
                              <span>{item?.tax}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default ViewConfig;

const links = [
  { id: 1, page: "View Payroll Config", link: "/admin/payroll/view-config" },
];
