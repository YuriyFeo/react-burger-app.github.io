import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import appStyle from "./app.module.css";

const App = () => {
  return (
    <div > 
       <AppHeader />
      <main className={appStyle.mainContainer}>
       {/* Добавил провайдер для DragNDrop  */}
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
