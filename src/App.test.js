import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import Recipe from "./components/Recipe";
import Blog from "./components/Blog";
import EditBlog from "./components/EditBlog";
import EditRecipe from "./components/EditRecipe";
import UserContext from "./context/AppContext";

it("renders App without crashing", () => {
  render(<App />);
});

it("renders Recipe data", () => {
  const data = {
    recipeTitle: "pizza",
    ingredients: [],
    methods: [],
    serves: "3",
  };
  const { getByText } = render(<Recipe {...data} />);
  // If the component is working elements displaying the data will exist
  expect(getByText("pizza")).not.toBeNull();
  expect(getByText("Serves: 3")).not.toBeNull();
});

it("renders Blog data", () => {
  const data = {
    blogTitle: "protein",
    paragraphs: [{ heading: "amount", content: "1g/kg/day" }],
  };
  const { getByText } = render(<Blog {...data} />);
  expect(getByText("protein")).not.toBeNull();
});

it("updates preview title when blogTitle input is changed", () => {
  const index = { params: { index: "0" } };
  const data = { blogs: [{ blogTitle: "protein", paragraphs: [] }] };

  // renders the component and provides the state from context
  const { getByTestId, getByLabelText } = render(
    <UserContext.Provider value={data}>
      <EditBlog match={index} />
    </UserContext.Provider>
  );

  const input = getByLabelText("Title:");
  // Simulates the test input changing
  fireEvent.change(input, { target: { value: "carbs" } });
  // the H2 element linked to the state will update after the event
  expect(getByTestId("1").innerHTML).toContain("carbs");
});

it("updates preview title when recipeTitle input is changed", () => {
  const index = { params: { index: "0" } };
  const data = {
    recipes: [{ recipeTitle: "pizza", ingredients: [], methods: [] }],
  };

  const { getByTestId, getByLabelText } = render(
    <UserContext.Provider value={data}>
      <EditRecipe match={index} />
    </UserContext.Provider>
  );

  const input = getByLabelText("Title:");
  fireEvent.change(input, { target: { value: "pasta" } });
  expect(getByTestId("2").innerHTML).toContain("pasta");
});
