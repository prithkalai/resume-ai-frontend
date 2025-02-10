interface Props {
  title: string;
  placeHolder: string;
}
const TextBox = ({ title, placeHolder }: Props) => {
  return (
    <div className="flex flex-col ">
      <span className="font-syncopate">{title}</span>
      <textarea
        className="border-[1px] border-gray-400 min-h-[22rem] rounded-md shadow-md w-full font-funnelsans h-full p-2"
        placeholder={placeHolder}
      />
    </div>
  );
};

export default TextBox;
