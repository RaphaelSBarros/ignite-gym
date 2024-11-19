import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { ToastMessage } from "@components/ToastMessage";
import { Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { AppError } from "@utils/AppError";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";
import { api } from "../service/api";
import { Loading } from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";

export function History() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState([
    {
      title: "22.07.24",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "23.07.24",
      data: ["Puxada frontal"],
    },
  ]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      console.log(response.data[0]);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico";

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="error"
            title={title}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item}
          renderItem={() => <HistoryCard />}
          renderSectionHeader={({ section }) => (
            <Heading
              fontFamily="$heading"
              color="$gray200"
              fontSize="$md"
              mt="$10"
              mb="$3"
            >
              {section.title}
            </Heading>
          )}
          style={{ paddingHorizontal: 32 }}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color="$gray100" textAlign="center">
              Não há exercícios registrados ainda. Vamos fazer exercícios hoje?
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  );
}
