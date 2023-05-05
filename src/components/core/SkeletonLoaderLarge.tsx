import { Box, Grid, Skeleton } from "@mui/material";

const SkeletonLoaderLarge = () => {
  return (
    <section className="my-8 w-full">
      <Grid container spacing={3}>
        {skeletons?.map((item) => (
          <Grid key={item?.id} item lg={4}>
            <div className="w-full border-2 h-[24rem] px-8 py-8 rounded-lg">
              <div className="flex justify-center pr-8">
                <Skeleton
                  variant="circular"
                  width={50}
                  height={50}
                  sx={{ marginBottom: "1rem" }}
                />
              </div>
              <Skeleton variant="rectangular" width="100%" height={118} />
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

export default SkeletonLoaderLarge;
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
];
