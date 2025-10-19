const Die: React.FC<{ value: number }> = ({ value }) => {
  return <button className="die">{value}</button>;
};

export default Die;
