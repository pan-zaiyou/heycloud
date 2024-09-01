// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();
  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="跨越长城" width="100" />
     *
     */
    <>
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="125"
  height="125"
  viewBox="0 0 375 375"
  preserveAspectRatio="xMidYMid meet"
  version="1.0"
  {...others}
>
  <defs>
    <g />
  </defs>
  <text
    x="50%"
    y="50%"
    font-family="Arial"
    font-size="40"
    fill={fillColor}
    text-anchor="middle"
    alignment-baseline="middle"
  >
    跨越长城
  </text>
</svg>

    </>
  );
};

export default LogoMain;
