// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "mantine-datatable/styles.layer.css";

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from "@mantine/core";

export const metadata = {
   title: "Empower Demo App",
   description: "I have followed setup instructions carefully",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en" {...mantineHtmlProps}>
         <head>
            <ColorSchemeScript />
         </head>
         <body>
            <MantineProvider>{children}</MantineProvider>
         </body>
      </html>
   );
}
