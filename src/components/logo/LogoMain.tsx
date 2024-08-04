import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  
  // 根据主题模式设置 SVG 的填充颜色
  const fillColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

  return (
    /**
     * 如果想使用图片代替 SVG，请取消以下代码的注释，并注释掉 <svg> 元素。
     *
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="XGW" width="100" />
     *
     */
    <>
      <svg fill={fillColor} width="80px" height="53px" viewBox="0 -2 37.12 28.12" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M21.396 6.719l10.604 10.604-3.609 3.615-6.995-6.995-2.458 2.469-3.62-3.615zM14.203 13.917l3.609 3.62 3.396 3.385-3.62 3.609-6.984-6.984-5.568 5.568-1.427 1.417-3.609-3.609 10.604-10.604z"></path>
        </g>
      </svg>
    </>
  );
};

export default LogoMain;
