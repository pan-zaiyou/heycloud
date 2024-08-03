import React from 'react';
import { useTheme } from '@mui/material/styles';

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  const theme = useTheme();

  const logoSrc =
    theme.palette.mode === 'dark'
      ? '/src/assets/images/logo-dark.png'
      : '/src/assets/images/logo.png';

  return (
    <img src={logoSrc} alt="MANTIS" width="100" {...others} />
  );
};

export default LogoIcon;
