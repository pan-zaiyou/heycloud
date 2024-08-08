import { useState, useEffect } from "react";
import { styled, useTheme, Theme } from "@mui/material/styles";
import MuiAvatar from "@mui/material/Avatar";
import { AvatarProps } from "@mui/material";
import getColors from "@/utils/getColors";
import { AvatarTypeProps, ColorProps, ExtendedStyleProps, SizeProps } from "@/types/extended";

// 导入头像路径
import avatar1 from "@/assets/images/users/avatar-1.png";
import avatar2 from "@/assets/images/users/avatar-2.png";
import avatar3 from "@/assets/images/users/avatar-3.png";
import avatar4 from "@/assets/images/users/avatar-4.png";
import avatar5 from "@/assets/images/users/avatar-5.png";

interface AvatarStyleProps extends ExtendedStyleProps {
  variant?: AvatarProps["variant"];
  type?: AvatarTypeProps;
}

function getColorStyle({ variant, theme, color, type }: AvatarStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, light, main, contrastText } = colors;

  switch (type) {
    case "filled":
      return {
        color: contrastText,
        backgroundColor: main,
      };
    case "outlined":
      return {
        color: main,
        border: "1px solid",
        borderColor: main,
        backgroundColor: "transparent",
      };
    case "combined":
      return {
        color: main,
        border: "1px solid",
        borderColor: light,
        backgroundColor: lighter,
      };
    default:
      return {
        color: main,
        backgroundColor: lighter,
      };
  }
}

function getSizeStyle(size?: SizeProps) {
  switch (size) {
    case "badge":
      return {
        border: "2px solid",
        fontSize: "0.675rem",
        width: 20,
        height: 20,
      };
    case "xs":
      return {
        fontSize: "0.75rem",
        width: 24,
        height: 24,
      };
    case "sm":
      return {
        fontSize: "0.875rem",
        width: 32,
        height: 32,
      };
    case "lg":
      return {
        fontSize: "1.2rem",
        width: 52,
        height: 52,
      };
    case "xl":
      return {
        fontSize: "1.5rem",
        width: 64,
        height: 64,
      };
    case "md":
    default:
      return {
        fontSize: "1rem",
        width: 40,
        height: 40,
      };
  }
}

interface StyleProps {
  color: ColorProps;
  variant?: AvatarProps["variant"];
  type?: AvatarTypeProps;
  theme: Theme;
  size?: SizeProps;
}

const AvatarStyle = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "color" && prop !== "type" && prop !== "size",
})(({ theme, variant, color, type, size }: StyleProps) => ({
  ...getSizeStyle(size),
  ...getColorStyle({ variant, theme, color, type }),
  ...(size === "badge" && {
    borderColor: theme.palette.background.default,
  }),
}));

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
];

export interface Props extends AvatarProps {
  color?: ColorProps;
  type?: AvatarTypeProps;
  size?: SizeProps;
  rotateAvatars?: boolean;  // 控制是否轮询头像
}

export default function Avatar({
  variant = "circular",
  color = "primary",
  type,
  size = "md",
  rotateAvatars = false, // 默认值为 false
  ...others
}: Props) {
  const theme = useTheme();
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  useEffect(() => {
    if (rotateAvatars) {
      const interval = setInterval(() => {
        setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % avatars.length);
      }, 3000); // 每3秒切换一次头像

      return () => clearInterval(interval); // 清除定时器
    }
  }, [rotateAvatars]);

  return (
    <AvatarStyle
      variant={variant}
      theme={theme}
      color={color}
      type={type}
      size={size}
      src={avatars[currentAvatarIndex]} // 使用轮询头像路径
      {...others}
    />
  );
}
