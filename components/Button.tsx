"use client";
type ButtonProps = {
  onClick: () => void;
};
const Button = (props: ButtonProps) => {
  const handleClick = async () => {
    props.onClick();
  };
  return <button onClick={handleClick}>Add Log</button>;
};

export default Button;
