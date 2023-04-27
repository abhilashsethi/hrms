import MaterialTable from "@material-table/core";
import {
  GridViewRounded,
  QrCodeScannerRounded,
  AddCardRounded,
  TableRowsRounded,
} from "@mui/icons-material";
import { IconButton, Paper, Tooltip } from "@mui/material";
import {
  AllRollGrid,
  AllScannedColumn,
  AllScannedGrid,
} from "components/admin";
import {
  AdminBreadcrumbs,
  HeadStyle,
  IOSSwitch,
  Loader,
  TextTitles,
} from "components/core";
import { CardAssign } from "components/drawer";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { Card, User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const Cards = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const { data, isLoading, mutate } = useFetch<Card[]>(`cards`);
  const { data: users, isLoading: isUsersFetching } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const handleBlock = async (e: any, cardId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`cards/${cardId}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!!", "success");
        return;
      }
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout title="Scanned Cards - SY HR MS">
      <section className="px-8 py-4">
        <div className="flex justify-between items-center py-4">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <IconButton onClick={() => setIsGrid(true)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    isGrid && `border-2 border-theme`
                  }`}
                >
                  <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
              <IconButton onClick={() => setIsGrid(false)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    !isGrid && `border-2 border-theme`
                  }`}
                >
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
          </div>
        </div>
        {isGrid ? <AllScannedGrid /> : <AllScannedColumn />}

        <CardAssign
          cardId={isAssign?.activeCardId}
          open={isAssign?.drawer}
          onClose={() => setIsAssign({ drawer: false })}
          mutate={mutate}
        />
      </section>
    </PanelLayout>
  );
};

export default Cards;
const links = [
  { id: 1, page: "Cards", link: "/admin/cards" },
  { id: 2, page: "Scanned Cards", link: "/admin/cards/scanned" },
];
