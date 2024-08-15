export type CustomListBoxProps = {
  setFilter: (setFilter: CustomFilterTypeProps) => void;
  customFilterTypes: CustomFilterTypeProps[];
  defaultValue: string;
};

export type CustomFilterTypeProps = {
  id: string;
  value: string;
};
