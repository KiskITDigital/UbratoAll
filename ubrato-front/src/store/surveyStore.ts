import { create } from 'zustand';

interface SurveyQuestionsT {
  question1: { answer: string; comment: string };
  setQuestion1(answer: string): void;
  setQuestion1comment(comment: string): void;
  isPage1Completed: boolean;
  setIsPage1Completed(isPage1Completed: boolean): void;
  question2: { rate: string; comment: string };
  setQuestion2(answer: string): void;
  setQuestion2comment(comment: string): void;
  question3: { rate: string; comment: string };
  setQuestion3(answer: string): void;
  setQuestion3comment(comment: string): void;
  question4: {
    naviagtion: string;
    companyInfoChanging: string;
    contactInfoChanging: string;
    portfolioCreating: string;
    comment: string;
  };
  setQuestion4nav(answer: string): void;
  setQuestion4company(answer: string): void;
  setQuestion4contact(answer: string): void;
  setQuestion4portfolio(answer: string): void;
  setQuestion4comment(comment: string): void;
  question5: { rate: string; comment: string };
  setQuestion5(answer: string): void;
  setQuestion5comment(comment: string): void;
  isPage2Completed: boolean;
  setIsPage2Completed(isPage2Completed: boolean): void;
  question6: {
    answers: string[];
    comment: string;
  };
  setQuestion6answers(answers: string[]): void;
  setQuestion6comment(comment: string): void;
  question7: {
    rate: string;
    comment: string;
  };
  setQuestion7(answer: string): void;
  setQuestion7comment(comment: string): void;
  question8: {
    answers: string[];
    comment: string;
  };
  setQuestion8answers(answers: string[]): void;
  setQuestion8comment(comment: string): void;
  isPage3Completed: boolean;
  setIsPage3Completed(isPage3Completed: boolean): void;
  question9: {
    rate: string;
    comment: string;
  };
  setQuestion9(answer: string): void;
  setQuestion9comment(comment: string): void;
  question10: {
    rate: string;
    comment: string;
  };
  setQuestion10(answer: string): void;
  setQuestion10comment(comment: string): void;
  question11: {
    response: string;
    priceNDS: string;
    chat: string;
    winnerInfo: string;
    readyConfirm: string;
    comment: string;
  };
  setQuestion11response(answer: string): void;
  setQuestion11priceNDS(answer: string): void;
  setQusetion11chat(answer: string): void;
  setQuestion11winnerInfo(answer: string): void;
  setQuestion11readyConfirm(answer: string): void;
  setQuestion11comment(comment: string): void;
  isPage4Completed: boolean;
  setIsPage4Completed(isPage4Completed: boolean): void;
  question12: {
    answers: string[];
    comment: string;
  };
  setQuestion12answers(answers: string[]): void;
  setQuestion12comment(comment: string): void;
  question13: {
    answers: string[];
    comment: string;
  };
  setQuestion13answers(answers: string[]): void;
  setQuestion13comment(comment: string): void;
  question14: {
    answers: string[];
  };
  setQuestion14answers(answers: string[]): void;
  question15: string;
  setQuestion15(comment: string): void;
}

export const useSurveyStore = create<SurveyQuestionsT>()((set) => ({
  question1: {
    answer: '',
    comment: '',
  },
  setQuestion1(answer) {
    set({ question1: { answer: answer, comment: this.question1.comment } });
  },
  setQuestion1comment(comment) {
    set({ question1: { answer: this.question1.answer, comment: comment } });
  },
  isPage1Completed: false,
  setIsPage1Completed(isPage1Completed) {
    set({ isPage1Completed: isPage1Completed });
  },
  question2: {
    rate: '',
    comment: '',
  },
  setQuestion2(answer) {
    set({ question2: { rate: answer, comment: this.question2.comment } });
  },
  setQuestion2comment(comment) {
    set({ question2: { rate: this.question2.rate, comment: comment } });
  },
  question3: {
    rate: '',
    comment: '',
  },
  setQuestion3(answer) {
    set({ question3: { rate: answer, comment: this.question3.comment } });
  },
  setQuestion3comment(comment) {
    set({ question3: { rate: this.question3.rate, comment: comment } });
  },
  question4: {
    naviagtion: '',
    companyInfoChanging: '',
    contactInfoChanging: '',
    portfolioCreating: '',
    comment: '',
  },
  setQuestion4nav(answer) {
    set({
      question4: {
        naviagtion: answer,
        companyInfoChanging: this.question4.companyInfoChanging,
        contactInfoChanging: this.question4.contactInfoChanging,
        portfolioCreating: this.question4.portfolioCreating,
        comment: this.question4.comment,
      },
    });
  },
  setQuestion4company(answer) {
    set({
      question4: {
        naviagtion: this.question4.naviagtion,
        companyInfoChanging: answer,
        contactInfoChanging: this.question4.contactInfoChanging,
        portfolioCreating: this.question4.portfolioCreating,
        comment: this.question4.comment,
      },
    });
  },
  setQuestion4contact(answer) {
    set({
      question4: {
        naviagtion: this.question4.naviagtion,
        companyInfoChanging: this.question4.companyInfoChanging,
        contactInfoChanging: answer,
        portfolioCreating: this.question4.portfolioCreating,
        comment: this.question4.comment,
      },
    });
  },
  setQuestion4portfolio(answer) {
    set({
      question4: {
        naviagtion: this.question4.naviagtion,
        companyInfoChanging: this.question4.companyInfoChanging,
        contactInfoChanging: this.question4.contactInfoChanging,
        portfolioCreating: answer,
        comment: this.question4.comment,
      },
    });
  },
  setQuestion4comment(comment) {
    set({
      question4: {
        naviagtion: this.question4.naviagtion,
        companyInfoChanging: this.question4.companyInfoChanging,
        contactInfoChanging: this.question4.contactInfoChanging,
        portfolioCreating: this.question4.portfolioCreating,
        comment: comment,
      },
    });
  },
  question5: {
    rate: '',
    comment: '',
  },
  setQuestion5(answer) {
    set({ question5: { rate: answer, comment: this.question5.comment } });
  },
  setQuestion5comment(comment) {
    set({ question5: { rate: this.question5.rate, comment: comment } });
  },
  isPage2Completed: false,
  setIsPage2Completed(isPage2Completed) {
    set({ isPage2Completed: isPage2Completed });
  },
  question6: {
    answers: [],
    comment: '',
  },
  setQuestion6answers(answers) {
    set({ question6: { answers: answers, comment: this.question6.comment } });
  },
  setQuestion6comment(comment) {
    set({
      question6: {
        answers: this.question6.answers,
        comment: comment,
      },
    });
  },
  question7: {
    rate: '',
    comment: '',
  },
  setQuestion7(answer) {
    set({ question7: { rate: answer, comment: this.question7.comment } });
  },
  setQuestion7comment(comment) {
    set({ question7: { rate: this.question7.rate, comment: comment } });
  },
  question8: {
    answers: [],
    comment: '',
  },
  setQuestion8answers(answers) {
    set({ question8: { answers: answers, comment: this.question8.comment } });
  },
  setQuestion8comment(comment) {
    set({
      question8: {
        answers: this.question8.answers,
        comment: comment,
      },
    });
  },
  isPage3Completed: false,
  setIsPage3Completed(isPage3Completed) {
    set({ isPage3Completed: isPage3Completed });
  },
  question9: {
    rate: '',
    comment: '',
  },
  setQuestion9(answer) {
    set({ question9: { rate: answer, comment: this.question9.comment } });
  },
  setQuestion9comment(comment) {
    set({ question9: { rate: this.question9.rate, comment: comment } });
  },
  question10: {
    rate: '',
    comment: '',
  },
  setQuestion10(answer) {
    set({ question10: { rate: answer, comment: this.question10.comment } });
  },
  setQuestion10comment(comment) {
    set({ question10: { rate: this.question10.rate, comment: comment } });
  },
  question11: {
    response: '',
    priceNDS: '',
    chat: '',
    winnerInfo: '',
    readyConfirm: '',
    comment: '',
  },
  setQuestion11response(answer) {
    set({
      question11: {
        response: answer,
        priceNDS: this.question11.priceNDS,
        chat: this.question11.chat,
        winnerInfo: this.question11.winnerInfo,
        readyConfirm: this.question11.readyConfirm,
        comment: this.question11.comment,
      },
    });
  },
  setQuestion11priceNDS(answer) {
    set({
      question11: {
        response: this.question11.response,
        priceNDS: answer,
        chat: this.question11.chat,
        winnerInfo: this.question11.winnerInfo,
        readyConfirm: this.question11.readyConfirm,
        comment: this.question11.comment,
      },
    });
  },
  setQusetion11chat(answer) {
    set({
      question11: {
        response: this.question11.response,
        priceNDS: this.question11.priceNDS,
        chat: answer,
        winnerInfo: this.question11.winnerInfo,
        readyConfirm: this.question11.readyConfirm,
        comment: this.question11.comment,
      },
    });
  },
  setQuestion11winnerInfo(answer) {
    set({
      question11: {
        response: this.question11.response,
        priceNDS: this.question11.priceNDS,
        chat: this.question11.chat,
        winnerInfo: answer,
        readyConfirm: this.question11.readyConfirm,
        comment: this.question11.comment,
      },
    });
  },
  setQuestion11readyConfirm(answer) {
    set({
      question11: {
        response: this.question11.response,
        priceNDS: this.question11.priceNDS,
        chat: this.question11.chat,
        winnerInfo: this.question11.winnerInfo,
        readyConfirm: answer,
        comment: this.question11.comment,
      },
    });
  },
  setQuestion11comment(comment) {
    set({
      question11: {
        response: this.question11.response,
        priceNDS: this.question11.priceNDS,
        chat: this.question11.chat,
        winnerInfo: this.question11.winnerInfo,
        readyConfirm: this.question11.readyConfirm,
        comment: comment,
      },
    });
  },
  isPage4Completed: false,
  setIsPage4Completed(isPage4Completed) {
    set({ isPage4Completed: isPage4Completed });
  },
  question12: {
    answers: [],
    comment: '',
  },
  setQuestion12answers(answers) {
    set({ question12: { answers: answers, comment: this.question12.comment } });
  },
  setQuestion12comment(comment) {
    set({ question12: { answers: this.question12.answers, comment: comment } });
  },
  question13: {
    answers: [],
    comment: '',
  },
  setQuestion13answers(answers) {
    set({ question13: { answers: answers, comment: this.question13.comment } });
  },
  setQuestion13comment(comment) {
    set({ question13: { answers: this.question13.answers, comment: comment } });
  },
  question14: {
    answers: [],
  },
  setQuestion14answers(answers) {
    set({ question14: { answers: answers } });
  },
  question15: '',
  setQuestion15(comment) {
    set({ question15: comment });
  },
}));
