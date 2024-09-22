import { defineStore } from "pinia";
import API from "../src/plugins/axios";
import { IFirstQuestion, IFirstQuestionResponse } from "@/types/first-question";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useNextQuestion = defineStore("nextQuestion", {
  state: () => ({
    next_question: {} as IFirstQuestion,
    loading: false,
    error: false,
  }),
  actions: {
    async postAnswer(
      id: number,
      answer: string | Blob,
      type: "audio" | "text"
    ) {
      let data;
      if (type === "text") {
        data = { answer };
      } else {
        const formData = new FormData();
        formData.append("answer_audio", answer);
        data = formData;
      }
      this.loading = true;
      try {
        const response = await API.post<IFirstQuestionResponse>(
          `/answer/${id}/`,
          {
            ...data,
          }
        );
        return response.data;
      } catch {
        this.error = true;
        toast.error("Something went wrong");
      } finally {
        this.loading = false;
      }
    },
  },
});
