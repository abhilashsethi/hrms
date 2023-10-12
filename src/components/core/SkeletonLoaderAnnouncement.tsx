import { Container } from "@mui/material";

const SkeletonLoaderAnnouncement = () => {
  return (
    <section className="my-8 w-full">
      <div className="grid gap-4">
        <Container>
          {skeletons?.map((item, index) => (
            <div
              key={item?.id}
              className="flex transition duration-500 py-2 my-6 shadow-lg rounded-lg px-2 w-full bg-gray-300 animate-pulse ease-in-out gap-5  overflow-hidden "
            >
              <div className="grid grid-cols-3 gap-4 p-4 w-full rounded ">
                <div className="flex col-span-2 gap-4 items-center ">
                  <span className="text-lg bg-gray-500 rounded-full px-4 py-4"></span>
                  <span className="text-lg w-full bg-gray-500 rounded-md px-4 py-4"></span>
                </div>
                <div className="flex items-center gap-4 justify-end">
                  <span className="text-xs rounded-lg w-36 text-gray-500 bg-gray-500 px-4 py-4"></span>
                  <span className="text-xs rounded-lg text-gray-500 bg-gray-500 px-4 py-4"></span>
                  <span className="text-xs rounded-lg text-gray-500 bg-gray-500 px-4 py-4"></span>
                  {/* <span className="text-xs">{item?.desc}</span> */}
                </div>
              </div>

              <div className="grid gap-5 grid-cols-2 px-4 items-center text-xs uppercase tracking-wide font-semibold"></div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
};

export default SkeletonLoaderAnnouncement;
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
