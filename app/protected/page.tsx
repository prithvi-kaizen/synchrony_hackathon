"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaGrinStars,
  FaSadTear,
  FaUserCircle,
  FaChartLine,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import {
  ThemeProvider,
  createTheme,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Button,
} from "@mui/material";

// Helper to format date as "YYYY-MM-DD"
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getCurrentDateFormatted = () => {
  const today = new Date();
  return formatDate(today);
};

const getDayAndDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-IN', options); // Using en-IN for Indian context
};


const initialMoodData = {
  daily: [
    { date: "2025-07-12", mood: 4 },
    { date: "2025-07-13", mood: 3 },
    { date: "2025-07-14", mood: 2 },
    { date: "2025-07-15", mood: 5 },
    { date: "2025-07-16", mood: 4 },
    { date: "2025-07-17", mood: 3 },
    { date: "2025-07-18", mood: 4 }, // Updated based on current date
  ],
  monthly: [3, 4, 2, 5, 4, 3, 4, 3, 4, 5, 3, 4],
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f0f2f5", // Lighter background
      paper: "#ffffff",   // White cards/sidebar
    },
    primary: {
      main: "#6A5ACD", // SlateBlue - a bit playful
    },
    secondary: {
      main: "#FF6384", // Pinkish-Red - vibrant
    },
    text: {
      primary: "#333333", // Darker text for contrast
      secondary: "#666666", // Muted secondary text
    },
    success: {
      main: '#4CAF50', // Green for positive indicators
    },
    warning: {
      main: '#FFC107', // Amber for neutral
    },
    error: {
      main: '#F44336', // Red for negative
    },
    info: {
      main: '#2196F3', // Blue for info
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          fontWeight: 600,
          '&:hover': {
            transform: 'scale(1.02)',
            transition: 'transform 0.2s ease-in-out',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            transform: 'scale(1.1)', // Subtle hover effect for icons
            transition: 'transform 0.2s ease-in-out',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for a softer look
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Subtle shadow
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(106, 90, 205, 0.1)', // Light tint for selected item
            '& .MuiListItemIcon-root': {
              color: '#6A5ACD',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
            },
          },
        },
      },
    },
  },
});

const moodIcons = [
  { moodScore: 1, icon: <FaSadTear style={{ color: "#F44336", fontSize: 28 }} />, label: "Sad" },    // Red
  { moodScore: 2, icon: <FaFrown style={{ color: "#FF9800", fontSize: 28 }} />, label: "Down" },    // Orange
  { moodScore: 3, icon: <FaMeh style={{ color: "#FFC107", fontSize: 28 }} />, label: "Neutral" },   // Amber
  { moodScore: 4, icon: <FaSmile style={{ color: "#4CAF50", fontSize: 28 }} />, label: "Happy" },   // Green
  { moodScore: 5, icon: <FaGrinStars style={{ color: "#9C27B0", fontSize: 28 }} />, label: "Great" }, // Purple - vibrant!
];

// Section reveal logic (no changes needed here, it's generic)
function useSectionReveal(sectionCount: number) {
  const [visibleSections, setVisibleSections] = useState([true, ...Array(sectionCount - 1).fill(false)]);
  const refs = Array.from({ length: sectionCount }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.forEach((ref, idx) => {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [refs.length]);
  return { visibleSections, refs };
}

export default function Dashboard() {
  const sectionCount = 3;
  const { visibleSections, refs } = useSectionReveal(sectionCount);

  const [moodData, setMoodData] = useState(initialMoodData);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState<string>("");

  // Check if today's mood is already logged
  useEffect(() => {
    const today = getCurrentDateFormatted();
    const todayMood = moodData.daily.find(d => d.date === today);
    if (todayMood) {
      setSelectedMood(todayMood.mood);
    } else {
      setSelectedMood(null); // Reset if today's mood isn't found (for a fresh check-in)
    }
  }, [moodData.daily]);


  const handleMoodSelect = (moodScore: number) => {
    setSelectedMood(moodScore);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMoodNote(event.target.value);
  };

  const handleCheckIn = () => {
    if (selectedMood === null) {
      alert("Please select your mood first!");
      return;
    }

    const today = getCurrentDateFormatted();
    const newDailyMood = { date: today, mood: selectedMood };

    setMoodData(prevData => {
      const existingEntryIndex = prevData.daily.findIndex(d => d.date === today);
      let updatedDaily;
      if (existingEntryIndex !== -1) {
        // Update existing mood for today
        updatedDaily = prevData.daily.map((item, index) =>
          index === existingEntryIndex ? newDailyMood : item
        );
      } else {
        // Add new mood for today
        updatedDaily = [...prevData.daily, newDailyMood];
      }

      // Keep only the last 7 entries for daily trend, and sort by date
      updatedDaily.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      updatedDaily = updatedDaily.slice(-7);


      // Optionally, update monthly average (simplified for this example)
      // This would typically involve more complex logic for actual monthly averages
      const updatedMonthly = [...prevData.monthly];
      const currentMonthIndex = new Date().getMonth();
      updatedMonthly[currentMonthIndex] = (updatedMonthly[currentMonthIndex] * (moodData.daily.length - 1) + selectedMood) / moodData.daily.length; // Very rough average update

      return {
        daily: updatedDaily,
        monthly: updatedMonthly,
      };
    });

    setMoodNote(""); // Clear note after check-in
    alert(`Mood checked in as ${selectedMood} today!`);
  };


  const lineChartData = {
    labels: moodData.daily.map((d) => d.date.slice(5)), // MM-DD
    datasets: [
      {
        label: "Mood Score",
        data: moodData.daily.map((d) => d.mood),
        fill: false,
        borderColor: lightTheme.palette.primary.main,
        backgroundColor: lightTheme.palette.primary.main,
        tension: 0.3,
        pointBackgroundColor: lightTheme.palette.primary.main,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: lightTheme.palette.primary.main,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const barChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Monthly Avg",
        data: moodData.monthly,
        backgroundColor: lightTheme.palette.secondary.main, // Use secondary color
        hoverBackgroundColor: lightTheme.palette.primary.main, // Primary color on hover
      },
    ],
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 4,
            py: 2,
            bgcolor: "background.paper",
            borderRadius: 0,
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
            zIndex: 1, // Ensure header is above content when scrolling
          }}
        >
          <Typography variant="h5" fontWeight={700} color="primary">
            MoodMeter <span role="img" aria-label="sparkles">✨</span>
          </Typography>
          <FaUserCircle style={{ fontSize: 36, color: lightTheme.palette.text.secondary }} />
        </Paper>
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <Paper
            elevation={0}
            square
            sx={{
              width: { xs: 80, md: 220 },
              bgcolor: "background.paper",
              py: 4,
              px: 2,
              borderRadius: 0,
              boxShadow: '2px 0 10px rgba(0,0,0,0.03)',
            }}
          >
            <List>
              <ListItem selected>
                <ListItemIcon>
                  <FaChartLine style={{ color: lightTheme.palette.primary.main }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ display: { xs: "none", md: "block" } }} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FaHistory style={{ color: lightTheme.palette.text.secondary }} />
                </ListItemIcon>
                <ListItemText primary="History" sx={{ display: { xs: "none", md: "block" } }} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <FaCog style={{ color: lightTheme.palette.text.secondary }} />
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ display: { xs: "none", md: "block" } }} />
              </ListItem>
            </List>
          </Paper>
          {/* Main Content */}
          <Box sx={{ flex: 1, p: { xs: 2, md: 6 }, display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Daily Check-in Card */}
            <div ref={refs[0]}>
              {visibleSections[0] && (
                <Card elevation={4} sx={{ mb: 4, bgcolor: "background.paper", transition: "opacity 0.7s", opacity: 1 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                      How are you feeling today? <span role="img" aria-label="sparkles">😊</span>
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                      {getDayAndDate()}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                      {moodIcons.map((m) => (
                        <IconButton
                          key={m.moodScore}
                          onClick={() => handleMoodSelect(m.moodScore)}
                          sx={{
                            border: selectedMood === m.moodScore ? `2px solid ${lightTheme.palette.primary.main}` : '2px solid transparent',
                            borderRadius: '50%',
                            p: 1,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(106, 90, 205, 0.05)',
                            }
                          }}
                        >
                          {m.icon}
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                            {m.label}
                          </Typography>
                        </IconButton>
                      ))}
                    </Box>
                    <TextField
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={3}
                      placeholder="Add a note (optional)..."
                      value={moodNote}
                      onChange={handleNoteChange}
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '& fieldset': {
                          borderColor: lightTheme.palette.divider,
                        },
                        '&:hover fieldset': {
                          borderColor: lightTheme.palette.primary.light,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: lightTheme.palette.primary.main,
                        },
                      }}}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCheckIn}
                      disabled={selectedMood === null}
                      fullWidth
                      sx={{ opacity: selectedMood === null ? 0.6 : 1 }}
                    >
                      Check In
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Mood Trends Section */}
            <div ref={refs[1]}>
              {visibleSections[1] && (
                <Card elevation={4} sx={{ mb: 4, bgcolor: "background.paper", transition: "opacity 0.7s", opacity: 1 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                      Mood Trends (Last 7 Days) <span role="img" aria-label="chart with upward trend">📈</span>
                    </Typography>
                    <Box sx={{ height: 200 }}>
                      <Line
                        data={lineChartData}
                        options={{
                          plugins: { legend: { display: false } },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 5,
                              ticks: {
                                stepSize: 1,
                                color: lightTheme.palette.text.secondary,
                              },
                              grid: {
                                color: lightTheme.palette.divider,
                                drawBorder: false,
                              },
                            },
                            x: {
                              ticks: {
                                color: lightTheme.palette.text.secondary,
                              },
                              grid: {
                                display: false,
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              )}
            </div>

            <div ref={refs[2]}>
              {visibleSections[2] && (
                <Card elevation={4} sx={{ bgcolor: "background.paper", transition: "opacity 0.7s", opacity: 1 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
                      Monthly Mood Averages <span role="img" aria-label="bar chart">📊</span>
                    </Typography>
                    <Box sx={{ height: 200 }}>
                      <Bar
                        data={barChartData}
                        options={{
                          plugins: { legend: { display: false } },
                          scales: {
                            y: {
                              beginAtZero: true,
                              max: 5,
                              ticks: {
                                stepSize: 1,
                                color: lightTheme.palette.text.secondary,
                              },
                              grid: {
                                color: lightTheme.palette.divider,
                                drawBorder: false,
                              },
                            },
                            x: {
                              ticks: {
                                color: lightTheme.palette.text.secondary,
                              },
                              grid: {
                                display: false,
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              )}
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}