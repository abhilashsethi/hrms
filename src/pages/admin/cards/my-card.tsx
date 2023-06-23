import { Close, FilterListRounded } from "@mui/icons-material";
import {
     IconButton,
     MenuItem,
     Pagination,
     Stack,
     TextField,
     Tooltip,
} from "@mui/material";
import { AllScannedColumn, AllScannedGrid } from "components/admin";
import {
     AdminBreadcrumbs,
     GridAndList,
     Loader,
     LoaderAnime,
     SkeletonLoaderLarge,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import { Card } from "types";

const MyCard = () => {
     const [isGrid, setIsGrid] = useState(true);
     const { user } = useAuth();
     const links =
          [
               { id: 1, page: "My Cards", link: "/admin/cards/my-card" }
          ];
     const {
          data: cardData,
          isLoading,
          mutate,
     } = useFetch<Card[]>(
          `cards&${user?.id ? "" : `&userId=${user?.id}`}`
     );
     return (
          <PanelLayout title="Scanned Cards - Admin Panel">
               <section className="md:px-8 px-2 md:py-4 py-2">
                    <div className="flex justify-between md:items-center md:flex-row flex-col items-start">
                         <AdminBreadcrumbs links={links} />
                         <div className="flex justify-end w-full md:w-auto">
                              <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
                         </div>
                    </div>

                    <div>
                         {isGrid ? (
                              <>
                                   {isLoading && <SkeletonLoaderLarge />}
                                   <AllScannedGrid data={cardData} mutate={mutate} />
                              </>
                         ) : (
                              <>
                                   {isLoading && <Loader />}
                                   <AllScannedColumn data={cardData} user={user} mutate={mutate} />
                              </>
                         )}
                    </div>
                    {cardData?.length === 0 ? <LoaderAnime /> : null}

               </section>
          </PanelLayout>
     );
};

export default MyCard;

interface UserTypeItem {
     id?: number;
     value?: string | null;
     label?: string | null;
}


