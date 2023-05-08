import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <section className="my-8 w-full">
      <Grid container spacing={3}>
        {skeletons?.map((item) => (
          <Grid key={item?.id} item lg={3}>
            <div className="w-full border-2 py-4 rounded-md">
              <div className="flex justify-center">
                <Skeleton
                  variant="circular"
                  width={70}
                  height={70}
                  sx={{ marginBottom: "1rem" }}
                />
              </div>
              {/* <Skeleton variant="rectangular" width={210} height={118} /> */}
              <Box
                sx={{
                  pt: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Skeleton width="60%" />
                <Skeleton width="80%" />
                <Skeleton width="60%" sx={{ marginBottom: "0.6rem" }} />
                <Skeleton variant="rectangular" width="60%" height={40} />
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default SkeletonLoader;
interface Props {
  id?: number;
}

const skeletons: Props[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];
