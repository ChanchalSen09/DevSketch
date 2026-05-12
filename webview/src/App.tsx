import {
  Excalidraw,
  MainMenu,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Excalidraw name="DevSketch" aiEnabled={false}>
        <MainMenu>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.SaveToActiveFile />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.CommandPalette />
          <MainMenu.DefaultItems.SearchMenu />
          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.Separator />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
      </Excalidraw>
    </div>
  );
}

export default App;
