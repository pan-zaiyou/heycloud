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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="110"
        zoomAndPan="magnify"
        viewBox="0 -90 375 375"
        height="110"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
        {...others}
      >
        <defs><g/></defs>
        <path
          fill={fillColor}
          d="M 113.921875 124.300781 L 162.40625 172.785156 L 145.90625 189.3125 L 113.921875 157.328125 L 102.683594 168.617188 L 86.132812 152.089844 Z M 81.035156 157.210938 L 97.535156 173.761719 L 113.0625 189.238281 L 96.511719 205.738281 L 64.578125 173.808594 L 39.121094 199.265625 L 32.59375 205.746094 L 16.09375 189.242188 L 64.578125 140.757812 Z M 81.035156 157.210938"
          fillOpacity="1"
          fillRule="nonzero"
        />
        <g fill={fillColor}>
          <g transform="translate(160.335169, 207.749986)">
            <path d="M 64.578125 0 L 45.71875 0 L 30.578125 -21.8125 L 15.453125 0 L -2.640625 0 L 21.578125 -34.46875 L 1.390625 -64.046875 L 18.78125 -64.046875 L 30.578125 -46.578125 L 42.390625 -64.046875 L 60.546875 -64.046875 L 39.59375 -34.46875 Z M 64.578125 0" />
          </g>
        </g>
        <g fill={fillColor}>
          <g transform="translate(218.398522, 207.749986)">
            <path d="M 62.5625 -35.859375 L 62.5625 -21.96875 C 60.90625 -14.363281 57.28125 -8.601562 51.6875 -4.6875 C 46.101562 -0.78125 39.867188 1.171875 32.984375 1.171875 C 24.347656 1.171875 16.988281 -2.0625 10.90625 -8.53125 C 4.820312 -15 1.78125 -22.816406 1.78125 -31.984375 C 1.78125 -41.296875 4.753906 -49.160156 10.703125 -55.578125 C 16.660156 -61.992188 24.085938 -65.203125 32.984375 -65.203125 C 43.390625 -65.203125 51.617188 -61.554688 57.671875 -54.265625 L 48.125 -43.78125 C 44.707031 -49.269531 39.945312 -52.015625 33.84375 -52.015625 C 29.34375 -52.015625 25.5 -50.054688 22.3125 -46.140625 C 19.132812 -42.234375 17.546875 -37.515625 17.546875 -31.984375 C 17.546875 -26.546875 19.132812 -21.898438 22.3125 -18.046875 C 25.5 -14.191406 29.34375 -12.265625 33.84375 -12.265625 C 37.570312 -12.265625 40.816406 -13.390625 43.578125 -15.640625 C 46.347656 -17.890625 47.734375 -20.878906 47.734375 -24.609375 L 32.984375 -24.609375 L 32.984375 -35.859375 Z M 62.5625 -35.859375" />
          </g>
        </g>
        <g fill={fillColor}>
          <g transform="translate(278.868247, 207.749986)">
            <path d="M 53.796875 0 L 43.546875 -35.9375 L 33.296875 0 L 17.078125 0 L -1.171875 -64.046875 L 15.0625 -64.046875 L 26 -20.109375 L 26.390625 -20.109375 L 38.03125 -64.046875 L 49.0625 -64.046875 L 60.703125 -20.109375 L 61.09375 -20.109375 L 72.03125 -64.046875 L 88.1875 -64.046875 L 69.9375 0 Z M 53.796875 0" />
          </g>
        </g>
      </svg>
    </>
  );
};

export default LogoMain;
