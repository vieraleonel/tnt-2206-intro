import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export function useRefreshOnFocus(queryKey: string[]) {
  const queryClient = useQueryClient();
  const firstTimeRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      // skip refetching on the first focus (initial mount)
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // refetch all stale active queries
      queryClient.refetchQueries({
        queryKey: queryKey,
        stale: true,
        type: "active",
      });
    }, [queryClient]),
  );
}
