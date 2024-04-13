import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { LogOnService } from '../../shared/services/api/logon/LogOnService';
import { LoginService } from '../../shared/services/api';
import { Grid } from '@mui/material';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3001">
                Task Manager
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [passwordsMatch, setPasswordsMatch] = React.useState(true);

    const handleNav = (path: string) => {
        navigate(path);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email')?.toString(),
            password: data.get('password')?.toString(),
            confirmPassword: data.get('confirmPassword')?.toString(),
        });

        const payload = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
            confirmPassword: data.get('confirmPassword') as string,
        }
        if (password !== confirmPassword) {
            alert('As senhas não correspondem');
            return;
        }
        LogOnService.create(payload)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    const loginPayload = {
                        email: payload.email,
                        password: payload.password
                    };
                    LoginService.login(loginPayload)
                        .then((result) => {
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                handleNav('/tasks');
                            }
                        })
                }
            });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setPasswordsMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(event.target.value === password);
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Nome de Usuario"
                            name="name"
                            autoComplete="name"
                            autoFocus
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            error={!passwordsMatch}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!passwordsMatch}
                        >
                            Sign Up
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Voltar para pagina de login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}