import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Grid,
  Container,
  Box,
  TextField,
  CardMedia,
  Alert
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    background: {
      default: "#FDF3E7",
    },
    primary: {
      main: "#8D5524",
    },
    secondary: {
      main: "#F7C59F",
    },
    info: {
      main: "#FADADD",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'sans-serif'",
  },
});

const donuts = [
  { name: "Classic Glazed", image: "/glazed.png" },
  { name: "Chocolate Dream", image: "/chocolate.png" },
  { name: "Strawberry Sprinkle", image: "/strawberry.png" },
  { name: "Boston Cream Bomb", image: "/boston.png" },
  { name: "Blueberry Burst", image: "/blueberry.png" },
  { name: "Peanut Butter Bliss", image: "/peanut.png" },
  { name: "Raspberry Glaze", image: "/raspberry.png" },
  { name: "Lemon Zest", image: "/lemon.jpg" },
  { name: "Caramel Crunch", image: "/caramel.png" },
  { name: "Maple Magic", image: "/maple.png" },
  { name: "Cinnamon Sugar Twist", image: "/cinnamon.png" },
  { name: "Cookies & Cream", image: "/cookies.png" },
  { name: "Vanilla Bean Cloud", image: "/vanilla.png" },
  { name: "Smores Explosion", image: "/smores.png" },
  { name: "Matcha Mellow", image: "/matcha.png" },
];

const DonutCard = ({ name, image, quantity, onAdd, onRemove }) => (
  <Card sx={{ minWidth: 200, m: 1, bgcolor: "info.main" }}>
    <CardMedia component="img" height="140" image={image} alt={name} sx={{ objectFit: "contain", mx: "auto", mt: 1, width: "80%" }}/>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton color="primary" onClick={onRemove}><Remove /></IconButton>
      <Typography>{quantity}</Typography>
      <IconButton color="primary" onClick={onAdd}><Add /></IconButton>
    </CardActions>
  </Card>
);

const MenuPage = ({ quantities, setQuantities }) => {
  const handleChange = (index, delta) => {
    setQuantities(prev => {
      const updated = [...prev];
      updated[index] = Math.max(0, updated[index] + delta);
      return updated;
    });
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3, color: "primary.main" }}>
        Dough & Behold Menu
      </Typography>
      <Grid container>
        {donuts.map((donut, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <DonutCard
              name={donut.name}
              image={donut.image}
              quantity={quantities[idx]}
              onAdd={() => handleChange(idx, 1)}
              onRemove={() => handleChange(idx, -1)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Button variant="contained" color="primary" component={Link} to="/cart">
          View Cart
        </Button>
      </Box>
    </Container>
  );
};

const CartPage = ({ quantities }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const selectedDonuts = donuts
      .map((d, i) => ({ type: d.name.replace(/ /g, '_').toLowerCase(), qty: quantities[i] }))
      .filter(d => d.qty > 0);

    const donut_type = selectedDonuts.map(d => d.type);
    const quantity = selectedDonuts.map(d => d.qty);

    const res = await fetch("https://mamjw5yigj.execute-api.us-east-1.amazonaws.com/dev/insert_new_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donut_type,
        quantity,
        customerName: name,
        customerEmail: email
      })
    });

    if (res.ok) setSubmitted(true);
  };

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ my: 3, color: "primary.main" }}>
        Your Cart
      </Typography>
      <Box sx={{ mb: 2 }}>
        {donuts.map((donut, idx) => (
          quantities[idx] > 0 && (
            <Typography key={idx}>{donut.name} x{quantities[idx]}</Typography>
          )
        ))}
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }}>Customer Info</Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!name || !email || submitted}>
          {submitted ? "Order Submitted" : "Place Order"}
        </Button>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          💡 Payment will be collected upon pickup.
        </Typography>
      </Box>
    </Container>
  );
};

export default function App() {
  const [quantities, setQuantities] = useState(Array(donuts.length).fill(0));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dough & Behold
            </Typography>
            <Button color="inherit" component={Link} to="/">Menu</Button>
            <Button color="inherit" component={Link} to="/cart">Cart</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<MenuPage quantities={quantities} setQuantities={setQuantities} />} />
          <Route path="/cart" element={<CartPage quantities={quantities} />} />
        </Routes>
        <Box sx={{ textAlign: "center", p: 3, color: "primary.main" }}>
          <Typography>@2025 Dough & Behold</Typography>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
