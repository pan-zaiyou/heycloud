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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={theme.palette.mode === 'dark' ? "暗黑模式logourl" : "亮色模式logourl"}
        alt="logo"
        width="100"
        {...others}
      />
      <span
        style={{
          fontSize: '15px', // 调整为你想要的字体大小
          fontWeight: 'bold', // 加粗
          marginLeft: '10px', // 根据需要调整间距
        }}
      >
        跨越长城
      </span>
    </div>
  );
};

export default LogoMain;
