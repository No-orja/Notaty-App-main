import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';

export default function Home(){
    return(
        <div>
            <div style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', padding: '2rem' }}>
                <Typewriter
                    onInit={(typewriter) => {
                    typewriter
                        .typeString('<span style="color: black; font-family: \'Montserrat\', sans-serif; font-size: 2rem;">Capture your </span>')
                        .typeString('<span style="color: #D32F2F;">thoughts</span>')
                        .typeString('<span style="color: black;">, organize with </span>')
                        .typeString('<br />') // لإضافة سطر جديد بعد كلمة 'with'
                        .typeString('<span style="color: #D32F2F;">ease</span>')
                        .typeString('<span style="color: black;">, and bring your ideas to </span>')
                        .typeString('<span style="color: #D32F2F;">life</span>.')
                        .start();
                    }}
                />
            </div>

            <Grid container spacing={2} alignItems="center" style={{ textAlign: 'center',  padding: '2rem' }}>
               
                <Grid item xs={6}>
                    <Link to={"/mynotes"} style={{ textDecoration: 'none' }}>
                        <button className="buttonChoose">MyNotes</button>
                    </Link>            
                </Grid>                
            
                <Grid item xs={6}>
                     <Link to={`/mytodos`} style={{ textDecoration: 'none' }}>
                        <button className="buttonChoose">MyToDos</button>                 
                    </Link>
                </Grid> 
            </Grid>
        </div>       
    
    )
}