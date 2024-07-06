import { useState, useEffect } from "react";
import MealsCard from "../MealCard/MealsCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Modal, Button } from "react-bootstrap";
import "./Meals.css";

const Meals = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [mealsIDToShow, setMealsIDToShow] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateKey, setUpdateKey] = useState(0); // New state variable for forcing updates

  const [week1, setWeek1] = useState([9, 10]);
  const [week2, setWeek2] = useState([3, 4]);
  const [week3, setWeek3] = useState([5, 6]);
  const [week4, setWeek4] = useState([7, 8]);
  const [allMealsIds, setAllMealsIds] = useState(
    Array.from({ length: 10 }, (_, index) => index + 1)
  );

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setAllMeals(data.recipes);
        setMealsIDToShow(allMealsIds);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, [allMealsIds]);

  useEffect(() => {
    if (selectedWeekIndex !== null) {
      switch (selectedWeekIndex) {
        case 1:
          setMealsIDToShow(week1);
          break;
        case 2:
          setMealsIDToShow(week2);
          break;
        case 3:
          setMealsIDToShow(week3);
          break;
        case 4:
          setMealsIDToShow(week4);
          break;
        default:
          setMealsIDToShow(allMealsIds);
          break;
      }
    } else {
      setMealsIDToShow(allMealsIds);
    }
  }, [selectedWeekIndex, week1, week2, week3, week4, allMealsIds, updateKey]); // Added updateKey to the dependency array

  const handleSelectWeek = (index) => {
    setSelectedWeekIndex(index === 0 ? null : index);
    setUpdateKey(prevKey => prevKey + 1); // Update the state variable to trigger re-render
  };

  const handleAddToWeek = () => {
    if (selectedWeekIndex !== null && selectedMeals.length > 0) {
      let updatedWeek = [];
      switch (selectedWeekIndex) {
        case 1:
          updatedWeek = [...week1, ...selectedMeals];
          setWeek1(updatedWeek);
          break;
        case 2:
          updatedWeek = [...week2, ...selectedMeals];
          setWeek2(updatedWeek);
          break;
        case 3:
          updatedWeek = [...week3, ...selectedMeals];
          setWeek3(updatedWeek);
          break;
        case 4:
          updatedWeek = [...week4, ...selectedMeals];
          setWeek4(updatedWeek);
          break;
        default:
          break;
      }
      setSelectedMeals([]);
      closeModal();
    } else {
      console.warn("Please select a week and meals to add.");
    }
  };

  const handleMealSelect = (meal) => {
    setSelectedMeals((prevSelected) => {
      if (prevSelected.includes(meal.id)) {
        return prevSelected.filter((id) => id !== meal.id);
      } else {
        return [...prevSelected, meal.id];
      }
    });
  };

  const handleDeleteMeal = (mealId) => {
    setSelectedMeals((prevSelected) =>
      prevSelected.filter((id) => id !== mealId)
    );
    if (selectedWeekIndex !== null) {
      switch (selectedWeekIndex) {
        case 1:
          setWeek1((prevWeek1) => prevWeek1.filter((id) => id !== mealId));
          break;
        case 2:
          setWeek2((prevWeek2) => prevWeek2.filter((id) => id !== mealId));
          break;
        case 3:
          setWeek3((prevWeek3) => prevWeek3.filter((id) => id !== mealId));
          break;
        case 4:
          setWeek4((prevWeek4) => prevWeek4.filter((id) => id !== mealId));
          break;
        default:
          break;
      }
    } else {
      if (!allMealsIds.includes(mealId)) {
        setWeek1((prevWeek1) => prevWeek1.filter((id) => id !== mealId));
        setWeek2((prevWeek2) => prevWeek2.filter((id) => id !== mealId));
        setWeek3((prevWeek3) => prevWeek3.filter((id) => id !== mealId));
        setWeek4((prevWeek4) => prevWeek4.filter((id) => id !== mealId));
      }
    }
    setMealsIDToShow((prevMealsID) =>
      prevMealsID.filter((id) => id !== mealId)
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveWeek = () => {
    closeModal();
    if (selectedWeekIndex !== null && selectedMeals.length > 0) {
      handleAddToWeek();
    }
    console.log(`Saved selected meals to Week ${selectedWeekIndex}`);
  };

  const getMealsToShow = () => {
    return allMeals.filter((meal) => mealsIDToShow.includes(meal.id));
  };

  const getAddedMealsForWeek = (weekIndex) => {
    switch (weekIndex) {
      case 1:
        return week1;
      case 2:
        return week2;
      case 3:
        return week3;
      case 4:
        return week4;
      default:
        return [];
    }
  };

  // Dynamic heading based on selected week
  const selectedWeekHeading =
    selectedWeekIndex !== null
      ? `Week ${selectedWeekIndex} Meals`
      : "All Meals";

  // Determine the alignment class based on the number of meals
  const getAlignmentClass = () => {
    return mealsIDToShow.length < 3
      ? "justify-content-start"
      : "justify-content-between";
  };

  return (
    <>
      <nav className="d-flex justify-content-center">
        <div className="weeks-container d-flex justify-content-between align-items-center">
          <ul className="weeks d-flex justify-content-between p-0 m-0">
            {[
              "All Meals",
              "Week One",
              "Week Two",
              "Week Three",
              "Week Four",
            ].map((week, index) => (
              <li
                key={index}
                className={`nav-item ${
                  hoveredIndex === index ||
                  selectedWeekIndex === (index === 0 ? null : index)
                    ? "active"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => handleSelectWeek(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {week}
              </li>
            ))}
          </ul>
          <button className="week-button" onClick={openModal}>
            Add Week
          </button>
        </div>
      </nav>

      <div className="meal-container d-flex justify-content-center flex-wrap">
        <div className="all-meals-container">
          <h2>{selectedWeekHeading}</h2>
          <div className={`all-meals d-flex flex-wrap ${getAlignmentClass()}`}>
            {getMealsToShow().map((meal) => (
              <div
                key={meal.id}
                className={`meal-item ${
                  selectedMeals.includes(meal.id) ? "selected" : ""
                }`}
              >
                <MealsCard
                  recipe={meal}
                  onSelect={() => handleMealSelect(meal)}
                  onDelete={handleDeleteMeal}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header>
          <Modal.Title className="w-100 text-center">Select Week</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-around flex-wrap">
            {["Week One", "Week Two", "Week Three", "Week Four"].map(
              (week, index) => {
                const isAdded = selectedMeals.some((mealId) =>
                  getAddedMealsForWeek(index + 1).includes(mealId)
                );
                return (
                  <Button
                    key={index}
                    className={`m-2 ${
                      selectedWeekIndex === index + 1
                        ? "btn-primary"
                        : "btn-secondary"
                    }`}
                    onClick={() => handleSelectWeek(index + 1)}
                    variant={
                      selectedWeekIndex === index + 1 ? "primary" : "secondary"
                    }
                    style={{ flex: "1" }}
                    disabled={isAdded} // Disable the button if the meal is already added
                  >
                    {week}
                  </Button>
                );
              }
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="primary"
            onClick={handleSaveWeek}
            style={{ padding: "10px 50px", fontSize: "16px" }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Meals;
