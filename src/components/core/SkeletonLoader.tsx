import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoader = () => {
  return (
    <section className="my-8 w-full">
      <Grid container spacing={3}>
        {skeletons?.map((item) => (
          <Grid key={item?.id} item lg={3}>
            <div className="w-full">
              <div className="flex justify-center pr-8">
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ marginBottom: "1rem" }}
                />
              </div>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
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
