interface Props {
  description?: string | null;
}
const ProjectDescription = ({ description }: Props) => {
  return (
    <div className="w-full bg-white rounded-md shadow-jubilation p-6">
      <h1 className="font-semibold text-gray-600">Project Description</h1>
      <p className="text-sm tracking-wide mt-4">
        {description ? description : `No description!`}
      </p>
    </div>
  );
};

export default ProjectDescription;
