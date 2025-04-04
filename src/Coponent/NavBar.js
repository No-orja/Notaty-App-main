import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import "@fontsource/roboto";
import "@fontsource/montserrat"; // لتحميل الخط
import "@fontsource/montserrat/900.css";  // لتحميل الوزن ExtraBold
import { Link } from "react-router-dom";

const logoText = "NoteFlow";

const letterVariants = {
    hidden: { opacity: 0, y: 30, rotate: -10 }, // تبدأ الحروف مخفية وصغيرة وتدور
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1, // تأخير تدريجي لكل حرف
        ease: "easeOut",
      },
    }),
  };

export default function NavBar() {
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
                    fontSize: "3rem",  // حجم الخط الكبير
                    fontWeight: "900",  // جعل الخط عريض
                    fontFamily: "'Montserrat', sans-serif",  // الخط الذي تم تثبيته
                }}
                >
                {logoText.split("").map((letter, index) => (
                    <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    style={{
                        color: index === 0 || index === 4 ? "#D32F2F" : "#rgb(0, 0, 0)", // تغيير لون "X" إلى الأحمر
                        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)", // إضافة ظل خفيف حول الحروف
                        fontSize: index === 5 ? "3.5rem" : "3rem", // تغيير حجم "X" لجعله أكبر
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
            justifyContent: "space-around",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <motion.h3 
                initial={{ opacity: 0, scale: 0.8 }}  // التأثير عند التحميل
                animate={{ opacity: 1, scale: 1 }}   // التأثير بعد التحميل
                transition={{ duration: 0.5 }}   // وقت التحميل
                whileHover={{
                  scale: 1.1,   // التكبير عند التحويم
                  color: "black",  // تغيير اللون إلى الأزرق
                  transition: { duration: 0.3 } // تأثير سلس عند التحويم
                }}
                style={{ cursor: "pointer", color: "#D32F2F" }}  // التأكد من أن الرابط قابل للتحويم
              >

                Home
              </motion.h3>          
          </Link>

          <Link to={`/mynotes`} style={{ textDecoration: "none", color: "inherit" }}>
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}  // التأثير عند التحميل
              animate={{ opacity: 1, scale: 1 }}   // التأثير بعد التحميل
              transition={{ duration: 0.5 }}   // وقت التحميل
              whileHover={{
                scale: 1.1,   // التكبير عند التحويم
                color: "#D32F2F",  // تغيير اللون إلى الأزرق
                transition: { duration: 0.3 } // تأثير سلس عند التحويم
              }}
              style={{ cursor: "pointer", color: "black" }}  // التأكد من أن الرابط قابل للتحويم
            >
              MyNote
            </motion.h3>
          </Link>
          
          <Link to={`/mytodos`} style={{ textDecoration: "none", color: "inherit" }}>
            <motion.h3
              initial={{ opacity: 0, scale: 0.8 }}  // التأثير عند التحميل
              animate={{ opacity: 1, scale: 1 }}   // التأثير بعد التحميل
              transition={{ duration: 0.5 }}   // وقت التحميل
              whileHover={{
                scale: 1.1,   // التكبير عند التحويم
                color: "#D32F2F",  // تغيير اللون إلى الأزرق
                transition: { duration: 0.3 } // تأثير سلس عند التحويم
              }}
              style={{ cursor: "pointer", color: "black" }}  // التأكد من أن الرابط قابل للتحويم
            >
              MyToDo
            </motion.h3>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
