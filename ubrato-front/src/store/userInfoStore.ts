import { create } from 'zustand';
import { UserInfoT } from '@/types/app';
import { axiosInstance } from '@/utils';
import { surveyCheck } from '@/api';
interface UserInfoState {
  user: UserInfoT;
  fetchUser: (token: string) => Promise<void>;
  loading: boolean;
  error: null | string;
  isLoggedIn: boolean;
  setLoggedIn: (e: boolean) => void;
  passedSurvey: boolean;
  setPassedSurvey: (e: boolean) => void;
  is_contractor: boolean | null;
}

export const useUserInfoStore = create<UserInfoState>()((set) => {

  return {
    is_contractor: null,
    user: {
      id: '',
      email: '',
      phone: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      verified: false,
      is_contractor: false,
      created_at: '',
      avatar: '',
      organization: {
        id: '',
        short_name: '',
        inn: '',
      },
    },
    passedSurvey: false,
    loading: false,
    error: null,
    fetchUser: async (token) => {
      set({ loading: true });
      const response = await axiosInstance.get(`/v1/users/me`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status !== 200) throw response;
      // console.log(response.data);

      const surveyPass = await surveyCheck(token);
      set({
        passedSurvey: surveyPass,
        user: {
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          middle_name: response.data.middle_name,
          id: response.data.id,
          created_at: response.data.created_at,
          phone: response.data.phone,
          is_contractor: response.data.is_contractor,
          verified: response.data.verified,
          email: response.data.email,
          avatar: response.data.avatar,
          organization: response.data.organiztion,
        },
        isLoggedIn: true,
      });
      set({ is_contractor: response.data.is_contractor })
      set({ loading: false });
    },
    isLoggedIn: false,
    setLoggedIn(e) {
      set({ isLoggedIn: e });
    },
    setPassedSurvey(e) {
      set({ passedSurvey: e });
    },
  }
});
