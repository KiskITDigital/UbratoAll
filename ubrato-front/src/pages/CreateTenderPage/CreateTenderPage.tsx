import { CreateTender } from "@/components/CreateTender/CreateTender";
import { useUserInfoStore } from "@/store/userInfoStore";
import { FC, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

export const CreateTenderPage: FC = () => {
  const userInfoStore = useUserInfoStore()
  const navigate = useNavigate()
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!userInfoStore.isLoggedIn) {
      if (navigationType === "POP")
        navigate(-1)
      else
        navigate('/login');
    }
  }, [navigate]);

  return (
    <CreateTender />
  )
}