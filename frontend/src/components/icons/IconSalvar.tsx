import IconBase, { type IconProps } from "./IconBase";

export default function IconSalvar(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <path d="M17 21V13H7v8" />
      <path d="M7 3v5h8" />
    </IconBase>
  );
}
