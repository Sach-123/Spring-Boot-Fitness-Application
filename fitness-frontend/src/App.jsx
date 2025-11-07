import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import { useDispatch } from "react-redux";
import { AuthContext } from "react-oauth2-code-pkce";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";

const ActivitiesPage = () => {
  const [refreshSignal, setRefreshSignal] = useState(0);

  return (
    <Grid container spacing={3} alignItems="stretch">
      <Grid item xs={12} lg={4}>
        <Paper
          id="activity-form"
          sx={{
            height: "100%",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            background: "linear-gradient(160deg, rgba(21, 27, 38, 0.95) 0%, rgba(12, 15, 24, 0.92) 100%)",
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h5" fontWeight={600}>
              Add your activities
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.65)" }}>
              Capture your movement in seconds—track duration, calories, and stay on top of your momentum.
            </Typography>
          </Stack>
          <ActivityForm onActivityAdded={() => setRefreshSignal((prev) => prev + 1)} />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={8}>
        <Paper
          sx={{
            height: "100%",
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
            <div>
              <Typography variant="h5" fontWeight={600}>
                Your Recent Activities
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.6)" }}>
                Dive into rich summaries with AI tips tailored to each workout.
              </Typography>
            </div>
          </Stack>
          <ActivityList refreshSignal={refreshSignal} />
        </Paper>
      </Grid>
    </Grid>
  );
};

function App() {
  const { token, tokenData, logIn, logOut } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
    }
  }, [token, tokenData, dispatch]);

  const userName = useMemo(() => {
    if (!tokenData) return null;
    return (
      tokenData?.given_name ||
      tokenData?.name ||
      tokenData?.preferred_username ||
      tokenData?.email ||
      null
    );
  }, [tokenData]);

  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          background: "radial-gradient(circle at top left, rgba(139,107,255,0.25), transparent 45%), radial-gradient(circle at bottom right, rgba(125,211,252,0.22), transparent 42%), linear-gradient(180deg, #05060c 0%, #070511 100%)",
          color: "#f8fafc",
          pb: { xs: 10, md: 12 },
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            background: "rgba(5, 6, 12, 0.82)",
            borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
            backdropFilter: "blur(18px)",
          }}
        >
          <Toolbar sx={{ py: 2.5, px: { xs: 3, md: 6 }, display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #8b6bff 0%, #7dd3fc 100%)",
                  boxShadow: "0 0 16px rgba(125, 211, 252, 0.5)",
                }}
              />
              <Typography variant="h6" fontWeight={700} letterSpacing={0.8}>
                PulseTrack
              </Typography>
            </Stack>
            {token ? (
              <Stack direction="row" spacing={2.5} alignItems="center">
                <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.7)", fontWeight: 500 }}>
                  {userName ? `Welcome back, ${userName.split(" ")[0]}!` : "Ready to move?"}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={logOut}
                  sx={{
                    borderColor: "rgba(125,211,252,0.35)",
                    color: "#7dd3fc",
                    ":hover": { borderColor: "rgba(125,211,252,0.65)" },
                  }}
                >
                  Logout
                </Button>
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.7)", fontWeight: 500 }}>
                Secure login available below
              </Typography>
            )}
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ pt: { xs: 8, md: 12 }, px: { xs: 3, md: 6 } }}>
          {!token ? (
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                minHeight: "70vh",
              }}
            >
              <Paper
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  p: { xs: 5, md: 8 },
                  maxWidth: 720,
                  textAlign: "left",
                  background: "linear-gradient(135deg, rgba(17, 25, 40, 0.92) 0%, rgba(21, 30, 58, 0.92) 100%)",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    top: -120,
                    right: -140,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(125, 211, 252, 0.45) 0%, rgba(125, 211, 252, 0) 70%)",
                  }}
                />
                <Stack spacing={3}>
                  <Stack spacing={1.5}>
                    <Typography variant="overline" sx={{ letterSpacing: 4, color: "rgba(125,211,252,0.75)" }}>
                      Fitness Intelligence
                    </Typography>
                    <Typography variant="h3" fontWeight={700} lineHeight={1.15}>
                      Your performance dashboard, reimagined for night mode.
                    </Typography>
                    <Typography variant="body1" sx={{ color: "rgba(226,232,240,0.7)" }}>
                      Track every stride, pedal, or climb with immersive visuals and actionable coaching insights.
                    </Typography>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }}>
                    <Button variant="contained" color="primary" size="large" onClick= {() => logIn()}>
                      Log in with your account
                    </Button>
                    <Typography variant="caption" sx={{ color: "rgba(226,232,240,0.55)" }}>
                      Secure OAuth2 sign-in · Instant sync with your activity feed
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          ) : (
            <Stack spacing={6}>
              <Paper
                sx={{
                  p: { xs: 4, md: 6 },
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  background: "linear-gradient(135deg, rgba(20,24,38,0.95) 0%, rgba(10,13,24,0.9) 100%)",
                }}
              >
                <Stack spacing={1.5}>
                  <Typography variant="overline" sx={{ color: "rgba(125,211,252,0.7)", letterSpacing: 3 }}>
                    Dashboard
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {userName ? `${userName}, let’s elevate your training.` : "Let’s elevate your training."}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "rgba(226,232,240,0.65)" }}>
                    Review your latest activity streaks, uncover AI-powered recommendations, and stay consistent with your goals—all in a sleek dark workspace.
                  </Typography>
                </Stack>
              </Paper>

              <Box>
                <Routes>
                  <Route path="/activities" element={<ActivitiesPage />} />
                  <Route path="/activities/:id" element={<ActivityDetail />} />
                  <Route path="/" element={<Navigate to="/activities" replace />} />
                </Routes>
              </Box>
            </Stack>
          )}
        </Container>
      </Box>
    </Router>
  );
}

export default App;
