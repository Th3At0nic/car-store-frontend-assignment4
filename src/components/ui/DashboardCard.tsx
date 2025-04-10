type DashboardCardProps = {
  title: string;
  value: string | number;
};

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow text-center" style={{padding: "15px"}}>
      <h3 className="text-lg font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default DashboardCard;
