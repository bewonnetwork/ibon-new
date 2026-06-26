const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api", (req, res) => {
  res.json({
    status: "running",
    backend: true,
    project: "IBON"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
app.use(express.json());

app.post("/api/register", async (req, res) => {
  try {
    const user = req.body;

    console.log("NEW USER:", user.username);

    res.json({
      success: true,
      message: "User received by backend"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});