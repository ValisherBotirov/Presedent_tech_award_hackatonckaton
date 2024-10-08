export interface IFirstQuestion {
  id: number;
  question: string;
  question_audio: string;
}

export interface IFirstQuestionResponse {
  ok: boolean;
  chat: number;
  end: boolean;
  result: IFirstQuestion;
}
