import { AddCardRounded } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { CardNameComponent, IOSSwitch, TextTitles } from "components/core";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { useState } from "react";
import { Card } from "types";
import { CardAssign } from "components/drawer";
const AllScannedGrid = () => {
  const [isAssign, setIsAssign] = useState<{
    drawer?: boolean;
    activeCardId?: string | null;
  }>({
    drawer: false,
    activeCardId: null,
  });
  const { data, isLoading, mutate } = useFetch<Card[]>(`cards`);
  const { change } = useChange();
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
  return (
    <>
      <TextTitles title="Scanned Cards" />

      <div className="mt-4">
        <Grid container spacing={2}>
          {data?.map((item) => (
            <Grid key={item?.id} item lg={3}>
              <div className="py-6 px-4 bg-slate-50 w-full shadow-lg rounded-lg flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    Card Id: {item?.cardId}
                  </p>
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    User name: <CardNameComponent userId={item?.userId} />
                  </p>

                  <div className="grid justify-items-center gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:shadow-xl flex justify-center items-center text-lg font-semibold">
                      <Tooltip title="Assign User">
                        <IconButton
                          onClick={() => {
                            setIsAssign({
                              drawer: true,
                              activeCardId: item?.cardId,
                            });
                          }}
                        >
                          <AddCardRounded
                            className="!text-theme"
                            fontSize="large"
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <p className="font-semibold tracking-wide text-sm">
                      Unblock/Block
                    </p>
                    <IOSSwitch
                      checked={item?.isBlocked}
                      onChange={(e) => handleBlock(e, item?.cardId)}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <CardAssign
        cardId={isAssign?.activeCardId}
        open={isAssign?.drawer}
        onClose={() => setIsAssign({ drawer: false })}
        mutate={mutate}
      />
    </>
  );
};

export default AllScannedGrid;
