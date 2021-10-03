import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Typography,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import { MessageOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Login({ history }) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("subit", name, " ", selectedRoom);

    history.push({
      pathname: "/chat",
      search:
        "?" + new URLSearchParams({ room: selectedRoom, name }).toString(),
      // search: `?room=${encodeURIComponent(selectedRoom)}&name=${encodeURIComponent(name)}`,
    });
  };
  const handleRoomSelect = (v) => {
    setSelectedRoom(v.target.value);
    console.log("sleect", v.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MessageOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          WatchParty
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your name"
            name="name"
            autoComplete="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Room</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRoom}
              label="Select Room"
              onChange={handleRoomSelect}
            >
              <MenuItem value="room1">Room 1</MenuItem>
              <MenuItem value="room2">Room 2</MenuItem>
              <MenuItem value="room3">Room 3</MenuItem>
            </Select>
          </FormControl>

          <Button
            disabled={!name || !selectedRoom}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
                            <Link to="/chat?name=name&room=123">Chat</Link>
                        </Grid> */}
            {/* <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid> */}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
