import { FC, useEffect, useState } from "react";
import s from "./styles.module.css";
import { Link } from "react-router-dom";
import {
  addFavouriteTender,
  isFavoriteTender,
  removeFavoriteTender,
} from "@/api/favouriteTenders";

interface Hit {
  id: string;
  name: string;
  reception_end: string;
  work_start: string;
  work_end: string;
  price: number;
  city: string;
}

interface CustomHitProps {
  hit: Hit
}
export const TenderListElem: FC<CustomHitProps> = ({ hit }) => {
  // console.log(hit);
  const [fav, setFav] = useState(false);
  const [tokenOuter, setToken] = useState("");
  // const userInfoStore = useUserInfoStore()


  // const navigate = useNavigate()
  const tenderId = hit.id;

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setToken(token);
      const isFav = await isFavoriteTender(tenderId, token);
      const isFavStatus = isFav.data.status;
      setFav(isFavStatus);
    })();
  }, [tenderId]);

  // const navigationType = useNavigationType()

  // useEffect(() => {
  //   if (!userInfoStore.isLoggedIn) {
  //     if (navigationType === "POP")
  //       navigate(-1)
  //     else
  //       navigate('/login');
  //   }
  // }, [navigate]);

  const toDate = (date: string) => {
    const timestamp = date;
    const newDate = new Date(Date.parse(timestamp));
    newDate.setHours(0, 0, 0, 0);
    const formattedDate = newDate.toISOString().split("T")[0];
    return formattedDate;
  };

  function truncateString(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;

    const truncatedStr = str.slice(0, maxLength);
    const lastSpaceIndex = truncatedStr.lastIndexOf(" ");

    if (lastSpaceIndex !== -1) {
      return truncatedStr.slice(0, lastSpaceIndex);
    } else {
      return truncatedStr;
    }
  }

  const handleFavClick = async () => {
    if (!fav) {
      await addFavouriteTender(tenderId, tokenOuter);
      setFav(true);
    } else {
      await removeFavoriteTender(tenderId, tokenOuter);
      setFav(false);
    }
  };

  return (
    <div className={s.hit_block}>
      <button onClick={handleFavClick} className={s.executorLoveButton}>
        <img
          src={`/find-executor/heart-${fav ? "active" : "inactive"}.svg`}
          alt="heart"
        />
      </button>

      <div className={s.hit_header}>
        <Link to={`/tender/${hit.id}`}>
          <h3>{truncateString(hit.name, 20)}</h3>
        </Link>
      </div>
      <div className={s.hit_rcp}>
        <p>{toDate(hit.reception_end)}</p>
      </div>
      <div className={s.hit_wrk}>
        <p>{toDate(hit.work_start)}</p>
      </div>
      <div className={s.hit_arrow}>➔</div>
      <div className={s.hit_wrkE}>
        <p>{toDate(hit.work_end)}</p>
      </div>
      <div className={s.hit_price}>
        <p>{hit.price} ₽</p>
      </div>
      <div className={s.hit_city}>
        <p>{hit.city}</p>
      </div>
    </div>
  );
};
