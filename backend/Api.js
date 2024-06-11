const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Employeemodel = require("./models/Employee");
const Booking = require("./models/Booking");
const Contact = require("./models/Contct");
const owner = require("./models/Owner");
const Order = require("./models/Orders");
const Event = require('./models/Event')
const ProductModel = require("./models/Products");
const fs = require("fs");
const path = require('path');
const bcrypt = require('bcrypt');
const Club = require("./models/Club");
const app = express();
const PORT = 3001;
const multer = require("multer");
mongoose.connect("mongodb://localhost:27017/employee");

app.use(bodyParser.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use("/uploads", express.static(uploadDir));

// Endpoint to handle profile image upload
app.post("/upload", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ filePath: `uploads/${req.file.filename}` });
});

app.put("/updateProfile", async (req, res) => {
  const { id, newName, newEmail, newPhone } = req.body;

  try {
    let updatedFields = {};
    if (newName) updatedFields.name = newName;
    if (newEmail) updatedFields.email = newEmail;
    if (newPhone) updatedFields.phone = newPhone;

    const updatedUser = await Employeemodel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Failed to update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//contact
app.post("/contact", (req, res) => {
  const { name, email, messag } = req.body;
  const newContact = new Contact({ name, email, messag });
  newContact
    .save()
    .then((contact) => res.status(201).json(contact))
    .catch((err) => res.status(500).json({ error: err.message }));
});
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//authentication
app.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    const existingUserByEmail = await Employeemodel.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({
          message: "Email already exists. Please use a different email.",
        });
    }
    const existingUserByName = await Employeemodel.findOne({ name });
    if (existingUserByName) {
      return res
        .status(400)
        .json({
          message: "Username already exists. Please choose another one.",
        });
    }
    const newEmployee = await Employeemodel.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    console.error("Failed to register employee:", err);
    res.status().json({ message: "Internal server error" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Employeemodel.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        return res.json({ message: "Success", username: user.name });
      } else {
        return res.json("Incorrect password");
      }
    } else {
      return res.json("No record found");
    }
  } catch (err) {
    console.error("Failed to log in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//booking
app.post("/book", async (req, res) => {
  console.log(req.body,'req.body')
  const { location, date, slots, name, duration, price,approved,rejectReason,rejected } = req.body;
  try {
    const existingUser = await Employeemodel.findOne({ name: name });
    console.log("Existing user:", existingUser);
    if (!existingUser) {
      return res
        .status(400)
        .json({
          message:
            "User not registered. Please register before making a booking.",
        });
    }

    const checked = await Booking.findOne({$or: slots.map(slot => ({ 
      "slots.startTime": slot.startTime, 
      "slots.endTime": slot.endTime,
      "date":slot.date
  })) });
    console.log(checked)
    if (checked) {
      return res
        .status(400)
        .json({ message: "Slot already booked. Please choose another time." });
    }
    const newBooking = new Booking({
      location,
      date,
      slots,
      name,
      duration,
      approved,
      rejected,
      rejectReason,
      price,
    });
    console.log(newBooking)
    await newBooking.save();
    return res.status(200).json({ message: "Booking successful!" });
  } catch (error) {
    console.error("Failed to book slot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  const { approved, rejected ,rejectReason } = req.body; // Update only approved and rejected fields

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { approved, rejected ,rejectReason}, // Update only approved and rejected fields
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(updatedBooking);
  } catch (error) {
    console.error("Failed to update booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.post("/product/buy/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.purchased = true; // Mark product as purchased
    await product.save();

    return res.status(200).json({ message: "Product purchased successfully!" });
  } catch (error) {
    console.error("Failed to purchase product:", error);
    return res.status(500).json({ message: "Failed to purchase product" });
  }
});

app.get("/infoP", async (req, res) => {
  try {
    const dis = await ProductModel.find();
    res.json(dis);
  } catch (error) {
    console.error("faild to fetch", error);
  }
});
app.put("/productU/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, Buyer, Location } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, Buyer, Location },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/productd/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({
      messag: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/show", async (req, res) => {
  try {
    const show = await Employeemodel.find();
    res.json(show);
  } catch (error) {
    console.error("failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//clubs
app.get("/clubs", async (req, res) => {
  try {
    const clubs = await Club.find();
    console.log("clubs", clubs);
    res.json(clubs);
  } catch (error) {
    console.error("failed", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/clubs", upload.single("image"), async (req, res) => {
  const { name, address,price } = req.body; // Assuming name and address are regular form fields

  // Assuming req.file contains the uploaded file
  console.log("req.file", req.file);
  const fileContent = fs.readFileSync(req.file.path);
  const image = fileContent.toString("base64");

  try {
    const existingClubByName = await Club.findOne({ name });
    if (existingClubByName) {
      return res
        .status(400)
        .json({ message: "Club already exists. Please use a different name." });
    }
    console.log("image", image);
    const newClub = await Club.create({ name, address, image,price });
    res.json(newClub);
  } catch (err) {
    console.error("Failed to add club:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/club/:id", async (req, res) => {
  const { id } = req.params;
  const { name, address,price } = req.body;
  try {
    const updatedClub = await Club.findByIdAndUpdate(
      id,
      { name, address,price },
      { new: true }
    );
    if (!updatedClub) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json(updatedClub);
  } catch (error) {
    console.error("Failed to update club:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/club/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Club.findByIdAndDelete(id);
    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    console.error("Failed to delete club:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//order

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/orders", upload.single("image"), async (req, res) => {
  const { buyerName, location, productName, price, quantity, total } = req.body;
  const fileContent = fs.readFileSync(req.file.path);
  const image = fileContent.toString("base64");
  try {
    const newOrder = await Order.create({
      buyerName,
      location,
      productName,
      price,
      quantity,
      total,
      image,
    });
    res.json({"message":"Order Created Successfully!"});
  } catch (error) {
    console.error("Failed to add order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/order/:id", async (req, res) => {
  const { id } = req.params;
  const { buyerName, location, productName, price, quantity, total } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { buyerName, location, productName, price, quantity, total },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id);
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Failed to delete order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//event

// Get all events
app.get("/events", async(req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch(error) {
    console.error("Failed to fetch events:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new event
app.post("/events", async (req, res) => {
  const { name, dateTime, location } = req.body;
  try {
    const newEvent = await Event.create({ name, dateTime, location });
    res.json(newEvent);
  } catch (error) {
    console.error('Failed to add event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update event by ID
app.put("/event/:id", async (req, res) => {
  const { id } = req.params;
  const { name, dateTime, location } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, { name, dateTime, location }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error('Failed to update event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete event by ID
app.delete("/event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Failed to delete event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//owner
app.post("/owner", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const owne = new owner({ name, email, password });
    console.log("owne", owne);
    await owne.save();
    res.json("success");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create owner", error: error.message });
  }
});
app.post("/ownerlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await owner.findOne({ email });

    if (!user) {
      return res.json("no record found");
    }

    if (user.password !== password) {
      return res.json("incorrect password");
    }

    res.json("succes");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.put("/updatePassword", async (req, res) => {
  const { id, oldPassword, newPassword } = req.body;

  try {
    // Find user by ID
    const user = await Employeemodel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error); // Log the error for debugging
    res.status(500).json({ message: "Failed to update password. Please try again." });
  }
});


//port
app.listen(PORT, () => {
  console.log(` Our Server is running on port Number ${PORT}`);
});
