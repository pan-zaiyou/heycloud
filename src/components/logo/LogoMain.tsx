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
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={isDarkMode ? "暗黑模式logourl" : "亮色模式logourl"}
        alt="logo"
        width="100"
        {...others}
      />
      <span
        style={{
          fontSize: '20px', // 调整为你想要的字体大小
          fontWeight: 'bold', // 加粗
          marginLeft: '5px', // 根据需要调整间距
          color: isDarkMode ? '#fff' : '#000', // 暗黑模式下为白色，其他模式下为黑色
          fontFamily: '黑体, sans-serif', // 设置字体为黑体
        }}
      >
        跨越长城
      </span>
    </div>
  );
};

export default LogoMain;
