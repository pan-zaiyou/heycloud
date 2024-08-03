import { useTheme } from '@mui/material/styles';
// import logoDark from 'assets/images/logo-dark.svg';
// import logo from 'assets/images/logo.svg';

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
      <img
        src={
          theme.palette.mode === 'dark'
            ? 'src/assets/images/logo-dark.png'
            : 'src/assets/images/logo.png'
        }
        alt="MOEU"
        width="100"
        {...others}
      />
    </>
  );
};

export default LogoMain;
