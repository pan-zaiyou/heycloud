import React, { useMemo, useRef, useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  ClickAwayListener,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery
} from "@mui/material";

// project import
import MainCard from "@/components/MainCard";
import IconButton from "@/components/@extended/IconButton";
import Transitions from "@/components/@extended/Transitions";
import { makeStyles } from "@/themes/hooks";

// assets
import {
  CommentOutlined,
  CustomerServiceOutlined,
  RedoOutlined
} from "@ant-design/icons";
import { useGetTicketsQuery, useGetUserStatQuery } from "@/store/services/api";
import Ticket from "@/model/ticket";
import { Trans, useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useCountDown, useSafeState, useToggle } from "ahooks";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles<{ open: boolean }>()((theme, { open }) => ({
  root: { flexShrink: 0 },
  icon: {
    color: theme.palette.text.primary,
    ...(theme.palette.mode === "dark"
      ? {
          backgroundColor: open ? theme.palette.grey[300] : theme.palette.background.default
        }
      : {
          backgroundColor: open ? theme.palette.grey[300] : theme.palette.grey[100]
        })
  },
  paper: {
    boxShadow: theme.customShadows.z1,
    width: "100%",
    minWidth: 285,
    maxWidth: 420,
    [theme.breakpoints.down("md")]: {
      maxWidth: 285
    }
  },
  nav: {
    padding: 0
  },
  itemButton: {
    padding: theme.spacing(0.5, 0)
  },
  listItemTextTypography: {
    color: theme.palette.text.primary
  },
  listItemSecondary: {
    margin: theme.spacing(0.75, 1),
    top: "auto",
    right: "auto",
    alignSelf: "flex-start",
    transform: "none",
    position: "relative",
    color: theme.palette.text.secondary
  },
  viewAllButton: {
    textAlign: "center",
    paddingTop: `${theme.spacing(1.5)} !important`,
    paddingBottom: `${theme.spacing(1.5)} !important`
  },
  listItemText: {
    margin: theme.spacing(0.75, 0.75)
  },
  listItemAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  iconAvatar: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    fontSize: "1rem"
  },
  refreshButton: {
    color: theme.palette.text.secondary
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 4)
  },
  noTicket: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 4)
  }
}));

const TicketMenu = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, { toggle: toggleOpen, set: setOpen }] = useToggle(false);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const { data: statData } = useGetUserStatQuery();
  const [opened, setOpened] = useSafeState(false);
  const {
    data: ticketData,
    isSuccess,
    isLoading
  } = useGetTicketsQuery(undefined, {
    skip: !opened
  });
  const tickets = useMemo<Omit<Ticket, "message">[]>(
    () => (isSuccess && ticketData && ticketData.filter((ticket) => ticket.status === 0).slice(0, 5)) || [],
    [isSuccess, ticketData]
  );

  const { classes, cx } = useStyles({ open });

  return (
    <Box className={classes.root}>
      <IconButton
        color="secondary"
        className={classes.icon}
        variant="light"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={() => {
          setOpened(true);
          toggleOpen();
        }}
      >
        <Badge badgeContent={statData ? statData[1] : 0} color="primary">
          <CustomerServiceOutlined />
        </Badge>
      </IconButton>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={"menu"}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchesXs ? -5 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  title={<Trans i18nKey={"layout.header.ticket.title"}>Tickets</Trans>}
                  elevation={0}
                  border={false}
                  content={false}
                  secondary={<RefreshButton />}
                >
                  <List component="nav" className={classes.nav}>
                    {tickets.map((ticket, index) => (
                      <TicketItem key={index} ticket={ticket} />
                    ))}
                    {isLoading && (
                      <Box className={classes.progress}>
                        <CircularProgress />
                      </Box>
                    )}
                    {!isLoading && tickets.length === 0 && (
                      <Box className={classes.noTicket}>
                        <Typography variant="caption" color="textSecondary">
                          <Trans i18nKey={"layout.header.ticket.no_ticket"}>No Ticket</Trans>
                        </Typography>
                      </Box>
                    )}
                    <ListItem disablePadding divider>
                      <ListItemButton
                        className={cx(classes.itemButton, classes.viewAllButton)}
                        href={"/ticket"}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/ticket");
                          setOpen(false); // Close the menu on "View All" click
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography variant="h6" color="primary">
                              <Trans i18nKey={"layout.header.ticket.view_all"}>View All</Trans>
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default TicketMenu;
