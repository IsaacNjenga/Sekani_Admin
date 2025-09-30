const updateUser = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { updateUser };
