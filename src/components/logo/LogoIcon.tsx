import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  const theme = useTheme();

  return (
    /**
     * 如果你希望使用图片而不是 SVG，请取消注释以下内容，并注释掉 <svg> 元素。
     *
     * <img src={theme.palette.mode === 'dark' ? logoIconDark : logoIcon} alt="XGW" width="50" />
     *
     */
    <svg
      fill="#000000"
      width="93px"
      height="93px"
      viewBox="-2.56 -2.56 20 37.12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M21.396 6.719l10.604 10.604-3.609 3.615-6.995-6.995-2.458 2.469-3.62-3.615zM14.203 13.917l3.609 3.62 3.396 3.385-3.62 3.609-6.984-6.984-5.568 5.568-1.427 1.417-3.609-3.609 10.604-10.604z"></path>
      </g>
    </svg>
  );
};

export default LogoIcon;
