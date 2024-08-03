import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return (
    /**
     * 如果你希望使用图片而不是 SVG，请取消注释以下内容，并注释掉 <svg> 元素。
     *
     * <img src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <svg
      fill="#000000"
      width="93px"
      height="93px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M14.156 15.297l6.25 4.927-4.141-10.214zM16 0c-8.839 0-16 7.161-16 16s7.161 16 16 16c8.839 0 16-7.161 16-16s-7.161-16-16-16zM23.729 23.073c-0.016 0.63-0.536 1.125-1.167 1.109-0.313 0-0.552-0.12-0.885-0.391l-8.255-6.667-2.771 6.938h-2.396l6.995-16.807c0.167-0.422 0.568-0.693 1.021-0.677 0.432-0.016 0.839 0.25 0.99 0.677l6.365 15.323c0.057 0.151 0.104 0.313 0.104 0.464 0 0.010 0 0.010 0 0.031z"></path>
      </g>
    </svg>
  );
};

export default LogoIcon;
