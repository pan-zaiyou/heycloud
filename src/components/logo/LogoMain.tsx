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
        top: '-10px',  // 向下移动一点点
        left: '-5px', // 稍微向右移动
        zIndex: 10,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="130"  // 调整后的宽度
        height="130" // 调整后的高度
        viewBox="0 0 375 375"  // 适应新的 viewBox
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
        {...others}
      >
        <defs><g/></defs>
        <path fill={fillColor} d="M 88.84375 12.222656 L 129.585938 52.964844 L 115.71875 66.855469 L 88.84375 39.976562 L 79.398438 49.464844 L 65.488281 35.574219 Z M 61.207031 39.878906 L 75.070312 53.785156 L 88.121094 66.792969 L 74.210938 80.660156 L 47.378906 53.824219 L 25.984375 75.21875 L 20.5 80.664062 L 6.632812 66.796875 L 47.378906 26.054688 Z M 61.207031 39.878906 " fillOpacity="1" fillRule="nonzero"/>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(139.989045, 75.174895)">
            <g>
              <path d="M 3.734375 -45.734375 L 3.734375 0 L 14.265625 0 L 14.265625 -32.671875 L 14.40625 -32.671875 L 23 0 L 31.9375 0 L 40.265625 -32.671875 L 40.40625 -32.671875 L 40.40625 0 L 53.46875 0 L 53.46875 -45.734375 L 35 -45.734375 L 28.734375 -21.46875 L 28.609375 -21.46875 L 22.0625 -45.734375 Z M 3.734375 -45.734375 "/>
            </g>
          </g>
        </g>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(194.655681, 75.174895)">
            <g>
              <path d="M 20.0625 -34.734375 C 9.9375 -34.734375 3.859375 -30.796875 2.328125 -24.0625 L 14.46875 -22.9375 C 14.796875 -25.40625 16.53125 -26.734375 19.671875 -26.734375 C 22.609375 -26.734375 23.671875 -25.796875 23.671875 -22.53125 L 23.671875 -22.203125 C 15 -21.671875 9.140625 -20.265625 6 -18 C 2.859375 -15.734375 1.328125 -12.9375 1.328125 -9.59375 C 1.328125 -3.328125 6.265625 0.671875 13.203125 0.671875 C 17.796875 0.671875 21.671875 -0.796875 24.328125 -4.734375 C 24.328125 -2.796875 24.53125 -1.40625 24.796875 0 L 37.53125 0 C 36.609375 -2.328125 36.46875 -4.46875 36.46875 -7.0625 L 36.46875 -23.40625 C 36.46875 -31.671875 30.0625 -34.734375 20.0625 -34.734375 Z M 15.140625 -10.46875 C 15.140625 -13.671875 18.265625 -15.40625 23.671875 -15.9375 L 23.671875 -14.328125 C 23.671875 -8.140625 21.203125 -7.328125 18.59375 -7.328125 C 16.46875 -7.328125 15.140625 -8.265625 15.140625 -10.46875 Z M 15.140625 -10.46875 "/>
            </g>
          </g>
        </g>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(230.655659, 75.174895)">
            <g>
              <path d="M 25 -34.734375 C 20.203125 -34.734375 16.671875 -32.671875 15.328125 -29.265625 L 15.203125 -29.265625 L 15.203125 -34.0625 L 2.734375 -34.0625 L 2.734375 0 L 15.9375 0 L 15.9375 -19.9375 C 15.9375 -23.9375 17.265625 -25.609375 19.9375 -25.609375 C 21.875 -25.609375 22.796875 -24.46875 22.796875 -21.0625 L 22.796875 0 L 36 0 L 36 -23.671875 C 36 -32.203125 30.875 -34.734375 25 -34.734375 Z M 25 -34.734375 "/>
            </g>
          </g>
        </g>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(266.655643, 75.174895)">
            <g>
              <path d="M 18.0625 -45.34375 L 6.59375 -44.875 L 5.59375 -34.0625 L 0.0625 -34.0625 L 0.0625 -25.40625 L 5 -25.40625 L 5 -9.875 C 5 -4.140625 9.0625 0.796875 15.9375 0.796875 C 18.140625 0.796875 22.203125 0.328125 24.875 -0.328125 L 24.875 -9.875 C 23.796875 -9.59375 22.40625 -9.265625 21.0625 -9.265625 C 18.734375 -9.265625 18.203125 -10.46875 18.203125 -12 L 18.203125 -25.40625 L 24.875 -25.40625 L 24.875 -34.0625 L 18.0625 -34.0625 Z M 18.0625 -45.34375 "/>
            </g>
          </g>
        </g>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(290.655628, 75.174895)">
            <g>
              <path d="M 3.140625 -46.40625 L 3.140625 -37.34375 L 16.328125 -37.34375 L 16.328125 -46.40625 Z M 3.140625 -34.0625 L 3.140625 0 L 16.328125 0 L 16.328125 -34.0625 Z M 3.140625 -34.0625 "/>
            </g>
          </g>
        </g>
        <g fill={fillColor} fillOpacity="1">
          <g transform="translate(307.988954, 75.174895)">
            <g>
              <path d="M 18.671875 -34.734375 C 8.59375 -34.734375 2.53125 -29.671875 2.53125 -23.203125 C 2.53125 -18.59375 4.859375 -15.53125 8.9375 -13.796875 C 11 -12.875 14.59375 -12.140625 19.734375 -11.53125 C 22.46875 -11.203125 23.875 -10.53125 23.875 -9.53125 C 23.875 -8.140625 22.0625 -7.40625 18.796875 -7.40625 C 13.9375 -7.40625 12 -8.875 11.53125 -11.0625 L 0.9375 -9.671875 C 3.0625 -2.9375 8.796875 0.671875 18.0625 0.671875 C 28.203125 0.671875 35.671875 -3.40625 35.671875 -11.40625 C 35.671875 -15.40625 33.671875 -18.59375 30.140625 -20.53125 C 28.328125 -21.53125 25.140625 -22.265625 20.40625 -22.734375 C 15.328125 -23.203125 13.875 -23.609375 13.875 -25.140625 C 13.875 -26.140625 15.671875 -26.9375 18.140625 -26.9375 C 21.140625 -26.9375 23.328125 -25.796875 24.0625 -23.9375 L 34.140625 -25.875 C 32.203125 -31.46875 26.328125 -34.734375 18.671875 -34.734375 Z M 18.671875 -34.734375 "/>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LogoMain;
