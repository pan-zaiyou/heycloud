import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  
  // 根据主题模式设置 SVG 的填充颜色
  const fillColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <div
      style={{
        position: 'absolute',
        top: '-5px',  // 向下移动一点点
        left: '0px', // 稍微向右移动
        zIndex: 10,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 375 375" preserveAspectRatio="xMidYMid meet">
    <rect x="-37.5" width="450" height="450" fill="#ffffff"/>
    <path fill="#000000" d="M 75.421875 25.398438 L 107.9375 57.914062 L 96.871094 68.996094 L 75.421875 47.546875 L 67.882812 55.121094 L 56.785156 44.035156 Z M 53.363281 47.46875 L 64.429688 58.570312 L 74.84375 68.949219 L 63.746094 80.015625 L 42.328125 58.601562 L 25.253906 75.671875 L 20.878906 80.019531 L 9.8125 68.953125 L 42.328125 36.4375 Z M 53.363281 47.46875 "/>
    <g fill="#000000">
        <!-- Your transformed paths go here -->
    </g>
</svg>

    </div>
  );
};

export default LogoMain;
