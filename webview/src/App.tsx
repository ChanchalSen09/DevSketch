import {
  Excalidraw,
  MainMenu,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

type DevSketchSurface = "sidebar" | "editor";

type VsCodeApi = {
  postMessage: (message: { type: string }) => void;
};

declare global {
  interface Window {
    __DEVSKETCH_SURFACE__?: DevSketchSurface;
    acquireVsCodeApi?: () => VsCodeApi;
  }
}

let cachedVsCodeApi: VsCodeApi | undefined;

function getVsCodeApi(): VsCodeApi | undefined {
  if (cachedVsCodeApi) {
    return cachedVsCodeApi;
  }

  if (typeof window.acquireVsCodeApi === "function") {
    try {
      cachedVsCodeApi = window.acquireVsCodeApi();
      return cachedVsCodeApi;
    } catch (error) {
      console.error("[DevSketch] Failed to acquire VS Code API:", error);
    }
  }

  return undefined;
}

function App() {
  const surface = window.__DEVSKETCH_SURFACE__ ?? "editor";

  if (surface === "sidebar") {
    const vscode = getVsCodeApi();

    return (
      <div
        style={{
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "12px 10px",
          fontFamily: "var(--vscode-font-family)",
          color: "var(--vscode-foreground)",
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--vscode-editor-background) 92%, #2f86b7 8%) 0%, var(--vscode-editor-background) 60%)",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            padding: "14px",
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--vscode-sideBar-background) 78%, #1f3d56 22%) 0%, color-mix(in srgb, var(--vscode-sideBar-background) 92%, #0d1117 8%) 100%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                opacity: 0.68,
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              DEVSKETCH
            </p>
            <h2
              style={{
                margin: "6px 0 0 0",
                fontSize: "17px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Whiteboard Hub
            </h2>
            <p
              style={{
                margin: "6px auto 0 auto",
                fontSize: "12px",
                opacity: 0.72,
                textAlign: "center",
                lineHeight: 1.45,
                maxWidth: "220px",
              }}
            >
              Sketch ideas, flows, and debugging maps
            </p>
          </div>

          <a
            href="command:devsketch.openBoard"
            style={{
              display: "block",
              width: "100%",
              cursor: "pointer",
              border: "none",
              background:
                "linear-gradient(135deg, var(--vscode-button-background), color-mix(in srgb, var(--vscode-button-background) 70%, #6ac6ff 30%))",
              color: "var(--vscode-button-foreground)",
              borderRadius: "10px",
              padding: "11px 12px",
              fontWeight: 700,
              textAlign: "center",
              boxShadow: "0 3px 10px rgba(40, 144, 195, 0.3)",
              textDecoration: "none",
            }}
            onClick={() => {
              console.log("[DevSketch] Sidebar button clicked.");
              vscode?.postMessage({ type: "openBoard" });
            }}
          >
            Open Whiteboard
          </a>

          <div
            style={{
              marginTop: "10px",
              display: "grid",
              gap: "8px",
            }}
          >
            <section
              style={{
                borderRadius: "10px",
                padding: "10px",
                background: "color-mix(in srgb, var(--vscode-sideBar-background) 90%, #111 10%)",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0", fontSize: "12px", opacity: 0.92, textAlign: "center" }}>
                Recent Boards
              </h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.68, textAlign: "center" }}>
                No recent boards yet
              </p>
            </section>

            <section
              style={{
                borderRadius: "10px",
                padding: "10px",
                background: "color-mix(in srgb, var(--vscode-sideBar-background) 90%, #111 10%)",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0", fontSize: "12px", opacity: 0.92, textAlign: "center" }}>
                Notes
              </h3>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.68, textAlign: "center" }}>
                Sidebar notes coming soon
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }

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
