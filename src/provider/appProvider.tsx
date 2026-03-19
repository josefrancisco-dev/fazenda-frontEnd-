import { QueryClientProvider , QueryClient} from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from ".";

export const AppProviders = () => {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" /> 
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};
