import { uploadFile } from "utils";

export default function Home() {
  return (
    <section className="h-screen w-full flex justify-center items-center">
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
    </section>
  );
}
