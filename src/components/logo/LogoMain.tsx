// material-ui
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
      <img src={theme.palette.mode ==='dark' ? "https://i.loli.wiki/public/240803/%E4%B8%8A%E4%BC%A01.png" : "shttps://i.loli.wiki/public/240803/%E4%B8%8A%E4%BC%A01.png} alt="MOEU" width="100" />
        
    </>
  );
};

export default LogoMain;
