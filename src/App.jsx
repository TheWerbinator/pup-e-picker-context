import React from "react";
import "./App.css";
import "./fonts/RubikBubbles-Regular.ttf";
import { Section } from "./Components/Section";
import { Dogs } from "./Components/Dogs";
import { CreateDogForm } from "./Components/CreateDogForm";
import { useDogs } from "./providers/dog_provider";

function App() {
  const { showComponent } = useDogs();
  const routes = ["all-dogs", "favorite-dogs", "unfavorite-dogs"];
  return (
      <div className="App">
        <header>
          <h1>pup-e-picker</h1>
        </header>
        <Section label={"Dogs: "}>
          {routes.includes(showComponent) && <Dogs />}
          {showComponent === "create-dog-form" && <CreateDogForm />}
        </Section>
      </div>
  );
}

export default App;
