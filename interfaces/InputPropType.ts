export interface InputPropType {
  type: string;
  id: string;
  name: string;
  required?: boolean;
  className: string;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
