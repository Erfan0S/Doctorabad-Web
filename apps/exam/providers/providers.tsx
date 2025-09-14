"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers as SharedProviders } from "@repo/shared_modules";
import { ModalsList } from "@/components/common/modals/modalList";
import { QuestionsAnswersProvider } from "@repo/apps_shared_components/exam/contexts/questionsAnswersContext.tsx";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { retry: 3, refetchOnWindowFocus: false } },
    })
  );

  return (
    <QuestionsAnswersProvider>
      <SharedProviders modalList={ModalsList}>{children}</SharedProviders>;
    </QuestionsAnswersProvider>
  );
};

export default Providers;
