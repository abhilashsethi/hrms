import Image from "next/image";
import { Inter } from "next/font/google";
import { Search } from "@mui/icons-material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="h-screen w-full flex justify-center items-center">
      <p>Home Page...</p>
    </section>
  );
}
