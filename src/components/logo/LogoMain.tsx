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
     * <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="Mantis" width="100" />
     *
     */
    <>
      <svg fill="#000000" width="80px" height="80px" viewBox="-2 2 37.12 28.12" xmlns="http://www.w3.org/2000/svg">
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
