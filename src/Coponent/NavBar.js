import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import "@fontsource/roboto";
import "@fontsource/montserrat";
import "@fontsource/montserrat/900.css";
import { Link } from "react-router-dom";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const logoText = "NoteFlow";

const letterVariants = {
  hidden: { opacity: 0, y: 30, rotate: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

export default function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <motion.div
            initial="hidden"
            animate="visible"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: isMobile ? "2rem" : "3rem",
              fontWeight: "900",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {logoText.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                style={{
                  color: index === 0 || index === 4 ? "#D32F2F" : "rgb(0, 0, 0)",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  fontSize: index === 5 ? "3.5rem" : "3rem",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isMobile ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#D32F2F" }}>
                <MenuIcon fontSize="large" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/">
                  Home
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/mynotes">
                  MyNote
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/mytodos">
                  MyToDo
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                fontFamily: "'Roboto', sans-serif",
                width: "100%",
              }}
            >
              <Link to={`/`} style={{ textDecoration: "none" }}>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    color: "black",
                    transition: { duration: 0.3 },
                  }}
                  style={{ cursor: "pointer", color: "#D32F2F" }}
                >
                  Home
                </motion.h3>
              </Link>
              <Link to={`/mynotes`} style={{ textDecoration: "none", color: "inherit" }}>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    color: "#D32F2F",
                    transition: { duration: 0.3 },
                  }}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  MyNote
                </motion.h3>
              </Link>
              <Link to={`/mytodos`} style={{ textDecoration: "none", color: "inherit" }}>
                <motion.h3
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.1,
                    color: "#D32F2F",
                    transition: { duration: 0.3 },
                  }}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  MyToDo
                </motion.h3>
              </Link>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
