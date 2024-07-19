import React, { useEffect } from "react";
import { registerRootComponent } from "expo";
import * as Updates from "expo-updates";
import App from "./src/app/_layout";

async function updateApp() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // Reload the app immediately when an update is available
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.error("Error checking or applying updates:", error);
  }
}

function Root() {
  useEffect(() => {
    updateApp();
  }, []);

  return <App />;
}

registerRootComponent(Root);
