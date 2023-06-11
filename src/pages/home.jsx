//  Главная страница - пока что полная копия /components/app
import { AppHeader } from "../components/app-header/app-header";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import HomeStyle from "./home.module.css";

export const HomePage = () => {
  return (
    <div>
      <AppHeader />
      <main className={HomeStyle.mainContainer}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
