import { DEFAULTIMG } from "assets/home";

interface Props {
  photo?: string | null | undefined;
  name?: string;
  size?: string;
  className?: string;
}

const PhotoViewer = ({
  photo,
  name = "Searchingyard",
  size = "4rem",
  className,
}: Props) => {
  return (
    <div
      style={{ height: `${size}`, width: `${size}` }}
      className={`${className} rounded-full overflow-hidden shadow-xl`}
    >
      {photo && (
        <div className="bg-slate-200 h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={photo || DEFAULTIMG.src}
            alt="image"
            loading="lazy"
          />
        </div>
      )}
      {!photo ? (
        <div className="h-full w-full uppercase flex justify-center items-center text-4xl font-bold text-white bg-gradient-to-br from-theme-200 via-theme-50 to-secondary-200">
          {name?.slice(0, 1)}
        </div>
      ) : null}
    </div>
  );
};

export default PhotoViewer;
