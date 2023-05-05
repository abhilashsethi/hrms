import { Login } from "@mui/icons-material";
import { Button } from "@mui/material";
import { LOGO } from "assets";
import Link from "next/link";
// import { uploadFile } from "utils";

export default function Home() {
  return (
    <>
      <section className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-3">
          <img className="h-8 object-contain" src={LOGO.src} alt="" />
          <h1 className="font-semibold tracking-wide text-lg">
            HRMS | Searchingyard
          </h1>
          <Link href="/login">
            <Button
              className="!bg-theme"
              variant="contained"
              startIcon={<Login />}
            >
              LOGIN TO PANEL
            </Button>
          </Link>
        </div>
      </section>
      {/* <section className="h-screen w-full flex justify-center items-center">
        <input
          type="file"
          onChange={async (e) => {
            try {
              const file = e?.target?.files?.[0];
              if (!file) return;
              const url = await uploadFile(file, "hello.png");
              console.log(url);
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </section> */}
    </>
  );
}
