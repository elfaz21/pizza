import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Sidebar from "../components/sideBar";
import Navbar from "../components/navbar";
import { MyContext } from "../context/Context";

const initialToppings = [
  "Pepperoni",
  "Mushrooms",
  "Onions",
  "Sausage",
  "Bacon",
  "Extra cheese",
];

const AddMenu = () => {
  const { userId, role } = useContext(MyContext);
  const [pizzaName, setPizzaName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedToppings, setSelectedToppings] = useState({});
  const [photo, setPhoto] = useState(null);
  const [toppings, setToppings] = useState(initialToppings);
  const [newTopping, setNewTopping] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [showAddTopping, setShowAddTopping] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(
          role === "SuperAdmin"
            ? `https://pizza-server-30q1.onrender.com/api/users/${userId}`
            : `https://pizza-server-30q1.onrender.com/api/users/${restaurantId}`
        );
        if (role === "SuperAdmin") {
          setRestaurantName(response.data.restaurantName);
          setImageUrl(response.data.imageUrl);
        } else {
          setRestaurantId(response.data.restaurantId);
        }
      } catch (error) {
        console.error("Error fetching Restaurant data:", error);
      }
    };

    if (userId) {
      fetchRestaurantData();
    }
  }, [userId, role, restaurantId]);

  const handleToggleTopping = (topping) => {
    setSelectedToppings((prev) => ({
      ...prev,
      [topping]: !prev[topping],
    }));
  };

  const handleAddPizza = async () => {
    const selectedToppingsArray = Object.keys(selectedToppings).filter(
      (topping) => selectedToppings[topping]
    );

    try {
      const response = await axios.post(
        "https://pizza-server-30q1.onrender.com/api/menu",
        {
          name: pizzaName,
          price: parseFloat(price),
          toppings: selectedToppingsArray,
          pizzaPhoto: photo, // Send the Base64 photo
          userId,
          restaurantName,
          imageUrl,
          restaurantId,
        }
      );
      console.log("Pizza added:", response.data);
      // Reset form fields
      setPizzaName("");
      setPrice("");
      setSelectedToppings({});
      setPhoto(null);
      setShowAddTopping(false);
      setNewTopping("");
    } catch (error) {
      console.error("Error adding pizza:", error);
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Set the Base64 string
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64)
    }
  };

  const handleAddNewTopping = () => {
    if (newTopping) {
      setToppings((prev) => [...prev, newTopping]);
      setSelectedToppings((prev) => ({ ...prev, [newTopping]: false }));
      setNewTopping("");
      setShowAddTopping(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <Sidebar />
      <Navbar />
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "1350px",
          margin: "0 auto",
          marginTop: "30px",
          marginLeft: "290px",
          backgroundColor: "#ffffff",
          height: "650px",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "auto",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Add Pizza
          </Typography>

          <TextField
            margin="dense"
            label="Pizza Name"
            fullWidth
            variant="outlined"
            value={pizzaName}
            onChange={(e) => setPizzaName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#FF8100",
                },
            }}
          />

          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Topping
          </Typography>
          <Box>
            {toppings.map((topping) => (
              <FormControlLabel
                key={topping}
                control={
                  <Checkbox
                    checked={!!selectedToppings[topping]}
                    onChange={() => handleToggleTopping(topping)}
                    sx={{
                      color: "#FF8100",
                      "&.Mui-checked": {
                        color: "#FF8100",
                      },
                    }}
                  />
                }
                label={topping}
              />
            ))}
            <Box sx={{ marginTop: 1, display: "flex", alignItems: "center" }}>
              {showAddTopping && (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Topping Name"
                    value={newTopping}
                    onChange={(e) => setNewTopping(e.target.value)}
                    sx={{
                      marginRight: 1,
                      width: "150px",
                      fontSize: "10px",
                      border: "1px solid #FF8100",
                      borderRadius: "4px",
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          borderColor: "#FF8100",
                        },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleAddNewTopping}
                    sx={{
                      backgroundColor: "#FF8100",
                      "&:hover": {
                        backgroundColor: "#e07b00",
                      },
                    }}
                  >
                    Add
                  </Button>
                </>
              )}
              <Button
                variant="outlined"
                sx={{
                  color: "#FF8100",
                  borderColor: "#FF8100",
                  marginLeft: showAddTopping ? 1 : 0,
                }}
                onClick={() => setShowAddTopping((prev) => !prev)}
              >
                {showAddTopping ? <MdCancel /> : "Add"}
              </Button>
            </Box>
          </Box>

          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#FF8100",
                },
            }}
          />

          <Box
            sx={{
              border: "2px dashed #FF8100",
              borderRadius: 2,
              padding: "24px 70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginBottom: 2,
              marginTop: "20px",
            }}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none", width: "220px" }}
            />
            <FaUpload style={{ marginRight: 8, color: "#FF8100" }} />
            <Typography variant="body1">Upload Pizza Photo</Typography>
          </Box>
          {photo && (
            <img
              src={photo}
              alt="Pizza"
              style={{
                maxWidth: "100%",
                maxHeight: "50px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          )}
          <Button
            variant="contained"
            sx={{
              marginTop: 2,
              height: "70px",
              borderRadius: "17px",
              backgroundColor: "#FF8100",
              "&:hover": {
                backgroundColor: "#e07b00",
                height: "70px",
                borderRadius: "25px",
              },
              width: "50%",
            }}
            onClick={handleAddPizza}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AddMenu;
