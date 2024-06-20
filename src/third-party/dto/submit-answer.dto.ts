export class SubmitAnswerDto {
  displayName: string;

  questionId: string;

  optionId: string;

  submitAnswerTime: Date

  constructor(data?: Partial<SubmitAnswerDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
