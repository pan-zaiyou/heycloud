import { useTheme } from '@mui/material/styles';

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();

  // 根据主题模式设置 SVG 的填充颜色
  const fillColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="120px"
        height="120px"
        viewBox="0 0 150 150"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
        fill={fillColor}
        {...others}
      >
        <path
          d="M 133.234375 138.058594 L 173.976562 178.804688 L 160.109375 192.691406 L 133.234375 165.816406 L 123.789062 175.304688 L 109.878906 161.414062 Z M 105.59375 165.714844 L 119.460938 179.625 L 132.511719 192.632812 L 118.601562 206.496094 L 91.765625 179.664062 L 70.375 201.058594 L 64.890625 206.5 L 51.023438 192.636719 L 91.765625 151.890625 Z M 105.59375 165.714844 "
          fill-opacity="1"
          fill-rule="nonzero"
        />
        <g fill={fillColor} fill-opacity="1">
          <g transform="translate(172.645949, 203.897565)">
            <g>
              <path d="M 49.609375 0 L 35.125 0 L 23.5 -16.75 L 11.859375 0 L -2.03125 0 L 16.578125 -26.46875 L 1.078125 -49.1875 L 14.421875 -49.1875 L 23.5 -35.78125 L 32.5625 -49.1875 L 46.5 -49.1875 L 30.40625 -26.46875 Z M 49.609375 0 " />
            </g>
          </g>
        </g>
        <g fill={fillColor} fill-opacity="1">
          <g transform="translate(217.247365, 203.897565)">
            <g>
              <path d="M 48.0625 -27.546875 L 48.0625 -16.875 C 46.789062 -11.03125 44.003906 -6.609375 39.703125 -3.609375 C 35.410156 -0.609375 30.625 0.890625 25.34375 0.890625 C 18.707031 0.890625 13.050781 -1.59375 8.375 -6.5625 C 3.707031 -11.53125 1.375 -17.53125 1.375 -24.5625 C 1.375 -31.71875 3.65625 -37.757812 8.21875 -42.6875 C 12.789062 -47.613281 18.5 -50.078125 25.34375 -50.078125 C 33.332031 -50.078125 39.648438 -47.273438 44.296875 -41.671875 L 36.96875 -33.625 C 34.34375 -37.84375 30.6875 -39.953125 26 -39.953125 C 22.539062 -39.953125 19.585938 -38.453125 17.140625 -35.453125 C 14.691406 -32.453125 13.46875 -28.820312 13.46875 -24.5625 C 13.46875 -20.394531 14.691406 -16.828125 17.140625 -13.859375 C 19.585938 -10.898438 22.539062 -9.421875 26 -9.421875 C 28.863281 -9.421875 31.359375 -10.285156 33.484375 -12.015625 C 35.609375 -13.742188 36.671875 -16.039062 36.671875 -18.90625 L 25.34375 -18.90625 L 25.34375 -27.546875 Z M 48.0625 -27.546875 " />
            </g>
          </g>
        </g>
        <g fill={fillColor} fill-opacity="1">
          <g transform="translate(263.697239, 203.897565)">
            <g>
              <path d="M 41.3125 0 L 33.453125 -27.609375 L 25.578125 0 L 13.125 0 L -0.890625 -49.1875 L 11.5625 -49.1875 L 19.96875 -15.4375 L 20.265625 -15.4375 L 29.21875 -49.1875 L 37.6875 -49.1875 L 46.625 -15.4375 L 46.921875 -15.4375 L 55.328125 -49.1875 L 67.734375 -49.1875 L 53.71875 0 Z M 41.3125 0 " />
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export default LogoMain;
