import { Link } from "react-router-dom";

type ActionButtonProps = {
  label: string;
  link: string;
};

const ActionButton = ({ label, link }: ActionButtonProps) => {
  return (
    <Link
      to={link}
      className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      style={{padding:"15px"}}
    >
      {label}
    </Link>
  );
};

export default ActionButton;
