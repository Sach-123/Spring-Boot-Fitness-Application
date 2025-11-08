import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { getActivityRecommendation } from "../services/api";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedActivity = location.state?.activity;
  const [activity, setActivity] = useState(passedActivity || null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await getActivityRecommendation(id);
        // Merge recommendation info with basic activity data
        // Preserve duration and caloriesBurned from the passed activity state
        setActivity((prev) => ({
          ...response.data,
          duration: passedActivity?.duration ?? prev?.duration ?? response.data.duration,
          caloriesBurned: passedActivity?.caloriesBurned ?? prev?.caloriesBurned ?? response.data.caloriesBurned,
        }));
      } catch (error) {
        console.error("Failed to fetch activity recommendation:", error);
      }
    };

    fetchRecommendation();
  }, [id, passedActivity]);

  if (!activity) {
    return (
      <Paper sx={{ p: 6, maxWidth: 720, mx: "auto", textAlign: "center" }}>
        <Typography variant="h6">Loading your activity insights...</Typography>
      </Paper>
    );
  }

  const createdAt = activity.createdAt ? new Date(activity.createdAt) : null;

  const metrics = [
    {
      label: "Duration",
      value: activity.duration,
      suffix: "min",
      description: "Total time spent in this session",
    },
    {
      label: "Calories",
      value: activity.caloriesBurned,
      suffix: "kcal",
      description: "Energy you expended during the activity",
    },
  ];

  return (
    <Stack spacing={4} sx={{ maxWidth: 960, mx: "auto" }}>
      <Paper
        sx={{
          p: { xs: 4, md: 6 },
          background:
            "linear-gradient(135deg, rgba(18,25,40,0.95) 0%, rgba(12,18,34,0.9) 100%)",
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack spacing={1}>
              <Typography
                variant="overline"
                sx={{ color: "rgba(125,211,252,0.7)", letterSpacing: 3 }}
              >
                Activity Overview
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                sx={{ textTransform: "capitalize" }}
              >
                {activity.type?.toLowerCase() || "Fitness Session"}
              </Typography>
            </Stack>
            <Stack spacing={1} alignItems="flex-end">
              <Chip
                label={`${activity.caloriesBurned ?? 0} kcal`}
                sx={{
                  background: "rgba(139,107,255,0.18)",
                  color: "#c3b5ff",
                  fontWeight: 600,
                }}
              />
              {createdAt && (
                <Typography
                  variant="caption"
                  sx={{ color: "rgba(148,163,184,0.7)" }}
                >
                  Logged {createdAt.toLocaleString()}
                </Typography>
              )}
            </Stack>
          </Stack>

          <Grid container spacing={3} columns={12}>
            {metrics.map((metric) => (
              <Grid item xs={12} sm={6} key={metric.label}>
                <MetricCard {...metric} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.65)" }}>
            Keep exploring the insights below to discover how to iterate on this
            session and push towards your goals.
          </Typography>

          <Stack direction="row" spacing={2}>
            <ButtonLike onClick={() => navigate(-1)}>
              ← Back to activity stream
            </ButtonLike>
          </Stack>
        </Stack>
      </Paper>

      {(activity.recommendation ||
        activity.improvements?.length ||
        activity.suggestions?.length ||
        activity.safety?.length) && (
        <Paper
          sx={{
            p: { xs: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {activity.recommendation && (
            <Stack spacing={1.5}>
              <Typography
                variant="overline"
                sx={{ color: "rgba(125,211,252,0.7)", letterSpacing: 3 }}
              >
                AI Recommendation
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(226,232,240,0.8)" }}
              >
                {activity.recommendation}
              </Typography>
            </Stack>
          )}

          {activity.improvements?.length ? (
            <InsightSection
              title="Improvements"
              items={activity.improvements}
            />
          ) : null}

          {activity.suggestions?.length ? (
            <InsightSection title="Suggestions" items={activity.suggestions} />
          ) : null}

          {activity.safety?.length ? (
            <InsightSection title="Safety Guidelines" items={activity.safety} />
          ) : null}
        </Paper>
      )}
    </Stack>
  );
};

const InsightSection = ({ title, items }) => (
  <Stack spacing={1.5}>
    <Typography variant="subtitle1" fontWeight={600}>
      {title}
    </Typography>
    <Stack component="ul" spacing={1} sx={{ listStyle: "none", p: 0, m: 0 }}>
      {items.map((item, index) => (
        <Typography
          key={`${title}-${index}`}
          component="li"
          variant="body2"
          sx={{ color: "rgba(226,232,240,0.7)" }}
        >
          • {item}
        </Typography>
      ))}
    </Stack>
  </Stack>
);

const ButtonLike = ({ onClick, children }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      appearance: "none",
      border: "1px solid rgba(148,163,184,0.25)",
      borderRadius: 12,
      background: "rgba(15,23,42,0.5)",
      color: "#e2e8f0",
      fontWeight: 600,
      cursor: "pointer",
      px: 3,
      py: 1.25,
      transition: "all 0.2s ease",
      textAlign: "left",
      ":hover": {
        borderColor: "rgba(125,211,252,0.6)",
        color: "#7dd3fc",
      },
    }}
  >
    {children}
  </Box>
);

const MetricCard = ({ label, value, suffix, description }) => (
  <Card
    variant="outlined"
    sx={{
      height: "100%",
      background:
        "linear-gradient(145deg, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.65) 100%)",
      border: "1px solid rgba(148,163,184,0.18)",
    }}
  >
    <CardContent>
      <Stack spacing={1.5}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "rgba(226,232,240,0.65)",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
        >
          {value ?? "--"}
          {suffix ? (
            <Typography
              component="span"
              variant="h6"
              sx={{ color: "rgba(226,232,240,0.55)", fontWeight: 500 }}
            >
              {suffix}
            </Typography>
          ) : null}
        </Typography>
        {description ? (
          <Typography variant="body2" sx={{ color: "rgba(226,232,240,0.55)" }}>
            {description}
          </Typography>
        ) : null}
      </Stack>
    </CardContent>
  </Card>
);

export default ActivityDetail;
