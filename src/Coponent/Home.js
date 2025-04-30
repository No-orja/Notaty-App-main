import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Typewriter from 'typewriter-effect';

export default function Home(){
    return(
        <div>
            <div style={{ 
                    marginTop: '50px',
                    textAlign: 'center',
                    fontSize: '2rem', 
                    fontWeight: 'bold',
                    padding: '2rem', 
                    minHeight: '300px'
                }}>
                <Typewriter
                    onInit={(typewriter) => {
                    typewriter
                        .typeString('<span style="color: black;">Capture your </span>')
                        .typeString('<span style="color: #D32F2F;">thoughts</span>')
                        .typeString('<span style="color: black;">, organize with </span>')
                        .typeString('<br />') 
                        .typeString('<span style="color: #D32F2F;">ease</span>')
                        .typeString('<span style="color: black;">, and bring your ideas to </span>')
                        .typeString('<span style="color: #D32F2F;">life</span>.')
                        .start();
                    }}
                />
            </div>

            <Grid container spacing={2} alignItems="center" style={{ textAlign: 'center',  padding: '2rem' }}>
               
                <Grid item xs={12} sm={6}>
                    <Link to={"/mynotes"} style={{ textDecoration: 'none' }}>
                        <button className="buttonChoose">MyNotes</button>
                    </Link>            
                </Grid>                
            
                <Grid item xs={12} sm={6}>
                     <Link to={`/mytodos`} style={{ textDecoration: 'none' }}>
                        <button className="buttonChoose">MyToDos</button>                 
                    </Link>
                </Grid> 
            </Grid>
        </div>       
    
    )
}