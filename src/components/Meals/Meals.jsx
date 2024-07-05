import React, { useState, useEffect } from "react";
import MealsCard from "../MealCard/MealsCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Modal, Button } from "react-bootstrap";
import "./Meals.css";

const Meals = () => {
  const [allMeals, setAllMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [mealsIDToShow, setMealsIDToShow] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separate states for each week with initial meal IDs
  const [week1, setWeek1] = useState([1, 2]);
  const [week2, setWeek2] = useState([3, 4]);
  const [week3, setWeek3] = useState([5, 6]);
  const [week4, setWeek4] = useState([7, 8]);

  // State for all meals with IDs 1 to 10
  const [allMealsIds, setAllMealsIds] = useState(Array.from({ length: 10 }, (_, index) => index + 1));

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setAllMeals(data.recipes);
        // Initially show all meals
        setMealsIDToShow(allMealsIds);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [allMealsIds]);

  useEffect(() => {
    // Update mealsIDToShow whenever selectedWeekIndex or selectedMeals change
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
      // If no specific week is selected, show meals from all weeks
      setMealsIDToShow(allMealsIds);
    }
  }, [selectedWeekIndex, week1, week2, week3, week4, allMealsIds]);

  const handleSelectWeek = (index) => {
    setSelectedWeekIndex(index);
    setActiveIndex(index);
  };

  const handleAddToWeek = () => {
    if (selectedWeekIndex !== null && selectedMeals.length > 0) {
      // Determine which week state to update based on selectedWeekIndex
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
    setSelectedMeals(prevSelected => {
      if (prevSelected.includes(meal.id)) {
        return prevSelected.filter(id => id !== meal.id);
      } else {
        return [...prevSelected, meal.id];
      }
    });
  };

  const handleDeleteMeal = (mealId) => {
    console.log("working")
    setSelectedMeals(prevSelected => prevSelected.filter(id => id !== mealId));
  
    // Remove meal from the corresponding week state based on selectedWeekIndex
    if (selectedWeekIndex !== null) {
      switch (selectedWeekIndex) {
        case 1:
          setWeek1(prevWeek1 => prevWeek1.filter(id => id !== mealId));
          break;
        case 2:
          setWeek2(prevWeek2 => prevWeek2.filter(id => id !== mealId));
          break;
        case 3:
          setWeek3(prevWeek3 => prevWeek3.filter(id => id !== mealId));
          break;
        case 4:
          setWeek4(prevWeek4 => prevWeek4.filter(id => id !== mealId));
          break;
        default:
          break;
      }
    } else {
      // If no specific week is selected, remove meal from all week states except "All Meals"
      if (!allMealsIds.includes(mealId)) {
        setWeek1(prevWeek1 => prevWeek1.filter(id => id !== mealId));
        setWeek2(prevWeek2 => prevWeek2.filter(id => id !== mealId));
        setWeek3(prevWeek3 => prevWeek3.filter(id => id !== mealId));
        setWeek4(prevWeek4 => prevWeek4.filter(id => id !== mealId));
      }
    }

    // Always update mealsIDToShow to reflect the current state after deletion
    setMealsIDToShow(prevMealsID => prevMealsID.filter(id => id !== mealId));
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
      handleAddToWeek(); // Ensure selected meals are added to the week
    }
    console.log(`Saved selected meals to Week ${selectedWeekIndex}`);
    // Implement logic to save the selected week with the updated meal IDs
  };

  // Function to filter meals based on mealsIDToShow
  const getMealsToShow = () => {
    return allMeals.filter(meal => mealsIDToShow.includes(meal.id));
  };

  return (
    <>
      <nav className="d-flex justify-content-center">
        <div className="weeks-container d-flex justify-content-between align-items-center">
          <ul className="weeks d-flex justify-content-between p-0 m-0">
            {["All Meals", "Week One", "Week Two", "Week Three", "Week Four"].map((week, index) => (
              <li
                key={index}
                className={`nav-item ${activeIndex === index ? "active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelectWeek(index)}
                onMouseLeave={() => setActiveIndex(null)}
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
          <h2>Selected Week Meals</h2>
          <div className="all-meals d-flex flex-wrap gap-3">
            {getMealsToShow().map((meal) => (
              <div key={meal.id} className={`meal-item ${selectedMeals.includes(meal.id) ? 'selected' : ''}`}>
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
            {["Week One", "Week Two", "Week Three", "Week Four"].map((week, index) => (
              <Button
                key={index}
                className={`m-2 ${selectedWeekIndex === index + 1 ? "btn-primary" : "btn-secondary"}`}
                onClick={() => handleSelectWeek(index + 1)}
                variant={selectedWeekIndex === index + 1 ? "primary" : "secondary"}
                style={{ flex: '1' }}
              >
                {week}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="primary" onClick={handleSaveWeek} style={{ padding: '10px 50px', fontSize: '16px' }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Meals;
