

// @desc Get goals
// @route GET/api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get Goals" });
};

// @desc Get one goal
// @route GET/api/goals
// @access Private
const getGoal = (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add text')
    }
    res.status(200).json({ message: "Get One Goal" });
  };

// @desc Set goals
// @route POST/api/goals
// @access Private
const setGoal = (req, res) => {
  res.status(200).json({ message: "Set Goal" });
};

// @desc Update goals
// @route PUT/api/goals
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({ message: "Update Goal" });
};

// @desc Delete goals
// @route DELETE/api/goals
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({ message: "Delete Goal" });
};

module.exports = {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal
};
